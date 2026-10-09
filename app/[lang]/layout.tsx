import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";
import { LangProvider } from "@/components/lang";
import { BOOT_SCRIPT } from "@/lib/boot";
import { HTML_LANG, LANGS, isLang } from "@/lib/i18n";
import { AUTHOR } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";
import "../globals.css";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const dynamicParams = false;

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  return {
    metadataBase: new URL(SITE_URL),
    applicationName: "OpenController",
    authors: [{ name: AUTHOR.alternateName, url: AUTHOR.url }],
    creator: AUTHOR.alternateName,
    category: "games",
    // Search Console, property https://opencontroller.com.br/ (Bing imports it from there).
    verification: { google: "FNk63heoVNbmJP2tkUPwE6o6lGAiX0C2094sAz_9ZcE" },
  };
}

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  return (
    <html lang={HTML_LANG[lang]} data-lang={lang} suppressHydrationWarning className={`${geist.variable} ${geistMono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: BOOT_SCRIPT }} />
        <link rel="alternate" type="text/plain" href="/llms.txt" title="llms.txt" />
      </head>
      <body className="min-h-dvh bg-bg text-fg antialiased">
        <LangProvider lang={lang}>{children}</LangProvider>
      </body>
    </html>
  );
}
