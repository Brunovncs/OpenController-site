# OpenController site

The website for [OpenController](https://github.com/Brunovncs/OpenController). Next.js (App Router)
and Tailwind CSS v4, one static page that Vercel rebuilds in the background at most once an hour.
Live at [opencontroller.com.br](https://opencontroller.com.br); every push to
`main` deploys it.

## Running it

```powershell
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

It deploys to Vercel with no settings. Two optional environment variables:

- `NEXT_PUBLIC_SITE_URL`: the public address, for canonical links, the sitemap and the social
  image. Without it the site uses Vercel's production domain.
- `GITHUB_TOKEN`: a token with no scopes, only to raise GitHub's API rate limit for the release and
  star lookups. Not needed for normal traffic, since each lookup runs at most once an hour.

## How the download button works

`lib/github.ts` reads `releases/latest` from the GitHub API on the server, cached for an hour, and
picks each platform's asset by name: `windows-x64`, `linux-x64`, `macos-arm64`, `macos-x64`, with
the `.sha256` file next to it. The page renders a button for every platform, and a small script in
`<head>` (`lib/boot.ts`) marks the visitor's system on `<html>` before the first paint, so CSS
shows the right one with no flash. Chromium on a Mac also reports Apple silicon or Intel
(`components/PlatformRefine.tsx`); other browsers get the Apple silicon build with the Intel one
next to it. A platform without an asset in the latest release says so and links to the source and the
releases page. If GitHub does not
answer, the button links to the releases page.

## The controller table

`data/models.json` is the app's own table of known controllers. Regenerate it from the
open-controller repository after changing `models.rs`:

```powershell
cargo run -p open-controller-core --example models_json > ../open-controller-site/data/models.json
```

What each family can do (extra buttons, gyro, light bar, touchpad) lives in `lib/families.ts`. It
mirrors `extras.rs` and the README's compatibility table and has to be updated by hand when those
change.

Each controller is drawn by `components/PadDrawing.tsx`, by hand on a 400 by 280 grid. `lib/drawings.ts`
picks the drawing from the model's family and art: DualSense (and Edge), DualShock 4, DualShock 3,
Xbox, Switch Pro, Joy-Con, 8BitDo Ultimate, 8BitDo SN30 Pro and Pro 2, SNES-style pads without
sticks, handheld PCs, and a generic pad for the rest.

## Languages

English and Brazilian Portuguese. Static text is written as `<T en="…" pt="…" />`: both are in the
page and CSS shows the one in `<html data-lang>`, chosen from the stored choice or the browser's
language before the first paint. The toggle stores the choice in `localStorage`.
