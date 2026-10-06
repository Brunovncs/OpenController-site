import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { BOOT_SCRIPT } from "@/lib/boot";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const description =
  "Use your PlayStation, Switch, 8BitDo and hundreds of other controllers in PC games, alone or with friends. Free and open source for Windows, Linux and Mac.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "OpenController: your controller in every PC game",
  description,
  applicationName: "OpenController",
  keywords: ["controller", "gamepad", "PC games", "PlayStation controller on PC", "DualSense", "DualShock 4", "Switch Pro", "8BitDo", "DS4Windows alternative"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "OpenController",
    title: "OpenController",
    description,
    locale: "en_US",
    alternateLocale: ["pt_BR"],
  },
  twitter: { card: "summary_large_image", title: "OpenController", description },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geist.variable} ${geistMono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: BOOT_SCRIPT }} />
      </head>
      <body className="min-h-dvh bg-bg text-fg antialiased">{children}</body>
    </html>
  );
}
