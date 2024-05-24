export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Arcjet JS example app",
  description: "An example application protected by Arcjet.",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Signup form protection",
      href: "/signup",
    },
    {
      title: "Bot protection",
      href: "/bots",
    },
    {
      title: "Rate limiting",
      href: "/rate-limiting",
    },
    {
      title: "Attack protection",
      href: "/attack",
    },
  ],
};
