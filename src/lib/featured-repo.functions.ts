import { createServerFn } from "@tanstack/react-start";

import { portfolio } from "@/config/portfolio";

export type FeaturedRepo = {
  name: string;
  fullName: string;
  url: string;
  description: string | null;
  language: string | null;
  languages: string[];
  stars: number;
  updatedAt: string;
  defaultBranch: string;
  isPrivate: boolean;
};

const GATEWAY_URL = "https://connector-gateway.lovable.dev/github";

// Public read of one fixed repo (from config) via the builder's GitHub connection; takes no input so it can't be used as a proxy.
export const getFeaturedRepo = createServerFn({ method: "GET" }).handler(async (): Promise<FeaturedRepo> => {
  const lovableKey = process.env["LOVABLE_API_KEY"];
  const githubKey = process.env["GITHUB_API_KEY"];
  if (!lovableKey || !githubKey) throw new Error("Conexão com o GitHub não configurada.");
  const headers = {
    Accept: "application/vnd.github+json",
    Authorization: `Bearer ${lovableKey}`,
    "X-Connection-Api-Key": githubKey,
  };
  const path = `repos/${portfolio.githubUser}/${portfolio.featuredRepo}`;
  const [repoRes, langRes] = await Promise.all([
    fetch(`${GATEWAY_URL}/${path}`, { headers }),
    fetch(`${GATEWAY_URL}/${path}/languages`, { headers }),
  ]);
  if (!repoRes.ok) {
    const body = await repoRes.text();
    console.error(`GitHub repo request failed [${repoRes.status}]: ${body}`);
    throw new Error(`Não foi possível carregar o repositório (${repoRes.status}).`);
  }
  const r = (await repoRes.json()) as {
    name: string; full_name: string; html_url: string; description: string | null;
    language: string | null; stargazers_count: number; pushed_at: string;
    default_branch: string; private: boolean;
  };
  const langs = langRes.ok ? Object.keys((await langRes.json()) as Record<string, number>) : [];
  return {
    name: r.name, fullName: r.full_name, url: r.html_url, description: r.description,
    language: r.language, languages: langs.slice(0, 5), stars: r.stargazers_count,
    updatedAt: r.pushed_at, defaultBranch: r.default_branch, isPrivate: r.private,
  };
});
