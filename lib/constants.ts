export const SITE = {
  name: "Libertad Capital",
  tagline: "Escritório de Investimentos em Indaiatuba credenciado à EQI Investimentos",
  credential: "Escritório credenciado à EQI Investimentos",
  coverage: "Atendemos todo o Brasil",
  whatsapp: "5511988595724",
  whatsappDisplay: "(11) 98859-5724",
  email: "contato@libertadcapital.com.br",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://libertadcapital.com.br",
} as const;

export const OFFICES = [
  {
    city: "São Paulo - SP",
    address: "Av. Brigadeiro Faria Lima, 3600 - Itaim Bibi",
  },
  {
    city: "Indaiatuba - SP",
    address: "Av. Presidente Kennedy, 1466 - Cidade Nova I",
  },
] as const;

export const NAV_LINKS = [
  { label: "Início", href: "#inicio" },
  { label: "Sobre Rafaela", href: "#sobre-rafaela" },
  { label: "Soluções", href: "#solucoes" },
  { label: "Por que a EQI", href: "#eqi" },
  { label: "Depoimentos", href: "#depoimentos" },
  { label: "Contato", href: "#contato" },
] as const;

export const CONTACT_SECTION_HREF = "#contato" as const;
export const HISTORIA_SECTION_HREF = "#sobre-rafaela" as const;

export const FOOTER_LINKS = {
  privacy: "/politica-de-privacidade",
  terms: "/termos-de-uso",
  p12Credit: "https://leads.p12digital.com.br/",
} as const;

export const EQI_OMBUDSMAN = {
  title: "Ouvidoria",
  phoneDisplay: "0800-770-0190",
  phoneTel: "08007700190",
  email: "ouvidoria@eqi.com.br",
  hours: "Segunda a sexta-feira, exceto feriados, das 9h às 17h.",
  linkLabel: "Acesse nossa Ouvidoria",
  url: "https://ajuda.eqi.com.br/s/ouvidoria",
} as const;

export const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/rafaela_alves_assessora_/",
  linkedin: "https://www.linkedin.com/in/rafaela-alves-silva/",
} as const;

export const FORM_WEBHOOK_URL =
  process.env.NEXT_PUBLIC_FORM_WEBHOOK_URL ??
  "https://n8n.sitespdoze.com.br/webhook/libertad/form";

export const DEFAULT_DDI = "55" as const;

export const DDI_OPTIONS = [
  { value: "55", label: "+55", country: "Brasil" },
  { value: "1", label: "+1", country: "EUA / Canadá" },
  { value: "351", label: "+351", country: "Portugal" },
  { value: "44", label: "+44", country: "Reino Unido" },
  { value: "34", label: "+34", country: "Espanha" },
] as const;

export const FOOTER_SOLUTIONS = [
  { label: "Acompanhamento de Carteira", href: "#solucoes" },
  { label: "Evolução dos Investimentos", href: "#solucoes" },
  { label: "Diversificação Global", href: "#solucoes" },
  { label: "Acompanhamento de Investimentos", href: "#solucoes" },
  { label: "Mercado de Capitais", href: "#solucoes" },
] as const;

export const EQI_STATS = [
  { value: 50, prefix: "+R$ ", suffix: "Bi", label: "Sob custódia na plataforma EQI", isText: false },
  { value: 80, prefix: "+", suffix: " mil", label: "Investidores ativos", isText: false },
  { value: 1000, prefix: "+", suffix: "", label: "Oportunidades de investimento", isText: false },
  { value: 0, prefix: "", suffix: "Nacional", label: "Presença em todo o Brasil", isText: true },
] as const;

