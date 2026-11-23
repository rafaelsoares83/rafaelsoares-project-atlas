import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { caseStudies } from "@/content/projects";

export function FeaturedProjects() {
  return (
    <section id="destaques" className="mx-auto max-w-6xl scroll-mt-8 px-6 pt-20">
      <p className="eyebrow">Estudos de caso</p>
      <h2 className="mt-2 font-display text-4xl font-medium text-foreground">Projetos em destaque</h2>

      <div className="mt-10 grid gap-5">
        {caseStudies.map((c) => (
          <Link
            key={c.slug}
            to="/projetos/$slug"
            params={{ slug: c.slug }}
            className="group grid overflow-hidden rounded-lg border border-border bg-surface shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:border-ring/40 hover:shadow-card-hover md:grid-cols-[1.4fr_1fr]"
          >
            <div className="p-8 md:p-10">
              <p className="font-mono text-xs text-muted-foreground">
                {c.company} · {c.period}
              </p>
              <h3 className="mt-3 font-display text-4xl font-medium leading-tight text-foreground">{c.title}</h3>
              <p className="mt-2 text-lg text-foreground/80">{c.subtitle}</p>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">{c.summary}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary">
                Ler estudo de caso
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
            <div className="flex flex-col justify-between gap-6 border-t border-border bg-primary p-8 text-primary-foreground md:border-l md:border-t-0 md:p-10">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-primary-foreground/70">Papel</p>
                <p className="mt-1 font-display text-2xl">{c.role}</p>
              </div>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-primary-foreground/70">Status</p>
                <p className="mt-1 font-display text-2xl">{c.status}</p>
              </div>
              <ul className="flex flex-wrap gap-1.5">
                {c.tags.map((t) => (
                  <li key={t} className="rounded border border-primary-foreground/25 px-2 py-0.5 font-mono text-[11px]">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
