"use server";

import { redirect } from "next/navigation";
import { getServico } from "@/content/servicos";
import { enviarPedido } from "@/lib/enviarPedido";
import { linkWhatsApp } from "@/lib/config";

export type EstadoPedido = {
  erro?: string;
  campos?: Record<string, string>;
  // Se o envio falhar, o pedido segue pronto pro WhatsApp — nenhum pedido se perde.
  whatsapp?: string;
};

const LIMITES = { nome: 100, contato: 120, problema: 3000, orcamento: 100 };

export async function criarPedido(
  _anterior: EstadoPedido,
  form: FormData,
): Promise<EstadoPedido> {
  const campo = (k: string) => String(form.get(k) ?? "").trim();
  const campos = {
    nome: campo("nome"),
    contato: campo("contato"),
    servico: campo("servico"),
    problema: campo("problema"),
    orcamento: campo("orcamento"),
  };

  // Campo invisível: gente de verdade não preenche, robô preenche.
  if (campo("site_empresa")) redirect("/obrigado");

  const servico = getServico(campos.servico);
  let erro: string | undefined;
  if (!campos.nome) erro = "Me diz seu nome.";
  else if (!campos.contato) erro = "Deixa um WhatsApp ou e-mail pra eu te responder.";
  else if (!servico) erro = "Escolhe qual serviço você quer.";
  else if (campos.problema.length < 10)
    erro = "Conta um pouco mais do que você quer resolver — duas frases já ajudam.";
  else if (
    campos.nome.length > LIMITES.nome ||
    campos.contato.length > LIMITES.contato ||
    campos.problema.length > LIMITES.problema ||
    campos.orcamento.length > LIMITES.orcamento
  )
    erro = "Algum campo ficou comprido demais. Encurta um pouco e tenta de novo.";

  if (erro || !servico) return { erro, campos };

  try {
    await enviarPedido({ ...campos, servico: servico.nome });
  } catch (e) {
    console.error("[pedido] falha no envio", e);
    return {
      erro: "Não consegui registrar o pedido agora. Manda pelo WhatsApp que ele já vai preenchido:",
      campos,
      whatsapp: linkWhatsApp(
        [
          "Oi, Alef! Fiz um pedido pela vitrine da Origo:",
          `*Nome:* ${campos.nome}`,
          `*Contato:* ${campos.contato}`,
          `*Serviço:* ${servico.nome}`,
          `*O que quero resolver:* ${campos.problema}`,
          `*Orçamento:* ${campos.orcamento || "não informado"}`,
        ].join("\n"),
      ),
    };
  }

  redirect(`/obrigado?servico=${servico.slug}`);
}
