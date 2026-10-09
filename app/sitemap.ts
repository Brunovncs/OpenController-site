import type { MetadataRoute } from "next";
import { getLatestRelease } from "@/lib/github";
import { GUIDES, guidePath } from "@/lib/guides";
import { absUrl, LANGS } from "@/lib/i18n";

export const revalidate = 3600;

/** Every page in both languages, each listing the other through hreflang alternates. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const release = await getLatestRelease();
  // The pages follow the app: they change when a version comes out.
  const lastModified = release?.publishedAt ? new Date(release.publishedAt) : undefined;
  const paths: { path: string; priority: number }[] = [
    { path: "/", priority: 1 },
    { path: "/controllers", priority: 0.8 },
    ...GUIDES.map((g) => ({ path: guidePath(g), priority: 0.6 })),
  ];
  return paths.flatMap(({ path, priority }) =>
    LANGS.map((lang) => ({
      url: absUrl(lang, path),
      lastModified,
      changeFrequency: "weekly" as const,
      priority,
      alternates: { languages: { en: absUrl("en", path), "pt-BR": absUrl("pt", path), "x-default": absUrl("en", path) } },
    })),
  );
}
