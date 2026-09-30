import type { Metadata } from "next";
import Link from "next/link";
import { getServico } from "@/content/servicos";
import { PRAZO_ENTREGA, PRAZO_RESPOSTA, RODADAS_AJUSTE } from "@/lib/config";

export const metadata: Metadata = { title: "Pedido recebido", robots: { index: false } };

export default async function Obrigado({ searchParams }: PageProps<"/obrigado">) {
  const { servico: slug } = await searchParams;
  const servico = typeof slug === "string" ? getServico(slug) : undefined;

  return (
    <section className="conteiner max-w-3xl pt-16 md:pt-24">
      <p className="sobrelinha">Pedido recebido{servico ? ` · ${servico.nome}` : ""}</p>
      <h1 className="titulo mt-4 text-5xl sm:text-6xl">Valeu! Já está comigo.</h1>
      <p className="mt-6 text-lg leading-relaxed text-terra/85">
        Eu respondo em <strong className="font-medium">{PRAZO_RESPOSTA}</strong> pelo contato que
        você deixou, pra gente combinar os detalhes. Depois de combinado, a entrega sai em{" "}
        {PRAZO_ENTREGA}, com {RODADAS_AJUSTE}.
      </p>
      <p className="mt-4 text-terra-suave">— Alef</p>
      <Link href="/" className="botao botao-contorno mt-10">
        Voltar pro início
      </Link>
    </section>
  );
}
