import Image from "next/image";
import { ISSUES_URL, LICENSE_URL, RELEASES_URL, REPO_URL } from "@/lib/site";
import { LangToggle } from "./lang";
import { T } from "./T";

const LINK = "text-muted transition-colors hover:text-fg";

export function Footer({ version }: { version: string | null }) {
  return (
    <footer className="border-t border-line">
      <div className="wrap grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="flex items-center gap-3">
            <Image src="/brand/icon.svg" alt="" width={40} height={40} />
            <div>
              <p className="text-[15px] font-semibold">Open Controller</p>
              <p className="font-mono text-[11.5px] text-faint">{version ? `v${version} · ` : ""}MIT</p>
            </div>
          </div>
          <p className="mt-5 max-w-sm text-[13.5px] leading-relaxed text-faint">
            <T
              en="Free and open source, so you can play on PC with the controller you already have."
              pt="Gratuito e de código aberto, para você jogar no PC com o controle que já tem."
            />
          </p>
        </div>
        <nav aria-label="Project" className="text-[14px] lg:col-span-4">
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5">
            <li>
              <a className={LINK} href={REPO_URL}>
                GitHub
              </a>
            </li>
            <li>
              <a className={LINK} href={RELEASES_URL}>
                <T en="All versions" pt="Todas as versões" />
              </a>
            </li>
            <li>
              <a className={LINK} href={ISSUES_URL}>
                <T en="Report a problem" pt="Relatar um problema" />
              </a>
            </li>
            <li>
              <a className={LINK} href={LICENSE_URL}>
                <T en="MIT License" pt="Licença MIT" />
              </a>
            </li>
            <li>
              <a className={LINK} href={`${REPO_URL}/blob/main/THIRD_PARTY_NOTICES.md`}>
                <T en="Third-party notices" pt="Avisos de terceiros" />
              </a>
            </li>
          </ul>
        </nav>
        <div className="flex items-start sm:col-span-2 lg:col-span-3 lg:justify-end">
          <LangToggle />
        </div>
      </div>
      <div className="wrap">
        <div className="border-t border-line py-6">
        <p className="max-w-4xl text-[12px] leading-relaxed text-faint">
          <T
            en="Not affiliated with Sony, Microsoft, Nintendo, Valve, 8BitDo or any other controller maker; their names identify compatible hardware only. ViGEmBus, HidHide, DsHidMini and BthPS3 are by Nefarius Software Solutions and are downloaded from their releases, not bundled."
            pt="Sem vínculo com Sony, Microsoft, Nintendo, Valve, 8BitDo ou qualquer outro fabricante de controles; os nomes só identificam hardware compatível. ViGEmBus, HidHide, DsHidMini e BthPS3 são da Nefarius Software Solutions e são baixados das páginas deles, não incluídos."
          />
        </p>
        </div>
      </div>
    </footer>
  );
}
