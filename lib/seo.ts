import type { Metadata } from "next";
import type { Release } from "./github";
import { absUrl, alternates, HTML_LANG, LANGS, OG_LOCALE, type L, type Lang } from "./i18n";
import { faqItems, plain } from "./faq";
import { guidePath, guideTitle, type Guide } from "./guides";
import { LICENSE_URL, OFFICIAL_DOMAIN, RELEASES_URL, REPO_URL, SITE_URL } from "./site";

/** Head copy for the home page. Facts here must match what the page and the app's CHANGELOG say. */
export const HOME: { title: L; description: L } = {
  title: {
    en: "OpenController: use any controller in PC games, free",
    pt: "OpenController: use qualquer controle nos jogos de PC, de graça",
  },
  description: {
    en: "Use your PlayStation, Switch, 8BitDo and hundreds of other controllers in PC games, alone or with friends. Free and open source for Windows, Linux and Mac.",
    pt: "Use controles de PlayStation, Switch, 8BitDo e centenas de outros nos jogos de PC, sozinho ou com amigos. Gratuito e de código aberto para Windows, Linux e Mac.",
  },
};

/** Who makes it, linked both ways with his own site so search engines tie the two together. */
export const AUTHOR = {
  name: "Bruno Vinicius Veronez de Jesus",
  alternateName: "Bruno Vinicius",
  url: "https://brunovinicius.dev.br",
  sameAs: ["https://github.com/Brunovncs", "https://www.linkedin.com/in/brunoviniciusrp/"],
};

/** A page's whole head: Next replaces openGraph and twitter as a block, so each page sets all of it. */
export function pageMeta(lang: Lang, path: string, title: string, description: string): Metadata {
  const alt = alternates(lang, path);
  const image = {
    url: `/og/${lang}.png`,
    width: 1200,
    height: 630,
    alt: lang === "pt" ? "OpenController: seu controle em qualquer jogo de PC" : "OpenController: your controller in every PC game",
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
    description: HOME.description[lang],
    applicationCategory: "UtilitiesApplication",
    applicationSubCategory: "Game controller mapper",
    operatingSystem: "Windows, Linux, macOS",
    inLanguage: ["en", "pt-BR"],
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
    featureList:
      lang === "pt"
        ? [
            "Controles de PlayStation, Switch, 8BitDo e outros aparecem nos jogos como controle de Xbox 360",
            "Vários controles ao mesmo tempo, cada um com o próprio número de jogador",
            "Botões extras como botão, tecla ou macro, com perfis por jogo",
            "Mira com giroscópio",
            "Luz e bateria do controle",
          ]
        : [
            "PlayStation, Switch, 8BitDo and other controllers show up in games as an Xbox 360 controller",
            "Several controllers at once, each with its own player number",
            "Extra buttons as a button, a key or a macro, with profiles per game",
            "Gyro aiming",
            "Controller light and battery",
          ],
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

export function homeJsonLd(lang: Lang, release: Release | null, appReports: boolean) {
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
        mainEntity: faqItems(appReports).map((f) => ({
          "@type": "Question",
          name: f.q[lang],
          acceptedAnswer: { "@type": "Answer", text: plain(f.a[lang]) },
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
        name: guideTitle(g)[lang],
        description,
        inLanguage: HTML_LANG[lang],
        isPartOf: { "@id": ID.site },
        about: { "@id": ID.app },
        mentions: models.slice(0, 60).map((name) => ({ "@type": "Product", name })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "OpenController", item: absUrl(lang) },
          { "@type": "ListItem", position: 2, name: lang === "pt" ? "Controles" : "Controllers", item: absUrl(lang, "/controllers") },
          { "@type": "ListItem", position: 3, name: guideTitle(g)[lang], item: url },
        ],
      },
      website(lang),
      { "@type": "SoftwareApplication", "@id": ID.app, name: "OpenController", url: absUrl(lang), applicationCategory: "UtilitiesApplication", operatingSystem: "Windows, Linux, macOS", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } },
    ],
  };
}
