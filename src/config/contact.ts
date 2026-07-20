// Central contact / primary-CTA configuration.
// Single source of truth for how the site's primary call-to-action behaves.

/**
 * WhatsApp business number in international format — digits only.
 * (No "+", no spaces, no leading zero.) Used to build wa.me links.
 */
export const WHATSAPP_NUMBER = '972525890252';

/**
 * DEPRECATED — Google Calendar booking link.
 *
 * The site previously routed every primary CTA here. As of 2026-07-20 the CTAs
 * open a pre-filled WhatsApp message instead: lower friction for the visitor
 * (no wording effort) and the conversation opens with context for us.
 *
 * Kept intentionally so booking can be re-enabled without re-deriving the URL —
 * see PROJECT_STATUS.md "WhatsApp CTA migration".
 */
export const BOOKING_URL = 'https://calendar.app.google/i5TALc1oJahNDeRw8';

/**
 * Build a wa.me link that opens WhatsApp with a pre-filled message.
 * @param message Plain (un-encoded) text — encoded here.
 */
export function buildWhatsAppUrl(message: string): string {
  const text = encodeURIComponent(message.trim());
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}
