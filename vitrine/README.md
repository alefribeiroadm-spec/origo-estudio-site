# Vitrine Origo

Vitrine de serviços da Origo (site, app, flyer, vídeo de IA) com pedido direto pro Alef.
Next.js 16 + TypeScript + Tailwind 4. Sem banco nem login.

## Onde mexer

| O quê | Arquivo |
| --- | --- |
| Texto de cada serviço e exemplos (placeholders) | `src/content/servicos.ts` |
| WhatsApp, e-mail, prazos (1 dia útil / 3 dias úteis / 1 rodada) | `src/lib/config.ts` |
| Envio do pedido (Resend / planilha / FormSubmit) | `src/lib/enviarPedido.ts` |
| Foto do Alef | `public/img/alef.jpg` |
| Cores e fontes | `src/app/globals.css` |

Pra trocar um placeholder por peça real: coloque o arquivo em `public/exemplos/` e preencha
`exemplos` do serviço, ex. `{ titulo: "Barbearia", tipo: "video", src: "/exemplos/barbearia.mp4" }`.

## Rodar local

```bash
npm install
cp .env.example .env.local   # e preencha pelo menos um destino
npm run dev
```

## Pra onde vão os pedidos

Configure **pelo menos um** (pode os dois):

- **E-mail (Resend)** — crie conta grátis em resend.com com `alefribeiroadm@gmail.com`,
  gere uma API key e coloque em `RESEND_API_KEY`. Sem domínio próprio, o Resend só entrega
  pro e-mail dono da conta — que é exatamente o caso aqui.
- **Planilha Google** — crie uma planilha, vá em Extensões → Apps Script, cole
  `planilha-pedidos.gs`, implante como App da Web (Executar como: Eu · Acesso: Qualquer pessoa)
  e coloque a URL `/exec` em `PEDIDOS_PLANILHA_URL`.

Sem nenhum dos dois, o site tenta o FormSubmit (o mesmo do site antigo). Em 29/09/2026 ele
estava respondendo erro 500 pra qualquer envio, então não conte com ele.

Se todos os destinos falharem, o formulário mostra um botão que abre o WhatsApp com o pedido
inteiro já escrito — o cliente não se perde.

## Deploy na Vercel

1. `npx vercel login` (uma vez)
2. Nesta pasta: `npx vercel` — aceite os padrões (framework Next.js é detectado sozinho)
3. Cadastre as variáveis: `npx vercel env add RESEND_API_KEY production`
   (e/ou `PEDIDOS_PLANILHA_URL`, `PEDIDOS_EMAIL`)
4. `npx vercel --prod`
5. Teste em produção: um pedido por serviço + o botão "Falar com o Alef"

Alternativa pelo GitHub: suba o repositório, importe em vercel.com/new e defina
**Root Directory = `vitrine`**; as variáveis ficam em Settings → Environment Variables.
