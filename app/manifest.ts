import type { MetadataRoute } from "next";
import { HOME } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "OpenController",
    short_name: "OpenController",
    description: HOME.description.en,
    start_url: "/",
    display: "browser",
    background_color: "#000000",
    theme_color: "#000000",
    icons: [
      { src: "/icon.svg", type: "image/svg+xml", sizes: "any" },
      { src: "/brand/icon-256.png", type: "image/png", sizes: "256x256" },
    ],
  };
}
