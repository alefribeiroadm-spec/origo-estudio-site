import Link from "next/link";
import { Simbolo } from "./Marca";

export function Cabecalho() {
  return (
    <header className="border-b border-terra/10">
      <div className="conteiner flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <Simbolo className="h-7 w-auto text-terra" />
          <span className="font-serif text-xl">Origo</span>
        </Link>
        <nav className="flex items-center gap-5 text-[15px] sm:gap-7">
          <Link href="/#servicos" className="hidden hover:text-eletrico sm:inline">
            Serviços
          </Link>
          <Link href="/#quem-faz" className="hidden hover:text-eletrico sm:inline">
            Quem faz
          </Link>
          <Link href="/pedido" className="botao botao-contorno px-4 py-2 text-sm">
            Fazer pedido
          </Link>
        </nav>
      </div>
    </header>
  );
}
