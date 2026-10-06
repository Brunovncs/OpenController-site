import type { ReactNode } from "react";

export function SectionHead({ n, label, title, children }: { n: string; label: ReactNode; title: ReactNode; children?: ReactNode }) {
  return (
    <div className="grid gap-x-10 gap-y-4 lg:grid-cols-12">
      <p className="label pt-2 lg:col-span-3">
        <span className="text-accent">{n}</span>
        <span className="mx-2 text-line-strong">/</span>
        {label}
      </p>
      <div className="lg:col-span-9">
        <h2 className="display text-balance text-[32px] sm:text-[40px] lg:text-[46px]">{title}</h2>
        {children ? <div className="mt-5 max-w-[44rem] text-pretty text-[17px] leading-relaxed text-muted">{children}</div> : null}
      </div>
    </div>
  );
}
