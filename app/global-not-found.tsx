import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Page not found | OpenController",
  robots: { index: false },
};

/** Any URL no page matches. It is in both languages, since the URL says nothing about which. */
export default function GlobalNotFound() {
  return (
    <html lang="en" className={geist.variable}>
      <body className="grid min-h-dvh place-items-center bg-bg px-4 text-fg antialiased">
        <main className="max-w-md py-24">
          <h1 className="display text-[34px]">Page not found.</h1>
          <p className="mt-3 text-muted">
            This address doesn&apos;t exist. <Link className="text-fg underline underline-offset-4" href="/">Go to OpenController</Link>.
          </p>
          <div lang="pt-BR" className="mt-10 border-t border-line pt-8">
            <p className="text-[22px] font-semibold tracking-tight">Página não encontrada.</p>
            <p className="mt-3 text-muted">
              Este endereço não existe. <Link className="text-fg underline underline-offset-4" href="/pt">Ir para o OpenController</Link>.
            </p>
          </div>
        </main>
      </body>
    </html>
  );
}
