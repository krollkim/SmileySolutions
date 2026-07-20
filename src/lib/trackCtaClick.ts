// Fire-and-forget click beacon for the primary WhatsApp CTA.
//
// First-party only: it posts to our own /api/track-cta route (no third party,
// no cookies). It uses navigator.sendBeacon so the request survives the page
// navigation to WhatsApp and never delays opening the chat. Any failure is
// swallowed — analytics must never break the CTA itself.

const ENDPOINT = '/api/track-cta';

/**
 * Record a click on a WhatsApp CTA.
 * @param source Short identifier of where the click happened (e.g. "hero",
 *               "contact", "footer") so we can see which surfaces convert.
 */
export function trackCtaClick(source: string): void {
  if (typeof navigator === 'undefined') return;

  try {
    const body = JSON.stringify({ source });

    if (typeof navigator.sendBeacon === 'function') {
      const blob = new Blob([body], { type: 'application/json' });
      navigator.sendBeacon(ENDPOINT, blob);
      return;
    }

    // Fallback for browsers without sendBeacon — keepalive lets it outlive the page.
    void fetch(ENDPOINT, {
      method: 'POST',
      body,
      keepalive: true,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch {
    // Never surface tracking failures to the user.
  }
}
