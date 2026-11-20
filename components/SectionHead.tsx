/** A home page section's title, centred over what follows; `id` is what the section's aria-labelledby names. */
export function SectionHead({ id, title }: { id: string; title: string }) {
  return (
    <h2 id={id} className="display mx-auto max-w-[52rem] text-balance text-center text-[32px] sm:text-[40px] lg:text-[46px]">
      {title}
    </h2>
  );
}
