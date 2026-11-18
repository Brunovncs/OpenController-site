/** Bits shared by every page: the header, the language menu, links back home. */
const common = {
  skip: "Skip to content",
  nav: {
    check: "Test",
    features: "Features",
    performance: "Performance",
    controllers: "Controllers",
    platforms: "Download",
    faq: "FAQ",
    contact: "Contact",
  },
  mainNav: "Main",
  coffee: "Buy me a coffee",
  stars: "GitHub, {n} stars",
  language: "Language",
  help: "Help",
};

export default common;
export type CommonMessages = typeof common;
