const DOTS = ["bg-chart-1", "bg-chart-2", "bg-chart-3", "bg-chart-4", "bg-chart-5"] as const;

/** Stable color per language, drawn from the chart tokens. */
export function languageDotClass(language: string): string {
  let h = 0;
  for (const c of language) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return DOTS[h % DOTS.length] ?? "bg-chart-1";
}
