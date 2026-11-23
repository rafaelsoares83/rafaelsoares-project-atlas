// Featured case studies, written from Rafael's CV. Shown above the GitHub repos.
export type CaseStudy = {
  slug: string;
  title: string;
  subtitle: string;
  company: string;
  period: string;
  role: string;
  status: string;
  summary: string;
  tags: string[];
  context: string[];
  responsibilities: string[];
  fronts: { area: string; detail: string }[];
  frontsLabel: string;
  timeline: { when: string; what: string }[];
  result: string;
  tools: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "reforma-tributaria",
    title: "Reforma Tributária",
    subtitle: "Adequação dos sistemas SAP ao novo modelo de tributação sobre o consumo",
    company: "Libbs Farmacêutica",
    period: "Abr/2024 – Nov/2026",
    role: "Product Owner",
    status: "Pronto para produção em jan/2027",
    summary:
      "Liderança e coordenação das entregas sistêmicas obrigatórias para preparar os processos fiscais, contábeis, financeiros e de custos no SAP para a entrada em vigor do IBS e da CBS.",
    tags: ["SAP", "Reforma Tributária", "IBS / CBS", "Product Ownership"],
    context: [
      "A Emenda Constitucional 132/2023 e a Lei Complementar 214/2025 substituem PIS, Cofins, IPI, ICMS e ISS por um IVA dual — CBS (federal) e IBS (estados e municípios) — além do Imposto Seletivo.",
      "A transição começa em 2026 e, a partir de 2027, a CBS passa a valer integralmente. Empresas precisam ter cálculo, documentos fiscais, contabilização e apuração prontos nos seus sistemas antes disso.",
      "Em uma indústria farmacêutica de grande porte, a mudança atinge praticamente toda a cadeia: vendas, compras, faturamento, créditos, custos e margens.",
    ],
    responsibilities: [
      "Gestão e priorização do Product Backlog da Reforma Tributária nos sistemas SAP.",
      "Análises de impacto sistêmico e levantamento de requisitos funcionais junto às áreas fiscal, tributária, contábil, financeira e de custos.",
      "Avaliação de viabilidade e definição de soluções com especialistas, consultorias e parceiros.",
      "Planejamento de entregas e releases, com acompanhamento de prazos, riscos e dependências.",
      "Gestão de stakeholders, fornecedores, contratos e orçamento, garantindo rastreabilidade e alinhamento entre negócio e TI.",
    ],
    fronts: [
      { area: "SD · Vendas", detail: "Cálculo dos novos tributos nos documentos de saída e faturamento." },
      { area: "MM · Compras", detail: "Tratamento das entradas e do aproveitamento de créditos." },
      { area: "FI · Financeiro", detail: "Contabilização, apuração e reflexos financeiros." },
      { area: "CO · Custos", detail: "Impacto dos novos tributos em custos, preços e margens." },
    ],
    frontsLabel: "Frentes de trabalho no SAP",
    timeline: [
      { when: "2024", what: "Início da atuação, entendimento da legislação e mapeamento de impactos nos processos e no SAP." },
      { when: "2025", what: "Levantamento e priorização de requisitos, definição de soluções com parceiros e planejamento das releases." },
      { when: "2026", what: "Construção, testes e homologação; adequações obrigatórias concluídas até novembro." },
      { when: "2027", what: "Entrada em produção a partir de janeiro, com o início da CBS integral." },
    ],
    result:
      "Adequações sistêmicas obrigatórias concluídas até novembro de 2026, com os processos preparados para entrar em produção a partir de janeiro de 2027.",
    tools: ["SAP SD", "SAP MM", "SAP FI", "SAP CO", "TaxOne", "Scrum", "Kanban", "Gestão de backlog e roadmap"],
  },
  {
    slug: "cwi-automacao-e-integracao",
    title: "Automação e Integração com TOTVS Protheus",
    subtitle: "Painel de Pricing e Catálogo Digital de Produtos construídos sobre os dados do ERP",
    company: "CWI Software",
    period: "Fev/2022 – Ago/2023",
    role: "Analista de Sistemas e Negócios",
    status: "Entregas concluídas em ago/2023",
    summary:
      "Análise, especificação e acompanhamento de soluções de automação de processos e integração de sistemas, com a construção de um Painel de Pricing e de um Catálogo Digital de Produtos integrados ao TOTVS Protheus.",
    tags: ["TOTVS Protheus", "Integração de sistemas", "Automação de processos", "Análise de negócios"],
    context: [
      "A CWI Software desenvolve software sob demanda: cada projeto começa com um cliente que precisa resolver um processo manual ou tirar dados do ERP para fora dele.",
      "O TOTVS Protheus concentrava as informações de custos, margens, produtos e pedidos, mas essas informações não chegavam de forma organizada a quem forma preços nem a quem vende.",
      "O trabalho foi transformar essas necessidades em soluções funcionais: especificações claras, processos automatizados e integrações confiáveis entre o ERP e os sistemas de venda.",
    ],
    responsibilities: [
      "Atuação junto aos clientes na identificação de necessidades, definição de estratégias e acompanhamento de processos de negócio.",
      "Análise e especificação de soluções tecnológicas, com foco em automação de processos e integração de sistemas.",
      "Construção de processos automatizados com base em bancos de dados do ERP TOTVS Protheus.",
      "Estruturação dos processos de abertura e gerenciamento de tickets para geração de documentos e integração entre sistemas.",
      "Elaboração de especificações funcionais e técnicas, documentação de requisitos e modelagem de processos.",
      "Interface com desenvolvimento e QA na validação de cenários, revisão de requisitos e acompanhamento das entregas até a produção.",
      "Organização de roadmap e backlog com metodologias ágeis e Azure DevOps.",
      "Participação em projetos de integração com LinkAPI, envolvendo Protheus, Salesforce e Anymarket.",
    ],
    fronts: [
      {
        area: "Painel de Pricing",
        detail: "Consolidação de informações de custos e margens para apoiar a formação de preços.",
      },
      {
        area: "Catálogo Digital",
        detail: "Consulta de produtos e montagem de pedidos com envio ao ERP por API.",
      },
      {
        area: "Integrações",
        detail: "Protheus, Salesforce e Anymarket conectados via LinkAPI.",
      },
      {
        area: "Automação de tickets",
        detail: "Abertura e gerenciamento de tickets com geração de documentos entre sistemas.",
      },
    ],
    frontsLabel: "Frentes de trabalho",
    timeline: [
      { when: "Fev/2022", what: "Início: entendimento dos processos do cliente e mapeamento dos dados disponíveis no Protheus." },
      { when: "2022", what: "Especificação funcional e técnica, modelagem de processos e organização do backlog em Azure DevOps." },
      { when: "1º sem. 2023", what: "Construção e validação das soluções com desenvolvimento e QA, com ajustes de requisitos." },
      { when: "Ago/2023", what: "Entregas implantadas em produção e ciclo encerrado." },
    ],
    result:
      "Painel de Pricing e Catálogo Digital de Produtos entregues e em uso: custos e margens consolidados para a formação de preços e pedidos lançados no ERP por API, com a integração entre Protheus, Salesforce e Anymarket sustentando o fluxo.",
    tools: [
      "TOTVS Protheus",
      "LinkAPI",
      "Salesforce",
      "Anymarket",
      "SQL",
      ".NET Core 6.0",
      "Node.js 12",
      "Microsserviços",
      "Docker",
      "Azure DevOps",
    ],
  },
];

export const getCaseStudy = (slug: string) => caseStudies.find((c) => c.slug === slug);
