import "server-only";
import { EMAIL_PEDIDOS } from "./config";

export type Pedido = {
  nome: string;
  contato: string;
  servico: string;
  problema: string;
  orcamento: string;
};

type Destino = { nome: string; enviar: (p: Pedido, assunto: string) => Promise<void> };

const SITE_URL = process.env.SITE_URL ?? "http://localhost:3000";

// Manda o pedido pra todos os destinos configurados. Basta um funcionar.
// - RESEND_API_KEY        → e-mail pelo Resend
// - PEDIDOS_PLANILHA_URL  → linha nova numa planilha Google (Apps Script, ver README)
// - nenhum dos dois       → tenta o FormSubmit, o mesmo serviço do site atual
export async function enviarPedido(p: Pedido): Promise<void> {
  const assunto = `Novo pedido — ${p.servico} — ${p.nome}`;
  console.info(`[pedido] ${assunto} | contato: ${p.contato}`);

  const destinos: Destino[] = [];
  if (process.env.RESEND_API_KEY) destinos.push({ nome: "resend", enviar: viaResend });
  if (process.env.PEDIDOS_PLANILHA_URL) destinos.push({ nome: "planilha", enviar: viaPlanilha });
  if (destinos.length === 0) destinos.push({ nome: "formsubmit", enviar: viaFormSubmit });

  const resultados = await Promise.allSettled(destinos.map((d) => d.enviar(p, assunto)));
  resultados.forEach((r, i) => {
    if (r.status === "rejected") console.error(`[pedido] ${destinos[i].nome} falhou:`, r.reason);
    else console.info(`[pedido] ${destinos[i].nome} ok`);
  });

  if (!resultados.some((r) => r.status === "fulfilled")) {
    throw new Error("Nenhum destino aceitou o pedido");
  }
}

function linhas(p: Pedido): [string, string][] {
  return [
    ["Nome", p.nome],
    ["Contato", p.contato],
    ["Serviço", p.servico],
    ["O que quer resolver", p.problema],
    ["Orçamento aproximado", p.orcamento || "Não informado"],
  ];
}

async function viaResend(p: Pedido, assunto: string) {
  const email = /^\S+@\S+\.\S+$/.test(p.contato) ? p.contato : undefined;
  const html = `<table cellpadding="8" style="font-family:sans-serif;border-collapse:collapse">${linhas(p)
    .map(
      ([k, v]) =>
        `<tr><td style="border:1px solid #ddd"><b>${k}</b></td><td style="border:1px solid #ddd;white-space:pre-wrap">${escapar(v)}</td></tr>`,
    )
    .join("")}</table>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.RESEND_FROM ?? "Vitrine Origo <onboarding@resend.dev>",
      to: [EMAIL_PEDIDOS],
      reply_to: email,
      subject: assunto,
      html,
    }),
    signal: AbortSignal.timeout(15000),
  });

  if (!res.ok) throw new Error(`Resend: ${res.status} ${await res.text()}`);
}

async function viaPlanilha(p: Pedido) {
  const res = await fetch(process.env.PEDIDOS_PLANILHA_URL!, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: new Date().toISOString(), ...p }),
    signal: AbortSignal.timeout(15000),
  });
  const texto = await res.text();
  if (!res.ok || !texto.includes('"ok":true')) {
    throw new Error(`Planilha: ${res.status} ${texto.slice(0, 200)}`);
  }
}

async function viaFormSubmit(p: Pedido, assunto: string) {
  const res = await fetch(`https://formsubmit.co/ajax/${EMAIL_PEDIDOS}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Origin: SITE_URL,
      Referer: `${SITE_URL}/pedido`,
    },
    body: JSON.stringify({
      _subject: assunto,
      _template: "table",
      _captcha: "false",
      ...Object.fromEntries(linhas(p)),
    }),
    signal: AbortSignal.timeout(15000),
  });

  const data = (await res.json().catch(() => null)) as {
    success?: string | boolean;
    message?: string;
  } | null;

  if (!res.ok || String(data?.success) !== "true") {
    throw new Error(`FormSubmit: ${res.status} ${data?.message ?? ""}`);
  }
}

function escapar(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
