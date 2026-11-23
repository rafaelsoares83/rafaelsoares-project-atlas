import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { portfolio } from "@/config/portfolio";
import { getCaseStudy } from "@/content/projects";

export const Route = createFileRoute("/projetos/$slug")({
  loader: ({ params }) => {
    const study = getCaseStudy(params.slug);
    if (!study) throw notFound();
    return study;
  },
  head: ({ loaderData }) => {
    const title = loaderData ? `${loaderData.title} — ${portfolio.name}` : `Projeto — ${portfolio.name}`;
    const description = loaderData?.summary ?? "Estudo de caso do portfólio.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-6 py-32 text-center">
      <h1 className="font-display text-4xl text-foreground">Projeto não encontrado</h1>
      <Button asChild variant="outline" className="mt-6">
        <Link to="/">Voltar ao portfólio</Link>
      </Button>
    </div>
  ),
  component: CaseStudyPage,
});

function CaseStudyPage() {
  const c = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-background">
      <header className="relative overflow-hidden border-b border-border">
        <div className="rule-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden />
        <div className="relative mx-auto max-w-5xl px-6 pb-14 pt-10">
          <Link
            to="/"
            hash="destaques"
            className="inline-flex items-center gap-2 font-mono text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="size-4" /> {portfolio.name}
          </Link>
          <p className="eyebrow mt-16">Estudo de caso · {c.company}</p>
          <h1 className="mt-3 font-display text-5xl font-medium leading-[1.02] text-foreground md:text-7xl animate-rise">
            {c.title}
          </h1>
          <p className="mt-4 max-w-3xl text-xl leading-relaxed text-foreground/80 animate-rise [animation-delay:80ms]">
            {c.subtitle}
          </p>

          <dl className="mt-12 grid grid-cols-2 overflow-hidden rounded-lg border border-border bg-surface shadow-card md:grid-cols-4 md:divide-x">
            {[
              ["Papel", c.role],
              ["Empresa", c.company],
              ["Período", c.period],
              ["Status", c.status],
            ].map(([k, v]) => (
              <div key={k} className="px-6 py-5">
                <dt className="eyebrow">{k}</dt>
                <dd className="mt-2 text-sm font-medium text-foreground">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-16">
        <Block label="01" title="Contexto">
          <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
            {c.context.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </Block>

        <Block label="02" title="Meu papel">
          <ul className="space-y-3">
            {c.responsibilities.map((r) => (
              <li key={r} className="flex gap-3 text-base leading-relaxed text-foreground/85">
                <CheckCircle2 className="mt-1 size-4 shrink-0 text-primary" />
                {r}
              </li>
            ))}
          </ul>
        </Block>

        <Block label="03" title={c.frontsLabel}>
          <div className="grid gap-4 sm:grid-cols-2">
            {c.fronts.map((f) => (
              <div key={f.area} className="rounded-lg border border-border bg-surface p-5 shadow-card">
                <p className="font-mono text-xs text-primary">{f.area}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.detail}</p>
              </div>
            ))}
          </div>
        </Block>

        <Block label="04" title="Linha do tempo">
          <ol className="relative border-l border-border">
            {c.timeline.map((t, i) => (
              <li key={t.when} className="relative pb-8 pl-8 last:pb-0">
                <span
                  className={`absolute -left-[7px] top-1 size-3.5 rounded-full border-2 border-background ${
                    i === c.timeline.length - 1 ? "bg-primary" : "bg-ring"
                  }`}
                />
                <p className="font-display text-2xl text-foreground">{t.when}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{t.what}</p>
              </li>
            ))}
          </ol>
        </Block>

        <Block label="05" title="Resultado">
          <div className="rounded-lg bg-primary p-8 text-primary-foreground shadow-card-hover">
            <p className="font-display text-2xl leading-snug md:text-3xl">{c.result}</p>
          </div>
        </Block>

        <Block label="06" title="Ferramentas e práticas">
          <ul className="flex flex-wrap gap-2">
            {c.tools.map((t) => (
              <li key={t} className="rounded-full border border-border bg-surface px-3.5 py-1.5 font-mono text-xs text-foreground">
                {t}
              </li>
            ))}
          </ul>
        </Block>

        <div className="mt-20 flex flex-wrap gap-3 border-t border-border pt-10">
          <Button asChild>
            <a href={portfolio.linkedin} target="_blank" rel="noreferrer">Falar comigo no LinkedIn</a>
          </Button>
          <Button asChild variant="outline">
            <Link to="/">Ver todos os projetos</Link>
          </Button>
        </div>
      </main>
    </div>
  );
}

function Block({ label, title, children }: { label: string; title: string; children: React.ReactNode }) {
  return (
    <section className="grid gap-6 border-t border-border py-12 first:border-t-0 first:pt-0 md:grid-cols-[200px_1fr]">
      <div>
        <p className="font-mono text-xs text-muted-foreground">{label}</p>
        <h2 className="mt-1 font-display text-2xl font-medium text-foreground">{title}</h2>
      </div>
      <div>{children}</div>
    </section>
  );
}
