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

export const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/rafaela_alvez/",
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
  { label: "Preservação Patrimonial", href: "#solucoes" },
  { label: "Crescimento Patrimonial", href: "#solucoes" },
  { label: "Diversificação Global", href: "#solucoes" },
  { label: "Planejamento Sucessório", href: "#solucoes" },
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
    text: "Estratégias para empresários que buscam separar e proteger o patrimônio pessoal do empresarial.",
  },
  {
    icon: "trending-up" as const,
    title: "Executivos",
    text: "Planejamento patrimonial para executivos em fase de acumulação e transição de carreira.",
  },
  {
    icon: "award" as const,
    title: "Profissionais Liberais",
    text: "Médicos, advogados e especialistas que precisam de estratégia para o patrimônio construído.",
  },
  {
    icon: "home" as const,
    title: "Famílias Patrimonializadas",
    text: "Planejamento sucessório e proteção patrimonial para famílias com visão de longo prazo.",
  },
  {
    icon: "bar-chart-2" as const,
    title: "Investidores Sofisticados",
    text: "Acesso a estratégias e produtos diferenciados para investidores qualificados e experientes.",
  },
  {
    icon: "shield" as const,
    title: "Sucessão Patrimonial",
    text: "Estruturação de sucessão para garantir a perpetuação do patrimônio familiar.",
  },
] as const;

export const SOLUTIONS_CARDS = [
  {
    icon: "shield-check" as const,
    title: "Preservação Patrimonial",
    text: "Proteção do patrimônio construído ao longo de décadas, com estratégias de baixo risco e alta eficiência.",
  },
  {
    icon: "trending-up" as const,
    title: "Crescimento Patrimonial",
    text: "Estratégias para expansão patrimonial sustentável, alinhadas ao seu perfil e horizonte de tempo.",
  },
  {
    icon: "globe" as const,
    title: "Diversificação Global",
    text: "Acesso a oportunidades nacionais e internacionais através da plataforma EQI Investimentos.",
  },
  {
    icon: "users" as const,
    title: "Planejamento Sucessório",
    text: "Estruturas para perpetuação e transferência eficiente do patrimônio familiar entre gerações.",
  },
  {
    icon: "bar-chart" as const,
    title: "Mercado de Capitais",
    text: "Oportunidades selecionadas em renda variável, fundos e ofertas públicas para investidores qualificados.",
  },
  {
    icon: "layers" as const,
    title: "Investimentos Alternativos",
    text: "Acesso a estratégias diferenciadas em IA, clean tech, robótica e outros ativos alternativos via plataforma EQI.",
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
    "Recomendação alinhada com seus objetivos",
    "Estratégias personalizadas e monitoramento contínuo",
    "Parceria para crescimento patrimonial sustentável",
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
    text: "Construção de um plano patrimonial personalizado e alinhado ao seu perfil.",
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
  "Câmbio, seguros e crédito",
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
      "+ de 1000 produtos com segurança e autonomia para que você atinja seus objetivos.",
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
  { value: "protecao", label: "Proteção patrimonial" },
  { value: "melhoria", label: "Melhoria da carteira atual" },
  { value: "sucessao", label: "Planejamento sucessório" },
  { value: "internacional", label: "Diversificação internacional" },
  { value: "aposentadoria", label: "Aposentadoria confortável" },
  { value: "outro", label: "Outro" },
] as const;

export const FAQ_ITEMS = [
  {
    question: "O que é necessário para começar?",
    answer:
      "Basta entrar em contato pelo formulário ou WhatsApp. Nossa equipe irá agendar uma conversa inicial para entender seus objetivos e apresentar as melhores estratégias para o seu perfil.",
  },
  {
    question: "Quais os benefícios de ter a Libertad como parceira patrimonial?",
    answer:
      "A Libertad une o atendimento próximo e personalizado de uma boutique patrimonial com a estrutura e solidez da EQI Investimentos — uma das maiores plataformas independentes do Brasil, com o BTG Pactual como custodiante. Você tem acesso a mais de 1.000 oportunidades de investimento, com uma estratégia construída exclusivamente para o seu perfil.",
  },
  {
    question: "Como funciona a assessoria?",
    answer:
      "A assessoria funciona de forma personalizada. Iniciamos com um diagnóstico completo do seu patrimônio e objetivos, construímos uma estratégia sob medida, implementamos as melhores soluções disponíveis e acompanhamos continuamente com revisões periódicas.",
  },
  {
    question: "Atendem Pessoa Física e Pessoa Jurídica?",
    answer:
      "Sim. Atendemos tanto Pessoa Física quanto Empresas, adaptando as estratégias às necessidades específicas de cada perfil — seja para proteção patrimonial pessoal, planejamento sucessório familiar ou gestão de recursos empresariais.",
  },
  {
    question: "Qual o valor mínimo para começar?",
    answer:
      "Atendemos investidores a partir de R$ 300 mil em patrimônio financeiro. Para estratégias mais sofisticadas, como acesso ao segmento Private, o mínimo é de R$ 5 milhões.",
  },
  {
    question: "A Libertad é uma corretora ou banco?",
    answer:
      "Não. A Libertad Capital é um escritório de assessoria de investimentos credenciado à EQI Investimentos. Isso significa que operamos com total independência e liberdade para recomendar as melhores estratégias para cada cliente, sem conflito de interesse.",
  },
] as const;

export const RAFAELA_SITE_URL = "https://assessorarafaela.com.br/" as const;

export const RAFAELA_CREDENTIALS = ["CEA", "CPA-20", "Ancord", "Profissional Destaque"] as const;

export const HERO_IMAGE =
  "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920&q=80";
