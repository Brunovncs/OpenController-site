"use client";

import type { ReactNode } from "react";
import { useLang } from "./lang";

/** Text in both languages; only the one of the page's URL is rendered, so each URL is one language. */
export function T({ en, pt }: { en: ReactNode; pt: ReactNode }) {
  return <>{useLang() === "pt" ? pt : en}</>;
}
