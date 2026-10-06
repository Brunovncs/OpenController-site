import { timingSafeEqual } from "node:crypto";
import { revalidateTag } from "next/cache";
import { RELEASE_TAG } from "@/lib/github";

/**
 * Called by the app's release workflow right after it publishes a version, so the download
 * buttons link the new one at once instead of up to two hours later. The secret is in the
 * environment (REVALIDATE_SECRET) and in the app repository's SITE_REVALIDATE_SECRET.
 */
export async function POST(request: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  const given = request.headers.get("authorization")?.replace(/^Bearer /, "") ?? "";
  if (!secret || given.length !== secret.length || !timingSafeEqual(Buffer.from(given), Buffer.from(secret))) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }
  revalidateTag(RELEASE_TAG, { expire: 0 });
  return Response.json({ revalidated: true });
}
