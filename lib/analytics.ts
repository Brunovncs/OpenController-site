/**
 * Anonymous visit statistics, server side. Nothing here identifies a person: no cookie id, no IP
 * and no full referrer URL is stored. A visitor is a hash of (today's salt, IP, user agent), and
 * the salt is deleted the next day (`day_salt()` in supabase/schema.sql), so the same person is a
 * different visitor tomorrow and the hash can't be traced back.
 */

import { createHash } from "node:crypto";
import { dbReady, insert, rpc } from "./db";
import { clientIp } from "./mail";

/** Set at /admin login so the maintainer's own visits are not counted. */
export const SKIP_COOKIE = "oc-skip";

/** Crawlers and scripts: their page views are not people. AI and search crawlers go to bot_hits. */
export const BOT_UA = /bot|crawl|spider|slurp|headless|lighthouse|python|curl|wget|httpclient|preview|scanner|monitor|^$/i;

let salt: { day: string; value: string } | null = null;

async function daySalt() {
  const day = new Date().toISOString().slice(0, 10);
  if (salt?.day !== day) salt = { day, value: await rpc<string>("day_salt") };
  return salt.value;
}

export async function visitorId(request: Request) {
  const ua = request.headers.get("user-agent") ?? "";
  return createHash("sha256").update(`${await daySalt()}|${clientIp(request)}|${ua}`).digest("hex").slice(0, 20);
}

export function skipped(request: Request) {
  return /(?:^|;\s*)oc-skip=1(?:;|$)/.test(request.headers.get("cookie") ?? "");
}

/** Where a visit came from, by UTM source first (ChatGPT adds utm_source=chatgpt.com) and then by referrer. */
const SOURCES: [RegExp, string][] = [
  [/(^|\.)chatgpt\.com$|(^|\.)openai\.com$|^chatgpt/, "chatgpt"],
  [/(^|\.)perplexity\.ai$|^perplexity/, "perplexity"],
  [/(^|\.)claude\.ai$|^claude/, "claude"],
  [/^gemini\.google\.com$|^gemini/, "gemini"],
  [/^copilot\.microsoft\.com$|^copilot/, "copilot"],
  [/(^|\.)deepseek\.com$/, "deepseek"],
  [/(^|\.)grok\.com$|^x\.ai$/, "grok"],
  [/(^|\.)meta\.ai$/, "meta-ai"],
  [/(^|\.)mistral\.ai$/, "mistral"],
  [/(^|\.)you\.com$/, "you.com"],
  [/(^|\.)phind\.com$/, "phind"],
  [/(^|\.)google\.[a-z.]+$|^com\.google\.android/, "google"],
  [/(^|\.)bing\.com$/, "bing"],
  [/(^|\.)duckduckgo\.com$/, "duckduckgo"],
  [/^search\.brave\.com$/, "brave"],
  [/(^|\.)yahoo\.[a-z.]+$/, "yahoo"],
  [/(^|\.)yandex\.[a-z.]+$|^ya\.ru$/, "yandex"],
  [/(^|\.)ecosia\.org$/, "ecosia"],
  [/(^|\.)baidu\.com$/, "baidu"],
  [/(^|\.)reddit\.com$|^redd\.it$|^com\.reddit\.frontpage$/, "reddit"],
  [/(^|\.)github\.com$/, "github"],
  [/(^|\.)youtube\.com$|^youtu\.be$/, "youtube"],
  [/^t\.co$|(^|\.)x\.com$|(^|\.)twitter\.com$/, "x"],
  [/(^|\.)facebook\.com$|^fb\.me$/, "facebook"],
  [/(^|\.)instagram\.com$/, "instagram"],
  [/(^|\.)linkedin\.com$|^lnkd\.in$/, "linkedin"],
  [/(^|\.)discord(app)?\.com$|^discord\.gg$/, "discord"],
  [/(^|\.)alternativeto\.net$/, "alternativeto"],
  [/^news\.ycombinator\.com$/, "hackernews"],
  [/(^|\.)brunovinicius\.dev\.br$/, "brunovinicius.dev.br"],
];

export const AI_SOURCES = new Set(["chatgpt", "perplexity", "claude", "gemini", "copilot", "deepseek", "grok", "meta-ai", "mistral", "you.com", "phind"]);

function classify(value: string | null) {
  if (!value) return null;
  const v = value.toLowerCase();
  return SOURCES.find(([re]) => re.test(v))?.[1] ?? null;
}

/** "android-app://com.reddit.frontpage/" and "https://www.google.com/" both end up as a host. */
export function refHost(referrer: string | null, ownHost: string | null) {
  if (!referrer) return null;
  try {
    const host = new URL(referrer).hostname.replace(/^www\./, "").toLowerCase();
    if (!host || host === ownHost?.replace(/^www\./, "")) return null;
    return host.slice(0, 100);
  } catch {
    return null;
  }
}

export function source(utmSource: string | null, host: string | null, internal: boolean) {
  return classify(utmSource) ?? classify(host) ?? (host ? host : internal ? "internal" : utmSource ? `utm:${utmSource.toLowerCase()}` : "direct");
}

export function parseUa(ua: string) {
  const os = /Windows/.test(ua)
    ? "Windows"
    : /Android/.test(ua)
      ? "Android"
      : /iPhone|iPad|iPod/.test(ua)
        ? "iOS"
        : /CrOS/.test(ua)
          ? "ChromeOS"
          : /Mac OS X|Macintosh/.test(ua)
            ? "macOS"
            : /Linux|X11/.test(ua)
              ? "Linux"
              : "other";
  const device = /iPad|Tablet|Android(?!.*Mobile)/.test(ua) ? "tablet" : /Mobi|iPhone|Android/.test(ua) ? "mobile" : "desktop";
  const browser = /Edg\//.test(ua)
    ? "Edge"
    : /OPR\/|Opera/.test(ua)
      ? "Opera"
      : /SamsungBrowser/.test(ua)
        ? "Samsung"
        : /Firefox\//.test(ua)
          ? "Firefox"
          : /Chrome\//.test(ua)
            ? "Chrome"
            : /Safari\//.test(ua)
              ? "Safari"
              : "other";
  return { os, device, browser };
}

export function context(request: Request) {
  const ua = request.headers.get("user-agent") ?? "";
  return { ...parseUa(ua), country: request.headers.get("x-vercel-ip-country")?.slice(0, 2) ?? null };
}

/**
 * An event that happens on the server: a form sent, an app report. It goes under the same visitor
 * as the page events of the person who sent it. Never throws: a stat lost is better than a report lost.
 */
export async function recordServer(request: Request, type: string, name: string, label?: string | null) {
  if (!dbReady() || skipped(request)) return;
  try {
    const ua = request.headers.get("user-agent") ?? "";
    const app = ua.startsWith("open-controller/");
    await insert("events", {
      visitor: await visitorId(request),
      type,
      name: name.slice(0, 80),
      label: label ? label.slice(0, 160) : null,
      ...(app ? { os: null, device: "app", browser: null, country: request.headers.get("x-vercel-ip-country")?.slice(0, 2) ?? null } : context(request)),
    });
  } catch (error) {
    console.error("analytics:", (error as Error).message);
  }
}
