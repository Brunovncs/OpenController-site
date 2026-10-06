"use client";

import { useEffect } from "react";

type UAData = { getHighEntropyValues?: (hints: string[]) => Promise<{ architecture?: string }> };

/**
 * On a Mac, Chromium can tell Apple silicon from Intel through client hints. Other browsers
 * cannot, so the boot script's arm64 default stays and the page offers the Intel build next to it.
 */
export function PlatformRefine() {
  useEffect(() => {
    const d = document.documentElement;
    if (d.getAttribute("data-os") !== "mac") return;
    const uad = (navigator as Navigator & { userAgentData?: UAData }).userAgentData;
    uad
      ?.getHighEntropyValues?.(["architecture"])
      .then((v) => {
        if (v.architecture === "x86") d.setAttribute("data-arch", "x64");
        else if (v.architecture === "arm") d.setAttribute("data-arch", "arm64");
      })
      .catch(() => {});
  }, []);
  return null;
}