export const AUDIENCE_CARDS = [
  {
    icon: "briefcase" as const,
    title: "Empresários",
    text: "Atendimento a empresários que buscam organizar seus investimentos de acordo com seus objetivos, perfil e horizonte de longo prazo.",
  },
  {
    icon: "trending-up" as const,
    title: "Executivos",
    text: "Acompanhamento de investimentos para executivos em diferentes momentos da carreira e da construção de patrimônio.",
  },
  {
    icon: "award" as const,
    title: "Profissionais Liberais",
    text: "Médicos, advogados e especialistas que buscam acompanhamento de investimentos alinhado aos seus objetivos.",
  },
  {
    icon: "home" as const,
    title: "Famílias Patrimonializadas",
    text: "Acompanhamento de famílias que buscam organizar seus investimentos com visão de longo prazo.",
  },
  {
    icon: "bar-chart-2" as const,
    title: "Investidores Sofisticados",
    text: "Acesso a produtos diferenciados da plataforma EQI para investidores qualificados e experientes.",
  },
  {
    icon: "activity" as const,
    title: "Acompanhamento de Investimentos",
    text: "Atendimento próximo para acompanhar a evolução dos investimentos e as mudanças de objetivos ao longo do tempo.",
  },
] as const;

export const SOLUTIONS_CARDS = [
  {
    icon: "shield-check" as const,
    title: "Acompanhamento de Carteira",
    text: "Acompanhamento dos investimentos considerando objetivos, horizonte de tempo e perfil do investidor.",
  },
  {
    icon: "trending-up" as const,
    title: "Evolução dos Investimentos",
    text: "Acesso a alternativas de investimento alinhadas ao seu perfil, objetivos e horizonte de tempo.",
  },
  {
    icon: "globe" as const,
    title: "Diversificação Global",
    text: "Acesso a oportunidades nacionais e internacionais através da plataforma EQI Investimentos.",
  },
  {
    icon: "users" as const,
    title: "Acompanhamento de Investimentos",
    text: "Atendimento próximo para acompanhar a evolução dos investimentos e as mudanças de objetivos ao longo do tempo.",
  },
  {
    icon: "bar-chart" as const,
    title: "Mercado de Capitais",
    text: "Oportunidades selecionadas em renda variável, fundos e ofertas públicas para investidores qualificados.",
  },
  {
    icon: "layers" as const,
    title: "Investimentos Alternativos",
    text: "Acesso a produtos diferenciados em IA, clean tech, robótica e outros ativos alternativos via plataforma EQI.",
  },
] as const;

export const DIFFERENTIALS = {
  traditional: [
    "Oferecem o que paga mais comissão",
    "Atendimento genérico para perfis diferentes",
    "Foco no produto, não na estratégia",
    "Baixa personalização no acompanhamento",
    "Relacionamento reativo",
  ],
  libertad: [
    "Atendimento alinhado aos seus objetivos e perfil de investidor",
    "Acompanhamento personalizado e monitoramento contínuo",
    "Parceria para acompanhar seus investimentos com visão de longo prazo",
    "Você entende onde está investindo e por quê",
    "Relacionamento proativo e antecipativo",
  ],
} as const;

export const JOURNEY_STEPS = [
  {
    icon: "search" as const,
    title: "Diagnóstico",
    text: "Compreensão profunda do seu patrimônio, objetivos de vida e momento atual.",
  },
  {
    icon: "map" as const,
    title: "Estratégia",
    text: "Apresentação de alternativas de investimento considerando seus objetivos e perfil.",
  },
  {
    icon: "check-circle" as const,
    title: "Implementação",
    text: "Seleção das melhores soluções disponíveis na plataforma EQI.",
  },
  {
    icon: "activity" as const,
    title: "Acompanhamento",
    text: "Monitoramento contínuo e revisões periódicas da estratégia.",
  },
  {
    icon: "arrow-up-right" as const,
    title: "Evolução",
    text: "Patrimônio em constante alinhamento com seus objetivos de longo prazo.",
  },
] as const;

