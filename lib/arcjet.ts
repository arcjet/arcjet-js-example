import arcjet, { shield, detectBot, fixedWindow, protectSignup } from "@arcjet/next";

// Re-export the rules to simplify imports inside handlers
export { shield, detectBot, fixedWindow, protectSignup };

// Create a base Arcjet instance for use by each handler
export default arcjet({
  // Get your site key from https://app.arcjet.com
  // and set it as an environment variable rather than hard coding.
  // See: https://nextjs.org/docs/app/building-your-application/configuring/environment-variables
  key: process.env.ARCJET_KEY,
  rules: [
    // You can include one or more rules base rules
  ],
});
