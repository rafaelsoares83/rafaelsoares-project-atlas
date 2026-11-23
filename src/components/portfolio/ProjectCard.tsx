import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ArrowUpRight, ExternalLink, GitFork, Star } from "lucide-react";

import type { GithubRepo } from "@/lib/github";
import { languageDotClass } from "./language";

export function ProjectCard({ repo, index }: { repo: GithubRepo; index: number }) {
  const updated = formatDistanceToNow(new Date(repo.pushed_at), { addSuffix: true, locale: ptBR });

  return (
    <article
      className="group relative flex flex-col rounded-lg border border-border bg-surface p-6 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:border-ring/40 hover:shadow-card-hover animate-rise"
      style={{ animationDelay: `${Math.min(index, 8) * 50}ms` }}
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className="font-display text-2xl font-medium leading-tight text-foreground">
          <a href={repo.html_url} target="_blank" rel="noreferrer" className="after:absolute after:inset-0">
            {repo.name.replace(/[-_]/g, " ")}
          </a>
        </h3>
        <ArrowUpRight className="size-5 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
      </div>

      <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
        {repo.description || "Projeto sem descrição no GitHub."}
      </p>

      {repo.topics && repo.topics.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {repo.topics.slice(0, 4).map((t) => (
            <li key={t} className="rounded bg-primary-soft px-2 py-0.5 font-mono text-[11px] text-accent-foreground">
              {t}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-border pt-4 font-mono text-xs text-muted-foreground">
        {repo.language && (
          <span className="inline-flex items-center gap-1.5">
            <span className={`size-2 rounded-full ${languageDotClass(repo.language)}`} />
            {repo.language}
          </span>
        )}
        <span className="inline-flex items-center gap-1">
          <Star className="size-3.5" /> {repo.stargazers_count}
        </span>
        <span className="inline-flex items-center gap-1">
          <GitFork className="size-3.5" /> {repo.forks_count}
        </span>
        <span className="ml-auto">{updated}</span>
      </div>

      {repo.homepage && (
        <a
          href={repo.homepage}
          target="_blank"
          rel="noreferrer"
          className="relative z-10 mt-4 inline-flex items-center gap-1.5 self-start text-sm font-medium text-primary hover:underline"
        >
          Ver online <ExternalLink className="size-3.5" />
        </a>
      )}
    </article>
  );
}
