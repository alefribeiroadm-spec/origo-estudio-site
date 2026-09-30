"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { getServico } from "@/content/servicos";
import { linkWhatsApp } from "@/lib/config";

export function mensagemWhatsApp(pathname: string) {
  const slug = pathname.match(/^\/servicos\/([^/]+)/)?.[1];
  const servico = slug ? getServico(slug) : undefined;
  return servico
    ? `Oi, Alef! Vim pela vitrine da Origo e quero conversar sobre ${servico.nome}.`
    : "Oi, Alef! Vim pela vitrine da Origo e queria conversar sobre um projeto.";
}

// Botão fixo em todas as páginas, pra quem prefere ir direto pra conversa.
export function FalarComAlef() {
  const pathname = usePathname();
  return (
    <a
      href={linkWhatsApp(mensagemWhatsApp(pathname))}
      target="_blank"
      rel="noopener"
      className="fixed right-4 bottom-4 z-50 flex items-center gap-3 rounded-full bg-terra py-1.5 pr-5 pl-1.5 text-papel shadow-lg shadow-terra/25 transition-colors hover:bg-eletrico sm:right-6 sm:bottom-6"
    >
      <Image
        src="/img/alef.jpg"
        alt=""
        width={40}
        height={40}
        className="size-10 rounded-full object-cover object-top"
      />
      <span className="text-[15px] leading-tight">
        Falar com o Alef
        <span className="block text-xs text-papel/65">no WhatsApp</span>
      </span>
    </a>
  );
}
