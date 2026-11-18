"use client";

import { useEffect, useRef } from "react";

/** The app at work, looping, in English for every language. Made in the site's .dev/promo; stays on its first frame for reduced motion. */
export function HeroVideo({ label }: { label: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      if (still.matches) video.pause();
      else video.play().catch(() => {});
    };
    apply();
    still.addEventListener("change", apply);
    return () => still.removeEventListener("change", apply);
  }, []);

  return (
    <video
      ref={ref}
      src="/video/app.mp4"
      poster="/video/app.jpg"
      width={1800}
      height={1125}
      muted
      loop
      playsInline
      preload="auto"
      aria-label={label}
      className="block h-auto w-full"
    />
  );
}
