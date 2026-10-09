import { GUIDES, guidePath } from "@/lib/guides";
import { LocalLink } from "./LocalLink";
import { T } from "./T";

const up = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** Every controller page, so each one is a click away from the home page. */
export function GuideLinks() {
  return (
    <nav aria-labelledby="guides-title" className="mt-10 border-t border-line pt-8">
      <h3 id="guides-title" className="text-[15px] font-semibold tracking-tight">
        <LocalLink path="/controllers" className="hover:underline hover:decoration-line-strong hover:underline-offset-4">
          <T en="How to use each controller on PC" pt="Como usar cada controle no PC" />
        </LocalLink>
      </h3>
      <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[13.5px] text-muted">
        {GUIDES.map((g) => (
          <li key={g.slug}>
            <LocalLink path={guidePath(g)} className="underline decoration-line underline-offset-4 transition-colors hover:text-fg hover:decoration-fg">
              <T en={up(g.name.en)} pt={up(g.name.pt)} />
            </LocalLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
