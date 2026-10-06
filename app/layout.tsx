import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { BOOT_SCRIPT } from "@/lib/boot";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const serif = Instrument_Serif({ variable: "--font-serif", subsets: ["latin"], weight: "400", style: ["normal", "italic"] });

const description =
  "Open Controller makes any game controller appear to games as an Xbox controller, with fixed player numbers, extra buttons as keys and macros, gyro aiming and light bar colours. Free and open source for Windows, Linux and macOS.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Open Controller: any controller, as an Xbox controller",
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
    <html lang="en" suppressHydrationWarning className={`${geist.variable} ${geistMono.variable} ${serif.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: BOOT_SCRIPT }} />
      </head>
      <body className="min-h-dvh bg-bg text-fg antialiased">{children}</body>
    </html>
  );
}
