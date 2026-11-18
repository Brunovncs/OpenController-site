import type { MetadataRoute } from "next";
import { MESSAGES } from "@/messages";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "OpenController",
    short_name: "OpenController",
    description: MESSAGES.en.home.meta.description,
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
