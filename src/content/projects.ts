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
];

export const getCaseStudy = (slug: string) => caseStudies.find((c) => c.slug === slug);
