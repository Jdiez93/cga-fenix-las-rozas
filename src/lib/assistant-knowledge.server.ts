// Builds the assistant's knowledge base from the public pages' source at build time.
// Admin pages are deliberately excluded so the bot never sees private student data.
const routeFiles = import.meta.glob("/src/routes/*.tsx", { query: "?raw", import: "default", eager: true }) as Record<string, string>;
const siteFiles = import.meta.glob(
  ["/src/components/site/HomeFaq.tsx", "/src/components/site/SiteHeader.tsx", "/src/components/site/SiteFooter.tsx"],
  { query: "?raw", import: "default", eager: true },
) as Record<string, string>;

function toText(src: string): string {
  return src
    .replace(/^import .*$/gm, "")
    .replace(/className=\{?`[^`]*`\}?/g, "")
    .replace(/className="[^"]*"/g, "")
    .replace(/style=\{\{[^}]*\}\}/g, "")
    .replace(/<\/?[A-Za-z][^>]*>/g, " ")
    .replace(/\{"\s*"\}/g, " ")
    .replace(/[ \t]+/g, " ")
    .replace(/\n\s*\n+/g, "\n")
    .trim();
}

let cached: string | null = null;
export function getKnowledge(): string {
  if (cached) return cached;
  const parts: string[] = [];
  for (const [path, src] of Object.entries({ ...routeFiles, ...siteFiles })) {
    const name = path.split("/").pop()!;
    if (name.startsWith("admin") || name.startsWith("__root")) continue;
    parts.push(`### ${name}\n${toText(src).slice(0, 15000)}`);
  }
  cached = parts.join("\n\n");
  return cached;
}
