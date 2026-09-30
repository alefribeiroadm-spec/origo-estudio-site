import Link from "next/link";
import { EMAIL_CONTATO } from "@/lib/config";
import { Simbolo } from "./Marca";

export function Rodape() {
  return (
    <footer className="bg-carvao pb-28 text-papel/80">
      <div className="conteiner flex flex-col gap-6 pt-12 text-sm sm:flex-row sm:items-center sm:justify-between">
        <Link href="/" className="flex items-center gap-2.5 text-papel">
          <Simbolo className="h-6 w-auto" />
          <span className="font-serif text-lg">Origo</span>
        </Link>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <a href={`mailto:${EMAIL_CONTATO}`} className="hover:text-papel">
            {EMAIL_CONTATO}
          </a>
          <a href="https://www.instagram.com/origoestudiobr/" target="_blank" rel="noopener" className="hover:text-papel">
            Instagram
          </a>
        </div>
        <span>© {new Date().getFullYear()} Origo · Alef Ribeiro Alves</span>
      </div>
    </footer>
  );
}