export const EQI_TIERS = [
  {
    id: "advisory",
    title: "Advisory",
    subtitle: "Para investimentos entre",
    value: "R$100mil e R$500mil",
    description:
      "Para quem está construindo patrimônio com consistência e quer uma estratégia profissional desde o início.",
    services: [
      "Assessor exclusivo",
      "Acompanhamento dos investimentos",
      "Suporte operacional de renda variável",
    ],
    products: [
      "Plataforma completa de investimentos",
      "Criptomoedas",
      "Eventos online",
      "Conta internacional",
    ],
    ctaLabel: "Quero começar no Advisory",
    whatsappMessage: "Olá, gostaria de saber mais sobre a Assessoria Advisory.",
  },
  {
    id: "exclusive",
    title: "Exclusive",
    subtitle: "Para investimentos entre",
    value: "R$500mil e R$5milhões",
    description:
      "Para investidores que já construíram patrimônio relevante e buscam uma estratégia mais sofisticada e personalizada.",
    services: [
      "Assessor exclusivo",
      "Acompanhamento dos investimentos",
      "Revisão estratégica trimestral",
      "Especialista de renda variável*",
      "Especialista de investimento internacional",
    ],
    products: [
      "Plataforma completa de investimentos",
      "Criptomoedas",
      "Conta internacional",
      "Eventos online",
      "Eventos presenciais",
      "Planejamento Financeiro",
    ],
    ctaLabel: "Quero o atendimento Exclusive",
    whatsappMessage: "Olá, gostaria de saber mais sobre a Assessoria Exclusive.",
  },
  {
    id: "private",
    title: "Private",
    subtitle: "Para investimentos a partir de",
    value: "R$5milhões",
    description:
      "Para famílias e investidores com patrimônio expressivo que exigem o mais alto nível de atendimento e estratégia.",
    services: [
      "Assessor exclusivo",
      "Time de especialistas private",
      "Acompanhamento dos investimentos",
      "Revisão estratégica trimestral",
      "Especialista de renda variável*",
      "Especialista de investimento internacional",
    ],
    products: [
      "Plataforma completa de investimentos",
      "Criptomoedas",
      "Conta internacional",
      "Eventos online",
      "Eventos presenciais",
      "Acesso ao Wealth Management",
      "Planejamento Financeiro",
      "Área exclusiva nos eventos EQI",
      "Planejamento tributário e suporte na constituição de holdings e offshore",
      "Consolidação dos investimentos de todas as instituições financeiras",
      "Prioridade em ofertas exclusivas",
    ],
    ctaLabel: "Quero o atendimento Private",
    whatsappMessage: "Olá, gostaria de saber mais sobre a Assessoria Private.",
  },
] as const;

export const EQI_FEATURES = [
  "Taxa zero de custódia",
  "Plataforma BTG Pactual",
  "EQI Research própria",
  "Crédito",
  "Atendimento humano",
] as const;

export const APP_FEATURES = [
  "Portfólio em tempo real",
  "Renda variável com EQI Trader",
  "Transferências e resgates",
  "Alertas de preço",
] as const;

export const APP_SHOWCASE = [
  {
    eyebrow: "Conheça nosso app",
    title: "Baixe o app da EQI Investimentos",
    description:
      "+ de 1000 produtos com autonomia para que você acompanhe seus objetivos.",
    image: "/images/eqi-investimentos-app.webp",
    imageAlt: "Aplicativo EQI Investimentos exibido em um smartphone",
    appStoreUrl: "https://apps.apple.com/br/app/eqi-investimentos/id1615444583",
    playStoreUrl:
      "https://play.google.com/store/apps/details?id=com.btg.pactual.eqi.mobile",
  },
  {
    eyebrow: "App trader",
    title: "Renda variável na palma da sua mão",
    description: "Acesse o EQI Trader para operar de qualquer lugar sem burocracias.",
    image: "/images/eqi-trader-app.webp",
    imageAlt: "Aplicativo EQI Trader exibido em um smartphone",
    appStoreUrl: "https://apps.apple.com/br/app/eqi-trader/id1606793010",
    playStoreUrl:
      "https://play.google.com/store/apps/details?id=com.btg.pactual.homebroker.mobile.eqi",
  },
] as const;

