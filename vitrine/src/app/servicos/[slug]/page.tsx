import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SERVICOS, getServico } from "@/content/servicos";
import { PRAZO_ENTREGA, RODADAS_AJUSTE } from "@/lib/config";

export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICOS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/servicos/[slug]">): Promise<Metadata> {
  const servico = getServico((await params).slug);
  return servico ? { title: servico.nome, description: servico.descricao } : {};
}

const PLACEHOLDERS = 3;

export default async function PaginaServico({ params }: PageProps<"/servicos/[slug]">) {
  const servico = getServico((await params).slug);
  if (!servico) notFound();

  const outros = SERVICOS.filter((s) => s.slug !== servico.slug);

  return (
    <>
      <section className="conteiner pt-10 md:pt-16">
        <Link href="/#servicos" className="text-sm text-terra-suave hover:text-eletrico">
          ← Todos os serviços
        </Link>

        <div className="mt-8 grid gap-10 md:grid-cols-[1.4fr_1fr] md:gap-16">
          <div>
            <p className="sobrelinha">Serviço</p>
            <h1 className="titulo mt-3 text-5xl sm:text-7xl">{servico.nome}</h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-terra/85">
              {servico.descricao}
            </p>
            <Link href={`/pedido?servico=${servico.slug}`} className="botao botao-principal mt-8">
              Quero isso
            </Link>
          </div>

          <aside className="self-start border-l-2 border-barro pl-6">
            <p className="sobrelinha">Como é a entrega</p>
            <dl className="mt-4 space-y-4">
              <div>
                <dt className="font-serif text-3xl">{PRAZO_ENTREGA}</dt>
                <dd className="text-terra/75">pra entregar, depois de combinado</dd>
              </div>
              <div>
                <dt className="font-serif text-3xl">1 rodada</dt>
                <dd className="text-terra/75">de ajuste já incluída no pedido</dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>

      <section className="conteiner mt-20">
        <p className="sobrelinha">Exemplos</p>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          {servico.exemplos.length > 0
            ? servico.exemplos.map((e) => (
                <figure key={e.src}>
                  {e.tipo === "video" ? (
                    <video src={e.src} controls playsInline preload="metadata" className="aspect-[4/5] w-full rounded-sm bg-areia object-cover" />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={e.src} alt={e.titulo} className="aspect-[4/5] w-full rounded-sm bg-areia object-cover" />
                  )}
                  <figcaption className="mt-2 text-sm text-terra-suave">{e.titulo}</figcaption>
                </figure>
              ))
            : Array.from({ length: PLACEHOLDERS }, (_, i) => (
                <div
                  key={i}
                  className="flex aspect-[4/5] flex-col items-center justify-center rounded-sm border-2 border-dashed border-terra/25 bg-areia/50 p-6 text-center"
                >
                  <span className="sobrelinha">Placeholder</span>
                  <span className="mt-2 text-sm text-terra-suave">
                    Espaço reservado para uma peça real — {servico.nome}
                  </span>
                </div>
              ))}
        </div>
      </section>

      <section className="conteiner mt-20 flex flex-col items-start justify-between gap-6 border-t border-terra/15 pt-10 sm:flex-row sm:items-center">
        <p className="titulo max-w-lg text-2xl sm:text-3xl">
          Entrega em {PRAZO_ENTREGA}, com {RODADAS_AJUSTE}.
        </p>
        <Link href={`/pedido?servico=${servico.slug}`} className="botao botao-principal">
          Quero isso
        </Link>
      </section>

      <nav className="conteiner mt-16">
        <p className="sobrelinha">Outros serviços</p>
        <ul className="mt-4 flex flex-wrap gap-3">
          {outros.map((s) => (
            <li key={s.slug}>
              <Link href={`/servicos/${s.slug}`} className="botao botao-contorno">
                {s.nome}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
