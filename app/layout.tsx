import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { BOOT_SCRIPT } from "@/lib/boot";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const description =
  "Use your PlayStation, Switch, 8BitDo or almost any other controller in PC games. Several players at once, support for extra buttons like back paddles, and aiming by moving the controller. Free and open source for Windows, Linux and macOS.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Open Controller: your controller in every PC game",
  description,
  applicationName: "Open Controller",
  keywords: ["controller", "gamepad", "DualSense", "DualShock 4", "Switch Pro", "8BitDo", "XInput", "ViGEmBus", "DS4Windows alternative", "gyro"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Open Controller",
    title: "Open Controller",
    description,
    locale: "en_US",
    alternateLocale: ["pt_BR"],
  },
  twitter: { card: "summary_large_image", title: "Open Controller", description },
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
