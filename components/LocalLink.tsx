"use client";

import type { ComponentProps } from "react";
import { localePath } from "@/lib/i18n";
import { useLang } from "./lang";

/** A link to one of this site's pages in the current language. `path` is the English path. */
export function LocalLink({ path, ...rest }: Omit<ComponentProps<"a">, "href"> & { path: string }) {
  return <a href={localePath(useLang(), path)} {...rest} />;
}
