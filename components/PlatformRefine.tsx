"use client";

import { useEffect } from "react";

type UAData = { getHighEntropyValues?: (hints: string[]) => Promise<{ architecture?: string; bitness?: string }> };

/**
 * Chromium can tell ARM from x64 through client hints: Apple silicon from Intel on a Mac, and an ARM
 * PC on Windows or Linux. Other browsers cannot, so the boot script's guess stays and the page
 * offers the other build next to it.
 */
export function PlatformRefine() {
  useEffect(() => {
    const d = document.documentElement;
    const os = d.getAttribute("data-os");
    if (os !== "mac" && os !== "windows" && os !== "linux") return;
    const uad = (navigator as Navigator & { userAgentData?: UAData }).userAgentData;
    uad
      ?.getHighEntropyValues?.(["architecture", "bitness"])
      .then((v) => {
        if (v.architecture === "x86") d.setAttribute("data-arch", "x64");
        else if (v.architecture === "arm" && v.bitness !== "32") d.setAttribute("data-arch", "arm64");
      })
      .catch(() => {});
  }, []);
  return null;
}
