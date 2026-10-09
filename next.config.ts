import type { NextConfig } from "next";

/**
 * English lives at "/" and Portuguese at "/pt": app/[lang] serves both, so "/" and the other
 * English pages are rewritten to /en/..., and /en/... redirects back so each page has one URL.
 * A visitor landing on an English page is sent to Portuguese by the language switch's cookie, or
 * without it by Accept-Language. Crawlers send neither and get English, with hreflang to /pt.
 */
const PAGES = ["/", "/controllers", "/controllers/:slug"];

const toPt = (p: string) => (p === "/" ? "/pt" : `/pt${p}`);
const toEn = (p: string) => (p === "/" ? "/en" : `/en${p}`);

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
      ...PAGES.flatMap((source) => [
        { source, destination: toPt(source), permanent: false, has: [{ type: "cookie" as const, key: "oc-lang", value: "pt" }] },
        {
          source,
          destination: toPt(source),
          permanent: false,
          missing: [{ type: "cookie" as const, key: "oc-lang" }],
          has: [{ type: "header" as const, key: "accept-language", value: "pt.*" }],
        },
      ]),
    ];
  },
  async rewrites() {
    return PAGES.map((source) => ({ source, destination: toEn(source) }));
  },
  async headers() {
    return [{ source: "/:path*", headers: SECURITY_HEADERS }];
  },
};

export default nextConfig;
