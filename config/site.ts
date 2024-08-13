export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Arcjet example app",
  description: "An example application protected by Arcjet.",
  mainNav: [
    {
      title: "Home",
      href: "/",
      key: "home",
    },
    {
      title: "Signup form protection",
      href: "/signup",
      key: "signup",
    },
    {
      title: "Bot protection",
      href: "/bots",
      key: "bots",
    },
    {
      title: "Rate limiting",
      href: "/rate-limiting",
      key: "rate-limiting",
    },
    {
      title: "Attack protection",
      href: "/attack",
      key: "attack",
    },
  ],
};
