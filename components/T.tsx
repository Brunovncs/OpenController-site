import type { ReactNode } from "react";

/**
 * Text in both languages. Both are rendered and CSS shows the one in <html data-lang>, which an
 * inline script sets before the first paint, so there is no flash and no hydration mismatch.
 */
export function T({ en, pt }: { en: ReactNode; pt: ReactNode }) {
  return (
    <>
      <span data-l="en">{en}</span>
      <span data-l="pt" lang="pt-BR">
        {pt}
      </span>
    </>
  );
}
