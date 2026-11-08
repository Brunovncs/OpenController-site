import type { NextFetchEvent, NextRequest } from "next/server";
import { dbReady, insert } from "@/lib/db";

/**
 * Search engines and AI assistants reading the site, for /admin. The matcher only lets requests
 * from these crawlers in, so people's page loads never run this. ChatGPT-User, Claude-User and
 * Perplexity-User are an assistant opening a page because someone asked it something.
 */
const BOTS: [RegExp, string][] = [
  [/ChatGPT-User/, "ChatGPT-User"],
  [/OAI-SearchBot/, "OAI-SearchBot"],
  [/GPTBot/, "GPTBot"],
  [/Claude-User/, "Claude-User"],
  [/Claude-SearchBot/, "Claude-SearchBot"],
  [/ClaudeBot/, "ClaudeBot"],
  [/Perplexity-User/, "Perplexity-User"],
  [/PerplexityBot/, "PerplexityBot"],
  [/MistralAI-User/, "MistralAI-User"],
  [/DuckAssistBot/, "DuckAssistBot"],
  [/meta-externalagent/i, "Meta"],
  [/Amazonbot/, "Amazonbot"],
  [/Applebot/, "Applebot"],
  [/Bytespider/, "Bytespider"],
  [/CCBot/, "CCBot"],
  [/Googlebot/, "Googlebot"],
  [/bingbot/, "Bingbot"],
  [/DuckDuckBot/, "DuckDuckBot"],
  [/YandexBot/, "YandexBot"],
];

export function proxy(request: NextRequest, event: NextFetchEvent) {
  if (!dbReady()) return;
  const ua = request.headers.get("user-agent") ?? "";
  const bot = BOTS.find(([re]) => re.test(ua))?.[1];
  if (!bot) return;
  event.waitUntil(insert("bot_hits", { bot, path: request.nextUrl.pathname.slice(0, 200) }).catch((e: Error) => console.error("bot_hits:", e.message)));
}

export const config = {
  matcher: [
    {
      source: "/((?!api/|_next/|og/|brand/|.*\\.(?:png|jpg|jpeg|webp|svg|ico|js|css|woff2?|map)$).*)",
      has: [
        {
          type: "header",
          key: "user-agent",
          value:
            ".*(ChatGPT-User|OAI-SearchBot|GPTBot|Claude-User|Claude-SearchBot|ClaudeBot|Perplexity-User|PerplexityBot|MistralAI-User|DuckAssistBot|meta-externalagent|Amazonbot|Applebot|Bytespider|CCBot|Googlebot|bingbot|DuckDuckBot|YandexBot).*",
        },
      ],
    },
  ],
};
