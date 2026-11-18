import type { Metadata } from "next";
import type { Release } from "./github";
import { MESSAGES } from "@/messages";
import { absUrl, alternates, HTML_LANG, LANGS, OG_LOCALE, type Lang } from "./i18n";
import { faqItems, plain } from "./faq";
import { guidePath, guideTitle, type Guide } from "./guides";
import { LICENSE_URL, OFFICIAL_DOMAIN, RELEASES_URL, REPO_URL, SITE_URL, TWITTER_URL } from "./site";

/** Who makes it, linked both ways with his own site so search engines tie the two together. */
export const AUTHOR = {
  name: "Bruno Vinicius Veronez de Jesus",
  alternateName: "Bruno Vinicius",
  url: "https://brunovinicius.dev.br",
  sameAs: ["https://github.com/Brunovncs", "https://www.linkedin.com/in/brunoviniciusrp/", TWITTER_URL],
};

/** A page's whole head: Next replaces openGraph and twitter as a block, so each page sets all of it. */
export function pageMeta(lang: Lang, path: string, title: string, description: string): Metadata {
  const alt = alternates(lang, path);
  const image = {
    url: `/og/${lang}.png`,
    width: 1200,
    height: 630,
    alt: "OpenController",
  };
  return {
    title: { absolute: title },
    description,
    alternates: alt,
    openGraph: {
      type: "website",
      url: alt.canonical,
      siteName: "OpenController",
      title,
      description,
      locale: OG_LOCALE[lang],
      alternateLocale: LANGS.filter((l) => l !== lang).map((l) => OG_LOCALE[l]),
      images: [image],
    },
    twitter: { card: "summary_large_image", title, description, images: [image.url] },
  };
}

const ID = {
  site: `${SITE_URL}/#website`,
  app: `${SITE_URL}/#app`,
  author: `${SITE_URL}/#author`,
};

export function jsonLdScript(data: object): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

function author() {
  return { "@type": "Person", "@id": ID.author, ...AUTHOR };
}

function app(lang: Lang, release: Release | null) {
  return {
    "@type": "SoftwareApplication",
    "@id": ID.app,
    name: "OpenController",
    url: absUrl(lang),
    description: MESSAGES[lang].home.meta.description,
    applicationCategory: "UtilitiesApplication",
    applicationSubCategory: "Game controller mapper",
    operatingSystem: "Windows, Linux, macOS",
    inLanguage: LANGS.map((l) => HTML_LANG[l]),
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    license: LICENSE_URL,
    author: { "@id": ID.author },
    image: `${SITE_URL}/brand/icon-256.png`,
    screenshot: `${SITE_URL}/window.png`,
    downloadUrl: RELEASES_URL,
    installUrl: absUrl(lang, "/#platforms"),
    sameAs: [REPO_URL],
    ...(release
      ? {
          softwareVersion: release.version,
          releaseNotes: release.url,
          ...(release.publishedAt ? { dateModified: release.publishedAt } : {}),
        }
      : {}),
    featureList: MESSAGES[lang].home.meta.features,
  };
}

function website(lang: Lang) {
  return {
    "@type": "WebSite",
    "@id": ID.site,
    url: `${SITE_URL}/`,
    name: "OpenController",
    alternateName: OFFICIAL_DOMAIN,
    inLanguage: HTML_LANG[lang],
    publisher: { "@id": ID.author },
    about: { "@id": ID.app },
  };
}

export function homeJsonLd(lang: Lang, release: Release | null, appReports: boolean, appMapping: boolean) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      website(lang),
      app(lang, release),
      author(),
      {
        "@type": "FAQPage",
        "@id": `${absUrl(lang)}#faq`,
        inLanguage: HTML_LANG[lang],
        mainEntity: faqItems(lang, appReports, appMapping).map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: plain(f.a) },
        })),
      },
    ],
  };
}

export function guideJsonLd(lang: Lang, g: Guide, description: string, models: string[]) {
  const url = absUrl(lang, guidePath(g));
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": url,
        url,
        name: guideTitle(g, lang),
        description,
        inLanguage: HTML_LANG[lang],
        isPartOf: { "@id": ID.site },
        about: { "@id": ID.app },
        mentions: models.slice(0, 60).map((name) => ({ "@type": "Thing", name })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "OpenController", item: absUrl(lang) },
          { "@type": "ListItem", position: 2, name: MESSAGES[lang].guides.page.controllers, item: absUrl(lang, "/controllers") },
          { "@type": "ListItem", position: 3, name: guideTitle(g, lang), item: url },
        ],
      },
      website(lang),
      { "@type": "SoftwareApplication", "@id": ID.app, name: "OpenController", url: absUrl(lang), applicationCategory: "UtilitiesApplication", operatingSystem: "Windows, Linux, macOS", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } },
    ],
  };
}
