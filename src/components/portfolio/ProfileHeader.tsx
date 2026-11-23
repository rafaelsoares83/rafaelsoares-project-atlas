import { ArrowUpRight, Github, MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { portfolio } from "@/config/portfolio";
import type { GithubUser } from "@/lib/github";

type Stat = { label: string; value: number | string };

export function ProfileHeader({
  user,
  loading,
  stats,
}: {
  user: GithubUser | undefined;
  loading: boolean;
  stats: Stat[];
}) {
  const initials = portfolio.name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");

  return (
    <header className="relative overflow-hidden border-b border-border">
      <div className="rule-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-6 pb-16 pt-10 md:pb-20">
        <nav className="flex items-center justify-between">
          <span className="font-mono text-sm text-muted-foreground">@{portfolio.githubUser}</span>
          <Button asChild variant="outline" size="sm">
            <a href={`https://github.com/${portfolio.githubUser}`} target="_blank" rel="noreferrer">
              <Github /> GitHub
            </a>
          </Button>
        </nav>

        <div className="mt-16 grid gap-10 md:mt-24 md:grid-cols-[auto_1fr] md:items-end">
          <div className="animate-rise">
            {loading ? (
              <Skeleton className="size-28 rounded-full" />
            ) : user?.avatar_url ? (
              <img
                src={user.avatar_url}
                alt={portfolio.name}
                className="size-28 rounded-full border border-border bg-surface object-cover shadow-card"
              />
            ) : (
              <div className="flex size-28 items-center justify-center rounded-full bg-primary font-display text-4xl text-primary-foreground">
                {initials}
              </div>
            )}
          </div>

          <div className="animate-rise [animation-delay:80ms]">
            <p className="eyebrow">Portfólio · {portfolio.role}</p>
            <h1 className="mt-3 font-display text-5xl font-medium leading-[1.02] text-foreground md:text-7xl">
              {portfolio.name}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              {user?.bio || portfolio.tagline}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button asChild>
                <a href="#projetos">
                  Ver projetos <ArrowUpRight />
                </a>
              </Button>
              {user?.location && (
                <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="size-4" /> {user.location}
                </span>
              )}
            </div>
          </div>
        </div>

        <dl className="mt-14 grid grid-cols-2 divide-border overflow-hidden rounded-lg border border-border bg-surface shadow-card md:grid-cols-4 md:divide-x">
          {stats.map((s) => (
            <div key={s.label} className="px-6 py-5">
              <dt className="eyebrow">{s.label}</dt>
              <dd className="mt-2 font-display text-3xl text-foreground">
                {loading ? <Skeleton className="h-8 w-12" /> : s.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </header>
  );
}