export const TESTIMONIALS = [
  {
    name: "Miriam",
    text: "Trabalhar com a Rafaela foi uma revolução na minha vida financeira. Seu profundo conhecimento do mercado de alta renda me proporcionou retornos que superaram as minhas expectativas. Ela não só entende as complexidades do mercado, como também tem uma habilidade rara de traduzir tudo para o vocabulário simples e comum.",
  },
  {
    name: "André",
    text: "Ela não espera eu ligar. Ela antecipa os movimentos do mercado e me traz soluções estratégicas, tanto no Brasil quanto no exterior. Tem sido uma assessoria muito eficaz e estou muito satisfeito com a nossa parceria até aqui.",
  },
  {
    name: "Helena",
    text: "Eu sempre tive receio de investir em produtos mais complexos por não entender nada do 'economês'. A Rafaela tem um dom raro de traduzir o mercado financeiro de um jeito simples, sem ser superficial. Ela respeita muito o meu perfil conservador e estou muito feliz com a rentabilidade atual.",
  },
  {
    name: "Fábio",
    text: "Seu atendimento exclusivo e atenção aos detalhes me deixam tranquilo para focar na minha empresa e ter plena confiança que o meu patrimônio e da minha família está sendo bem cuidado.",
  },
  {
    name: "Adriane",
    text: "Rafaela é uma pessoa de muita empatia, qualidade que acho fundamental para alguém que cuida dos meus investimentos. Desde o início, ela demonstrou um grande entendimento das minhas metas de longo prazo e trabalhou incansavelmente para que eu as atingisse. Estou muito feliz com minha evolução patrimonial.",
  },
  {
    name: "Fernando",
    text: "O que mais me impressionou no atendimento da Rafaela foi a clareza. Eu já passei por grandes bancos onde me sentia apenas mais um número, mas com ela a relação é outra. Ela conseguiu organizar meu patrimônio de uma forma que eu não via antes, sempre trazendo oportunidades que realmente fazem sentido para o meu momento de vida.",
  },
] as const;

export const PATRIMONIO_OPTIONS = [
  { value: "acima-5m", label: "Acima de R$ 5 milhões" },
  { value: "1m-5m", label: "Entre R$ 1 milhão e R$ 5 milhões" },
  { value: "500k-1m", label: "Entre R$ 500 mil e R$ 1 milhão" },
  { value: "ate-500k", label: "Até R$ 500 mil" },
] as const;

export const OBJETIVO_OPTIONS = [
  { value: "protecao", label: "Organizar meus investimentos" },
  { value: "melhoria", label: "Melhoria da carteira atual" },
  { value: "sucessao", label: "Investimentos com visão de longo prazo" },
  { value: "internacional", label: "Diversificação internacional" },
  { value: "aposentadoria", label: "Aposentadoria confortável" },
  { value: "outro", label: "Outro" },
] as const;

export const FAQ_ITEMS = [
  {
    question: "O que é necessário para começar?",
    answer:
      "Basta entrar em contato pelo formulário ou WhatsApp. Nossa equipe irá agendar uma conversa inicial para entender seus objetivos, perfil e momento financeiro.",
  },
  {
    question: "Quais os benefícios de ter a Libertad como escritório de investimentos?",
    answer:
      "A Libertad une atendimento próximo e personalizado à estrutura da EQI Investimentos — uma das maiores plataformas independentes do Brasil, com o BTG Pactual como custodiante. Você acompanha seus investimentos com acesso a mais de 1.000 oportunidades disponíveis na plataforma EQI.",
  },
  {
    question: "Como funciona a assessoria de investimentos?",
    answer:
      "A assessoria funciona de forma personalizada. Iniciamos com um diagnóstico dos seus objetivos e perfil, apresentamos alternativas disponíveis na plataforma EQI e acompanhamos continuamente com revisões periódicas.",
  },
  {
    question: "Atendem Pessoa Física e Pessoa Jurídica?",
    answer:
      "Sim. Atendemos tanto Pessoa Física quanto Empresas, com acompanhamento de investimentos alinhado aos objetivos, perfil e horizonte de cada cliente.",
  },
  {
    question: "Qual o valor mínimo para começar?",
    answer:
      "Atendemos investidores a partir de R$ 300 mil em patrimônio financeiro. Para acesso ao segmento Private da plataforma EQI, o mínimo é de R$ 5 milhões.",
  },
  {
    question: "A Libertad é uma corretora ou banco?",
    answer:
      "Não. A Libertad Capital é um escritório credenciado à EQI Investimentos que atua na distribuição de produtos de investimento por meio da plataforma EQI. O atendimento é próximo, personalizado e alinhado ao perfil de cada investidor.",
  },
] as const;

export const RAFAELA_SITE_URL = "https://assessorarafaela.com.br/" as const;

export const RAFAELA_CREDENTIALS = ["CEA", "CPA-20", "Ancord", "Profissional Destaque"] as const;

export const HERO_IMAGE =
  "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920&q=80";
