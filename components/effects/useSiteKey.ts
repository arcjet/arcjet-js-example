interface Props {}

/**
 * Use Site Key
 * Returns the Arcjet site key for the active deployment if available.
 */
export default function useSiteKey(props?: Props) {
  return { siteKey: process.env.ARCJET_SITE ? process.env.ARCJET_SITE : null };
}
