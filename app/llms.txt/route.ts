import { getLatestRelease } from "@/lib/github";
import { llmsTxt } from "@/lib/llms";

export const revalidate = 3600;

export async function GET() {
  return new Response(llmsTxt(await getLatestRelease(), false), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
