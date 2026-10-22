import { faqItems, plain } from "./faq";
import { SINCE, hasFeature, type Release } from "./github";
import { GUIDES, guideDescription, guideModels, guidePath, guideTitle } from "./guides";
import { absUrl } from "./i18n";
import { HOME, AUTHOR } from "./seo";
import { ISSUES_URL, LICENSE_URL, OFFICIAL_DOMAIN, RELEASES_URL, REPO_URL } from "./site";
import { MODELS } from "./models";

/**
 * llms.txt (llmstxt.org): a plain summary for AI assistants that answer questions about
 * OpenController, built from the same data as the pages so it can't say anything they don't.
 */
export function llmsTxt(release: Release | null, full: boolean): string {
  const out: string[] = [];
  const line = (s = "") => out.push(s);

  line("# OpenController");
  line();
  line(`> ${HOME.description.en}`);
  line();
  line(
    "OpenController is a free, open source (MIT) desktop app. While it runs, each connected controller shows up in games as an Xbox 360 controller with its own player number, and the original is hidden so the game doesn't see it twice. On Windows it uses two free drivers, ViGEmBus and HidHide, which the app installs on request; VIIPER is an experimental alternative to ViGEmBus. On Linux it creates the virtual controllers with uinput. On Windows and Linux any button can be remapped to another Xbox button, a key or a macro, in profiles that switch on with the game in front, and each stick gets a deadzone, full tilt, a response curve and a measured centre for drift. macOS reads controllers on its own, so there the app adds extra buttons as keys and macros, the light bar, battery and profiles that switch with the program in front. Windows 10 and 11 and Linux have x64 and ARM builds; HidHide has no ARM version yet, so on an ARM PC the original controller is not hidden. Linux needs glibc 2.35 or newer. macOS 13 and later get one app for Apple silicon and Intel.",
  );
  line();
  line(
    `It has no account and no tracking. It checks GitHub for updates when its window opens, which can be turned off. It is in beta. The only official website is ${OFFICIAL_DOMAIN}; downloads come from there or from GitHub. It is made by ${AUTHOR.alternateName} (${AUTHOR.url}). The site and app are in English and Brazilian Portuguese.`,
  );
  line();
  if (release) {
    line(`Latest version: ${release.version}${release.publishedAt ? `, released ${release.publishedAt.slice(0, 10)}` : ""} (${release.url}).`);
    line();
  }

  line("## Links");
  line();
  line(`- [Website](${absUrl("en")}): download, test your controller in the browser, the controller list and questions`);
  line(`- [Website in Portuguese](${absUrl("pt")})`);
  line(`- [Controllers](${absUrl("en", "/controllers")}): one page per controller family`);
  line(`- [Source code](${REPO_URL})`);
  line(`- [All versions and release notes](${RELEASES_URL})`);
  line(`- [Report a problem](${ISSUES_URL})`);
  line(`- [License, MIT](${LICENSE_URL})`);
  if (!full) line(`- [Full text, with every answer and controller model](${absUrl("en", "/llms-full.txt")})`);
  line();

  line("## Controllers");
  line();
  line(`OpenController knows ${MODELS.length} controller models; most others work too. What it does with each family:`);
  line();
  for (const g of GUIDES) {
    line(`- [${guideTitle(g).en}](${absUrl("en", guidePath(g))}): ${guideDescription(g).en}`);
    if (full) {
      const f = g.family;
      const facts = [
        `extra buttons: ${f.extras ? f.extras.en : "none"}`,
        `gyro aiming: ${f.gyro === "yes" ? "yes" : f.gyro === "dinput" ? "in D-input mode" : "no"}`,
        `light bar: ${f.lightBar ? "yes" : "no"}`,
        `touchpad as buttons: ${f.touchpad ? "yes" : "no"}`,
      ];
      line(`  - ${facts.join("; ")}.${f.note ? ` ${f.note.en}` : ""}`);
      line(`  - Models: ${guideModels(g).map((m) => m.name).join(", ")}.`);
    }
  }
  line();

  line("## Questions");
  line();
  for (const f of faqItems(hasFeature(release?.version, SINCE.reports), hasFeature(release?.version, SINCE.mapping))) {
    if (full) {
      line(`### ${f.q.en}`);
      line();
      line(plain(f.a.en));
      line();
    } else {
      line(`- ${f.q.en} ${plain(f.a.en).split(/(?<=\.)\s/)[0]}`);
    }
  }
  if (!full) line();
  return out.join("\n");
}
