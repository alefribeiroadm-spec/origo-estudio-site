import Image from "next/image";
import Link from "next/link";
import { SERVICOS } from "@/content/servicos";
import { PRAZO_ENTREGA, PRAZO_RESPOSTA, RODADAS_AJUSTE } from "@/lib/config";

export default function Home() {
  return (
    <>
      {/* Quem é a Origo / quem está por trás */}
      <section className="conteiner grid items-end gap-10 pt-12 pb-20 md:grid-cols-[1.15fr_1fr] md:gap-14 md:pt-20">
        <div className="md:pb-10">
          <p className="sobrelinha">Origo · estúdio criativo de IA</p>
          <h1 className="titulo mt-5 text-[2.6rem] leading-[1.05] sm:text-6xl">
            Um estúdio de IA <em className="text-barro">com nome e rosto.</em>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-terra/85">
            Sou Alef Ribeiro. Uso inteligência artificial pra fazer site, app, flyer e vídeo
            pro seu negócio — e sou eu mesmo quem conversa, cria e entrega. Sem central de
            atendimento no meio.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="#servicos" className="botao botao-principal">
              Ver o que eu faço
            </Link>
            <Link href="/pedido" className="botao botao-contorno">
              Contar meu problema
            </Link>
          </div>
        </div>

        <figure className="relative">
          <div className="overflow-hidden rounded-sm bg-areia">
            <Image
              src="/img/alef.jpg"
              alt="Alef Ribeiro, fundador da Origo"
              width={1000}
              height={1250}
              priority
              sizes="(min-width: 768px) 45vw, 100vw"
              className="foto-editorial aspect-[4/5] w-full object-cover"
            />
          </div>
          <figcaption className="mt-3 flex justify-between text-xs tracking-wide text-terra-suave">
            <span>Alef Ribeiro — fundador</span>
            <span>Grande Vitória, ES</span>
          </figcaption>
        </figure>
      </section>

      {/* Os 4 serviços */}
      <section id="servicos" className="scroll-mt-8 border-t border-terra/10 pt-16">
        <div className="conteiner">
          <p className="sobrelinha">O que eu faço</p>
          <h2 className="titulo mt-3 text-4xl sm:text-5xl">Escolhe por onde começar.</h2>

          <div className="mt-10 grid gap-px overflow-hidden rounded-sm border border-terra/15 bg-terra/15 sm:grid-cols-2">
            {SERVICOS.map((s, i) => (
              <Link
                key={s.slug}
                href={`/servicos/${s.slug}`}
                className="group flex min-h-56 flex-col justify-between bg-papel p-7 transition-colors hover:bg-areia sm:p-9"
              >
                <span className="font-serif text-sm text-terra-suave">0{i + 1}</span>
                <div>
                  <h3 className="titulo text-3xl sm:text-4xl">{s.nome}</h3>
                  <p className="mt-2 max-w-sm text-terra/80">{s.chamada}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-[15px] font-medium text-eletrico">
                    Ver detalhes
                    <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Como funciona */}
      <section className="conteiner mt-24 grid gap-10 md:grid-cols-[1fr_2fr]">
        <div>
          <p className="sobrelinha">Como funciona</p>
          <h2 className="titulo mt-3 text-4xl">Pouca etapa, conversa direta.</h2>
        </div>
        <ol className="grid gap-8 sm:grid-cols-3">
          {[
            ["Você me conta o problema", "Pelo formulário ou direto no WhatsApp. Não precisa saber o nome técnico do que quer."],
            ["Eu respondo", `Em ${PRAZO_RESPOSTA}, pra combinar os detalhes com você.`],
            ["Entrego", `Em ${PRAZO_ENTREGA}, com ${RODADAS_AJUSTE}.`],
          ].map(([t, d], i) => (
            <li key={t} className="border-t-2 border-terra pt-4">
              <span className="font-serif text-barro">{i + 1}.</span>
              <h3 className="mt-1 text-lg font-medium">{t}</h3>
              <p className="mt-2 text-terra/75">{d}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Quem faz */}
      <section id="quem-faz" className="mt-24 -mb-24 scroll-mt-8 bg-terra py-20 text-papel">
        <div className="conteiner grid gap-10 md:grid-cols-[1fr_1.4fr]">
          <div>
            <p className="sobrelinha text-papel/60">Quem faz</p>
            <h2 className="titulo mt-3 text-4xl sm:text-5xl">Alef Ribeiro</h2>
            <p className="mt-2 text-papel/70">Fundador da Origo · Cariacica, Grande Vitória — ES</p>
          </div>
          <div className="space-y-5 text-lg leading-relaxed text-papel/85">
            <p>
              Não sou uma agência grande. Sou eu que escuto o que você precisa, faço e entrego —
              então dá pra falar comigo em qualquer etapa.
            </p>
            <p className="text-base text-papel/65">
              Formado em Tecnologia da Informação · professor de Informática e Português ·
              especialista em IA generativa, Canva, CapCut e animação.
            </p>
            <Link href="/pedido" className="botao mt-2 bg-papel text-terra hover:bg-eletrico hover:text-white">
              Fazer um pedido
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
