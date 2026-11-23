import { FolderGit2, Search } from "lucide-react";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { portfolio } from "@/config/portfolio";
import type { GithubRepo } from "@/lib/github";
import { languageDotClass } from "./language";
import { ProjectCard } from "./ProjectCard";

export function ProjectsSection({
  repos,
  languages,
  loading,
  error,
  onRetry,
}: {
  repos: GithubRepo[];
  languages: { language: string; count: number }[];
  loading: boolean;
  error: Error | null;
  onRetry: () => void;
}) {
  const [lang, setLang] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return repos.filter(
      (r) =>
        (!lang || r.language === lang) &&
        (!q ||
          r.name.toLowerCase().includes(q) ||
          (r.description ?? "").toLowerCase().includes(q) ||
          (r.topics ?? []).some((t) => t.includes(q))),
    );
  }, [repos, lang, query]);

  return (
    <section id="projetos" className="mx-auto max-w-6xl scroll-mt-8 px-6 py-20">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow">GitHub</p>
          <h2 className="mt-2 font-display text-4xl font-medium text-foreground">Repositórios</h2>
        </div>
        {repos.length > 0 && (
          <div className="relative w-full md:w-72">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar projeto ou tecnologia"
              className="bg-surface pl-9"
              aria-label="Buscar projetos"
            />
          </div>
        )}
      </div>

      {languages.length > 0 && (
        <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filtrar por tecnologia">
          <FilterChip active={lang === null} onClick={() => setLang(null)}>
            Todos <span className="text-muted-foreground">{repos.length}</span>
          </FilterChip>
          {languages.map((l) => (
            <FilterChip key={l.language} active={lang === l.language} onClick={() => setLang(l.language)}>
              <span className={`size-2 rounded-full ${languageDotClass(l.language)}`} />
              {l.language} <span className="text-muted-foreground">{l.count}</span>
            </FilterChip>
          ))}
        </div>
      )}

      <div className="mt-10">
        {loading ? (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-56 rounded-lg" />
            ))}
          </div>
        ) : error ? (
          <Notice title="Não foi possível carregar os projetos" text={error.message}>
            <Button variant="outline" onClick={onRetry}>Tentar novamente</Button>
          </Notice>
        ) : repos.length === 0 ? (
          <Notice
            title="Repositórios a caminho"
            text="Os repositórios públicos aparecem aqui automaticamente assim que forem publicados no GitHub."
          >
            <Button asChild variant="outline">
              <a href={`https://github.com/${portfolio.githubUser}?tab=repositories`} target="_blank" rel="noreferrer">
                Ver perfil no GitHub
              </a>
            </Button>
          </Notice>
        ) : visible.length === 0 ? (
          <Notice title="Nenhum projeto encontrado" text="Tente outra busca ou outro filtro." />
        ) : (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {visible.map((r, i) => (
              <ProjectCard key={r.id} repo={r} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 font-mono text-xs transition-colors ${
        active
          ? "border-primary bg-primary text-primary-foreground [&_.text-muted-foreground]:text-primary-foreground/70"
          : "border-border bg-surface text-foreground hover:border-ring/50"
      }`}
    >
      {children}
    </button>
  );
}

function Notice({ title, text, children }: { title: string; text: string; children?: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center rounded-lg border border-dashed border-border bg-surface px-6 py-16 text-center">
      <div className="flex size-12 items-center justify-center rounded-full bg-primary-soft text-primary">
        <FolderGit2 className="size-5" />
      </div>
      <h3 className="mt-4 font-display text-2xl text-foreground">{title}</h3>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">{text}</p>
      {children && <div className="mt-6">{children}</div>}
    </div>
  );
}
