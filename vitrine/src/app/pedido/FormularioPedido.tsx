"use client";

import { useActionState } from "react";
import { SERVICOS } from "@/content/servicos";
import { criarPedido, type EstadoPedido } from "./actions";

export function FormularioPedido({ servicoInicial }: { servicoInicial?: string }) {
  const [estado, enviar, enviando] = useActionState<EstadoPedido, FormData>(
    criarPedido,
    {},
  );
  const v = estado.campos ?? {};

  return (
    <form action={enviar} className="grid gap-6">
      <Campo rotulo="Seu nome" id="nome">
        <input
          id="nome"
          name="nome"
          required
          maxLength={100}
          autoComplete="name"
          defaultValue={v.nome}
          className="entrada"
        />
      </Campo>

      <Campo rotulo="WhatsApp ou e-mail" id="contato" dica="Onde você prefere que eu te responda.">
        <input
          id="contato"
          name="contato"
          required
          maxLength={120}
          defaultValue={v.contato}
          placeholder="(27) 9 9999-9999 ou voce@email.com"
          className="entrada"
        />
      </Campo>

      <fieldset>
        <legend className="rotulo">Qual serviço?</legend>
        <div className="mt-3 grid grid-cols-2 gap-2 lg:grid-cols-4">
          {SERVICOS.map((s) => (
            <label key={s.slug} className="opcao">
              <input
                type="radio"
                name="servico"
                value={s.slug}
                required
                defaultChecked={(v.servico ?? servicoInicial) === s.slug}
                className="sr-only peer"
              />
              <span className="opcao-corpo">{s.nome}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <Campo
        rotulo="O que você quer resolver com isso?"
        id="problema"
        dica="Conta o problema, não só o pedido. Ex.: “as pessoas me acham no Instagram mas não sabem como agendar”."
      >
        <textarea
          id="problema"
          name="problema"
          required
          minLength={10}
          maxLength={3000}
          rows={5}
          defaultValue={v.problema}
          className="entrada resize-y"
        />
      </Campo>

      <Campo rotulo="Orçamento aproximado" opcional id="orcamento" dica="Se já tiver um valor em mente. Pode deixar em branco.">
        <input
          id="orcamento"
          name="orcamento"
          maxLength={100}
          defaultValue={v.orcamento}
          className="entrada"
        />
      </Campo>

      {/* Armadilha pra robô — escondida de gente */}
      <div aria-hidden className="hidden">
        <label>
          Não preencha
          <input name="site_empresa" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {estado.erro && (
        <div role="alert" className="border-l-2 border-barro bg-barro/10 px-4 py-3 text-sm">
          {estado.erro}
          {estado.whatsapp && (
            <a
              href={estado.whatsapp}
              target="_blank"
              rel="noopener"
              className="botao botao-principal mt-3 flex w-fit"
            >
              Mandar pedido pelo WhatsApp
            </a>
          )}
        </div>
      )}

      <button type="submit" disabled={enviando} className="botao botao-principal justify-self-start">
        {enviando ? "Enviando…" : "Enviar pedido"}
      </button>
    </form>
  );
}

function Campo({
  rotulo,
  id,
  dica,
  opcional,
  children,
}: {
  rotulo: string;
  id: string;
  dica?: string;
  opcional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="rotulo">
        {rotulo}
        {opcional && <span className="ml-2 font-normal text-terra-suave">(opcional)</span>}
      </label>
      {dica && <p id={`${id}-dica`} className="mt-1 text-sm text-terra-suave">{dica}</p>}
      <div className="mt-2">{children}</div>
    </div>
  );
}
