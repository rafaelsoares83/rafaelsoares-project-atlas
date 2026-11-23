import { useQuery } from "@tanstack/react-query";
import { ExternalLink, Github } from "lucide-react";

import { getFeaturedRepo } from "@/lib/featured-repo.functions";

export function SourceRepo() {
  const q = useQuery({ queryKey: ["featured-repo"], queryFn: () => getFeaturedRepo(), staleTime: 1000 * 60 * 10, retry: 1 });
  if (q.isError || (q.data && q.data.isPrivate)) return null;
  const r = q.data;
  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <p className="eyebrow">Código aberto</p>
        <h2 className="font-display mt-2 text-3xl text-foreground">Código deste portfólio</h2>
        <div className="mt-6 rounded-md border border-border bg-card p-6">
          {!r ? (
            <div className="h-20 animate-pulse rounded bg-muted" />
          ) : (
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="flex items-center gap-2 font-mono text-sm text-foreground">
                  <Github className="h-4 w-4" /> {r.fullName}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {r.description ?? "Site do portfólio, com estudos de caso e repositórios atualizados automaticamente."}
                </p>
                <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-muted-foreground">
                  {r.languages.length > 0 && <span>{r.languages.join(" · ")}</span>}
                  <span>Atualizado em {new Date(r.updatedAt).toLocaleDateString("pt-BR")}</span>
                  <span>★ {r.stars}</span>
                </p>
              </div>
              <a href={r.url} target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground hover:opacity-90">
                Ver no GitHub <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
