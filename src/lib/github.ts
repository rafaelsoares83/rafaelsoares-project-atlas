import { queryOptions } from "@tanstack/react-query";

export type GithubUser = {
  login: string;
  name: string | null;
  avatar_url: string;
  html_url: string;
  bio: string | null;
  location: string | null;
  blog: string | null;
  public_repos: number;
  followers: number;
  following: number;
};

export type GithubRepo = {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  homepage: string | null;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics?: string[];
  fork: boolean;
  archived: boolean;
  pushed_at: string;
};

const API = "https://api.github.com";

async function getJson<T>(url: string): Promise<T> {
  const res = await fetch(url, { headers: { Accept: "application/vnd.github+json" } });
  if (res.status === 404) throw new Error("Usuário do GitHub não encontrado.");
  if (res.status === 403) throw new Error("Limite de acessos ao GitHub atingido. Tente de novo em alguns minutos.");
  if (!res.ok) throw new Error(`Erro ao falar com o GitHub (${res.status}).`);
  return (await res.json()) as T;
}

// Fetched in the browser: GitHub's anonymous rate limit is per IP, and shared
// edge-worker IPs exhaust it quickly.
export const githubUserQuery = (username: string) =>
  queryOptions({
    queryKey: ["github", "user", username],
    queryFn: () => getJson<GithubUser>(`${API}/users/${username}`),
    staleTime: 1000 * 60 * 10,
    retry: 1,
  });

export const githubReposQuery = (username: string) =>
  queryOptions({
    queryKey: ["github", "repos", username],
    queryFn: () =>
      getJson<GithubRepo[]>(`${API}/users/${username}/repos?per_page=100&sort=pushed`),
    staleTime: 1000 * 60 * 10,
    retry: 1,
  });

/**
 * Own, non-archived repos first by stars, then by most recent activity.
 * Skips the profile-README repo (named after the account), which is not a project.
 */
export function rankRepos(repos: GithubRepo[], login: string): GithubRepo[] {
  const profileRepo = login.toLowerCase();
  return repos
    .filter((r) => !r.fork && !r.archived && r.name.toLowerCase() !== profileRepo)
    .sort(
      (a, b) =>
        b.stargazers_count - a.stargazers_count ||
        new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime(),
    );
}

/** Languages ordered by how many repos use them. */
export function languageStats(repos: GithubRepo[]): { language: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const r of repos) {
    if (r.language) counts.set(r.language, (counts.get(r.language) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([language, count]) => ({ language, count }))
    .sort((a, b) => b.count - a.count);
}
