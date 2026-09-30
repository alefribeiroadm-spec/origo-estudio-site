import type { Metadata } from "next";
import localFont from "next/font/local";
import { Cabecalho } from "@/components/Cabecalho";
import { Rodape } from "@/components/Rodape";
import { FalarComAlef } from "@/components/FalarComAlef";
import "./globals.css";

const fraunces = localFont({
  src: [
    { path: "../fonts/fraunces-normal.woff2", style: "normal" },
    { path: "../fonts/fraunces-italic.woff2", style: "italic" },
  ],
  variable: "--font-fraunces",
  weight: "300 900",
  display: "swap",
});

const grotesk = localFont({
  src: "../fonts/space-grotesk.woff2",
  variable: "--font-grotesk",
  weight: "300 700",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Origo — site, app, flyer e vídeo de IA, direto com o Alef",
    template: "%s · Origo",
  },
  description:
    "Estúdio criativo de IA do Alef Ribeiro. Site, app, flyer e vídeo de IA, com entrega em 3 dias úteis e 1 rodada de ajuste incluída. Você fala direto comigo.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${fraunces.variable} ${grotesk.variable} antialiased`}>
      <body className="flex min-h-dvh flex-col">
        <Cabecalho />
        <main className="flex-1 pb-24">{children}</main>
        <Rodape />
        <FalarComAlef />
      </body>
    </html>
  );
}
