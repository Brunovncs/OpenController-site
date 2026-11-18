import type { NextConfig } from "next";

/**
 * English lives at "/" and every other language under its code ("/pt", "/es", "/fr", "/ja", "/zh"):
 * app/[lang] serves them all, so "/" and the other English pages are rewritten to /en/..., and
 * /en/... redirects back so each page has one URL. A visitor landing on an English page is sent to
 * their language by the language menu's cookie, or without it by Accept-Language. Crawlers send
 * neither and get English, with hreflang to the others. Keep in step with LANGS in lib/i18n.ts.
 */
const PAGES = ["/", "/controllers", "/controllers/:slug", "/changelog", "/help", "/help/:slug"];
const OTHER_LANGS = ["pt", "es", "fr", "ja", "zh"];

const under = (lang: string, p: string) => (p === "/" ? `/${lang}` : `/${lang}${p}`);

const SECURITY_HEADERS = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig: NextConfig = {
  experimental: { globalNotFound: true },
  async redirects() {
    return [
      { source: "/en", destination: "/", permanent: true },
      { source: "/en/:path*", destination: "/:path*", permanent: true },
      ...OTHER_LANGS.flatMap((lang) =>
        PAGES.map((source) => ({
          source,
          destination: under(lang, source),
          permanent: false,
          has: [{ type: "cookie" as const, key: "oc-lang", value: lang }],
        })),
      ),
      ...OTHER_LANGS.flatMap((lang) =>
        PAGES.map((source) => ({
          source,
          destination: under(lang, source),
          permanent: false,
          missing: [{ type: "cookie" as const, key: "oc-lang" }],
          has: [{ type: "header" as const, key: "accept-language", value: `${lang}.*` }],
        })),
      ),
    ];
  },
  async rewrites() {
    return PAGES.map((source) => ({ source, destination: under("en", source) }));
  },
  async headers() {
    return [{ source: "/:path*", headers: SECURITY_HEADERS }];
  },
};

export default nextConfig;
