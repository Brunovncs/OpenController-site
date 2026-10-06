export const REPO = "Brunovncs/OpenController";
export const REPO_URL = `https://github.com/${REPO}`;
export const RELEASES_URL = `${REPO_URL}/releases`;
export const LATEST_URL = `${REPO_URL}/releases/latest`;
export const ISSUES_URL = `${REPO_URL}/issues`;
export const LICENSE_URL = `${REPO_URL}/blob/main/LICENSE`;
export const BUILD_URL = `${REPO_URL}#building-and-testing`;
export const OFFICIAL_DOMAIN = "opencontroller.com.br";

/** The release that brings Linux and macOS builds. */
export const NEXT_VERSION = "0.2.0";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? `https://${OFFICIAL_DOMAIN}`).replace(/\/$/, "");
