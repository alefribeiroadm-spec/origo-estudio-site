// Tudo o que a vitrine diz sobre cada serviço mora aqui.
// Para trocar um placeholder por uma peça real, preencha `exemplos` com
// { titulo, tipo: "imagem" | "video", src } — o arquivo vai em /public/exemplos.

export type Exemplo = {
  titulo: string;
  tipo: "imagem" | "video";
  src: string;
};

export type Servico = {
  slug: "site" | "app" | "flyer" | "video-ia";
  nome: string;
  chamada: string;
  descricao: string;
  exemplos: Exemplo[];
};

export const SERVICOS: Servico[] = [
  {
    slug: "site",
    nome: "Site",
    chamada: "Seu negócio fácil de achar e fácil de chamar.",
    descricao:
      "Um site sob medida pra marca: quem você é, o que você oferece e um caminho curto pro cliente falar com você. Sem template genérico — cada site parte do que o seu negócio precisa resolver.",
    exemplos: [],
  },
  {
    slug: "app",
    nome: "App",
    chamada: "Uma ferramenta pra tarefa que trava o seu dia.",
    descricao:
      "Um aplicativo pensado pra um problema específico do seu negócio — agendar, receber pedido, organizar cadastro, o que estiver tomando o seu tempo. A conversa começa pelo problema, não pela tecnologia.",
    exemplos: [],
  },
  {
    slug: "flyer",
    nome: "Flyer",
    chamada: "Evento, promoção ou lançamento, com a cara da marca.",
    descricao:
      "Arte de divulgação no formato certo pra onde ela vai circular — feed, story ou impresso — com a identidade da sua marca, não um modelo pronto que todo mundo já viu.",
    exemplos: [],
  },
  {
    slug: "video-ia",
    nome: "Vídeo de IA",
    chamada: "Vídeo profissional sem precisar de equipe de filmagem.",
    descricao:
      "Vídeo gerado e editado com inteligência artificial, no estilo ultra-realista ou em animação, pra mostrar o seu negócio nas redes com qualidade de produção e no ritmo que o conteúdo pede.",
    exemplos: [],
  },
];

export function getServico(slug: string) {
  return SERVICOS.find((s) => s.slug === slug);
}
