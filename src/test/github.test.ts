import { describe, expect, it } from "vitest";

import { rankRepos, type GithubRepo } from "@/lib/github";

const repo = (o: Partial<GithubRepo>): GithubRepo => ({
  id: Math.random(), name: "x", full_name: "u/x", html_url: "", homepage: null, description: null,
  language: null, stargazers_count: 0, forks_count: 0, fork: false, archived: false,
  pushed_at: "2026-01-01T00:00:00Z", ...o,
});

describe("rankRepos", () => {
  it("hides the profile README repo named after the account", () => {
    const out = rankRepos([repo({ name: "rafaelsoares83" }), repo({ name: "app" })], "rafaelsoares83");
    expect(out.map((r) => r.name)).toEqual(["app"]);
  });

  it("hides forks and archived repos", () => {
    const out = rankRepos([repo({ name: "f", fork: true }), repo({ name: "a", archived: true }), repo({ name: "ok" })], "u");
    expect(out.map((r) => r.name)).toEqual(["ok"]);
  });
});
