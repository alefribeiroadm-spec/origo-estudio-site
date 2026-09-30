export const WHATSAPP_NUMERO =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMERO ?? "5527997656489";

export const EMAIL_CONTATO = "alefribeiroadm@gmail.com";

// Destino dos pedidos. Pode ser trocado na Vercel sem mexer no código.
export const EMAIL_PEDIDOS = process.env.PEDIDOS_EMAIL ?? EMAIL_CONTATO;

export const PRAZO_RESPOSTA = "até 1 dia útil";
export const PRAZO_ENTREGA = "3 dias úteis";
export const RODADAS_AJUSTE = "1 rodada de ajuste incluída";

export function linkWhatsApp(mensagem: string) {
  return `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensagem)}`;
}
