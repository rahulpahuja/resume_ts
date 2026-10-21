// A/B test for the homepage: 50% of new visitors get the 2D site, 50% get the 3D site.
// - The assignment is random once, then sticky via the `ab_home` cookie (30 days).
// - The 3D variant is a rewrite (the URL stays "/"), so there is no redirect or flash.
// - Crawlers, link-preview bots and anything without a user agent ALWAYS get the 2D site,
//   so SEO and social previews are unaffected.
// - ?v=2d or ?v=3d forces a variant (and sticks), which is how the "2D site" link works.
// - Any error falls through to the normal 2D page.

const COOKIE = 'ab_home';
const MAX_AGE = 60 * 60 * 24 * 30;
const BOT_RE = /bot|crawl|spider|slurp|preview|facebookexternalhit|embedly|whatsapp|telegram|linkedin|pinterest|quora|discord|lighthouse|pagespeed|headless|inspectiontool|storebot|ia_archiver|perplexity|claude|chatgpt|oai-|bingpreview|yandex|baidu|duckduck|semrush|ahrefs|curl|wget|python-requests|go-http/i;

/** Pure decision logic (exported for tests). Returns '2d' or '3d'. */
export function pickVariant({ userAgent, cookie, query, random }) {
  if (!userAgent || BOT_RE.test(userAgent)) return '2d';
  if (query === '2d' || query === '3d') return query;
  if (cookie === '2d' || cookie === '3d') return cookie;
  return random() < 0.5 ? '2d' : '3d';
}

export default async (request, context) => {
  try {
    if (request.method !== 'GET' && request.method !== 'HEAD') return;
    const url = new URL(request.url);
    const userAgent = request.headers.get('user-agent') || '';
    const isBot = !userAgent || BOT_RE.test(userAgent);
    const variant = pickVariant({
      userAgent,
      cookie: context.cookies.get(COOKIE),
      query: url.searchParams.get('v'),
      random: Math.random,
    });

    // bots: serve the original page untouched and do not set cookies
    if (isBot) return;

    context.cookies.set({ name: COOKIE, value: variant, path: '/', maxAge: MAX_AGE, sameSite: 'Lax', secure: true });

    const upstream = variant === '3d' ? await context.rewrite('/3d/') : await context.next();
    const res = new Response(upstream.body, upstream);
    res.headers.set('Vary', 'Cookie');
    res.headers.set('Cache-Control', 'private, no-cache');
    return res;
  } catch (err) {
    console.log('ab-home failed, serving default page', err && err.message);
    return;
  }
};

export const config = { path: '/' };
