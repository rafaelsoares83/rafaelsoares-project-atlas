import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";

import { ProfileHeader } from "@/components/portfolio/ProfileHeader";
import { ProjectsSection } from "@/components/portfolio/ProjectsSection";
import { portfolio } from "@/config/portfolio";
import { githubReposQuery, githubUserQuery, languageStats, rankRepos } from "@/lib/github";

const title = `${portfolio.name} — Portfólio de Projetos`;
const description = `Projetos de tecnologia de ${portfolio.name}, ${portfolio.role.toLowerCase()}, publicados no GitHub.`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const userQ = useQuery(githubUserQuery(portfolio.githubUser));
  const reposQ = useQuery(githubReposQuery(portfolio.githubUser));

  const repos = useMemo(() => rankRepos(reposQ.data ?? [], portfolio.githubUser), [reposQ.data]);
  const languages = useMemo(() => languageStats(repos), [repos]);
  const stars = repos.reduce((n, r) => n + r.stargazers_count, 0);
  const loading = reposQ.isPending || userQ.isPending;

  return (
    <div className="min-h-screen bg-background">
      <ProfileHeader
        user={userQ.data}
        loading={userQ.isPending}
        stats={[
          { label: "Projetos", value: repos.length },
          { label: "Tecnologias", value: languages.length },
          { label: "Estrelas", value: stars },
          { label: "Seguidores", value: userQ.data?.followers ?? 0 },
        ]}
      />
      <ProjectsSection
        repos={repos}
        languages={languages}
        loading={loading}
        error={(reposQ.error as Error | null) ?? null}
        onRetry={() => void reposQ.refetch()}
      />
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-8 text-sm text-muted-foreground md:flex-row md:justify-between">
          <span>© {new Date().getFullYear()} {portfolio.name}</span>
          <a
            href={`https://github.com/${portfolio.githubUser}`}
            target="_blank"
            rel="noreferrer"
            className="font-mono hover:text-foreground"
          >
            github.com/{portfolio.githubUser}
          </a>
        </div>
      </footer>
    </div>
  );
}
