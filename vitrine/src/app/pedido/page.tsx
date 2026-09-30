import type { Metadata } from "next";
import { getServico } from "@/content/servicos";
import { PRAZO_RESPOSTA } from "@/lib/config";
import { FormularioPedido } from "./FormularioPedido";

export const metadata: Metadata = { title: "Fazer pedido" };

export default async function PaginaPedido({ searchParams }: PageProps<"/pedido">) {
  const { servico } = await searchParams;
  const inicial = typeof servico === "string" && getServico(servico) ? servico : undefined;

  return (
    <section className="conteiner grid gap-12 pt-10 md:grid-cols-[1fr_1.6fr] md:pt-16">
      <div>
        <p className="sobrelinha">Pedido</p>
        <h1 className="titulo mt-3 text-4xl sm:text-5xl">Me conta o que você precisa.</h1>
        <p className="mt-5 text-terra/80">
          Poucos campos, sem compromisso. Eu leio pessoalmente e respondo em {PRAZO_RESPOSTA} pra
          combinar os detalhes.
        </p>
        <p className="mt-4 text-sm text-terra-suave">
          Prefere conversar? Usa o botão “Falar com o Alef” aqui embaixo.
        </p>
      </div>
      <div className="rounded-sm bg-areia/60 p-6 sm:p-10">
        <FormularioPedido servicoInicial={inicial} />
      </div>
    </section>
  );
}
