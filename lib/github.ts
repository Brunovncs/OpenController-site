import { REPO } from "./site";

export const PLATFORMS = ["windows-x64", "linux-x64", "macos-arm64", "macos-x64"] as const;
export type Platform = (typeof PLATFORMS)[number];

export type Asset = {
  name: string;
  url: string;
  size: number;
  shaUrl: string | null;
};

export type Release = {
  version: string;
  url: string;
  publishedAt: string | null;
  assets: Partial<Record<Platform, Asset>>;
};

type ApiAsset = { name: string; size: number; browser_download_url: string };
type ApiRelease = {
  tag_name: string;
  html_url: string;
  published_at: string | null;
  assets: ApiAsset[];
};

const REVALIDATE = 3600;
/** Cleared by app/api/revalidate when the app's release workflow publishes a version. */
export const RELEASE_TAG = "release";

function headers(): HeadersInit {
  const h: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "open-controller-site",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (process.env.GITHUB_TOKEN) h.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  return h;
}

export function parseRelease(r: ApiRelease): Release {
  const assets: Partial<Record<Platform, Asset>> = {};
  const byName = new Map(r.assets.map((a) => [a.name, a]));
  for (const a of r.assets) {
    if (a.name.endsWith(".sha256")) continue;
    // Windows has an installer and a zip to run without installing; the installer comes first.
    const setup = PLATFORMS.find((p) => a.name.includes(`-${p}-setup.`));
    const platform = setup ?? PLATFORMS.find((p) => a.name.includes(`-${p}.`));
    if (!platform || (assets[platform] && !setup)) continue;
    const sha = byName.get(`${a.name}.sha256`);
    assets[platform] = {
      name: a.name,
      url: a.browser_download_url,
      size: a.size,
      shaUrl: sha ? sha.browser_download_url : null,
    };
  }
  return {
    version: r.tag_name.replace(/^v/, ""),
    url: r.html_url,
    publishedAt: r.published_at,
    assets,
  };
}

export async function getLatestRelease(): Promise<Release | null> {
  try {
    const res = await fetch(`https://api.github.com/repos/${REPO}/releases/latest`, {
      headers: headers(),
      next: { revalidate: REVALIDATE, tags: [RELEASE_TAG] },
    });
    if (!res.ok) return null;
    return parseRelease((await res.json()) as ApiRelease);
  } catch {
    return null;
  }
}

export async function getStars(): Promise<number | null> {
  try {
    const res = await fetch(`https://api.github.com/repos/${REPO}`, {
      headers: headers(),
      next: { revalidate: REVALIDATE, tags: [RELEASE_TAG] },
    });
    if (!res.ok) return null;
    const json = (await res.json()) as { stargazers_count?: number };
    return typeof json.stargazers_count === "number" ? json.stargazers_count : null;
  } catch {
    return null;
  }
}

/** The first version of the app with a feature, so the site mentions it only once it is out. */
export const SINCE = { reports: "0.8.0" } as const;

/** Whether `version` (the latest release) is `since` or later. */
export function hasFeature(version: string | null | undefined, since: string): boolean {
  if (!version) return false;
  const a = version.split(/[.-]/).map((n) => parseInt(n, 10) || 0);
  const b = since.split(".").map((n) => parseInt(n, 10) || 0);
  for (let i = 0; i < 3; i++) if ((a[i] ?? 0) !== (b[i] ?? 0)) return (a[i] ?? 0) > (b[i] ?? 0);
  return true;
}

export function formatSize(bytes: number): string {
  const mb = bytes / (1024 * 1024);
  return `${mb.toFixed(1)} MB`;
}
