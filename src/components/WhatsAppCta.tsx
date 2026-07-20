'use client';

import type { ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { FaWhatsapp } from 'react-icons/fa';
import { buildWhatsAppUrl } from '@/config/contact';
import { trackCtaClick } from '@/lib/trackCtaClick';

interface WhatsAppCtaProps {
  /** Where this CTA lives (e.g. "hero", "contact", "footer") — used for click tracking. */
  source: string;
  /** Styling for the anchor — passed through unchanged so each surface keeps its look. */
  className?: string;
  /** Accessible label. Falls back to the shared localized aria label. */
  ariaLabel?: string;
  /** Optional pre-filled message override. Defaults to the shared localized message. */
  message?: string;
  /** Set false to omit the leading WhatsApp mark. */
  showIcon?: boolean;
  children: ReactNode;
}

/**
 * The site's primary call-to-action: opens WhatsApp with a pre-filled message
 * and records a first-party click.
 *
 * The WhatsApp mark is rendered here rather than by each caller, so every CTA
 * that opens WhatsApp is visually identifiable as such and no surface can
 * forget it. The icon is sized in `em`, so it scales with whatever font-size
 * the caller's `className` sets.
 *
 * It is a client component, so it can be rendered inside both server and
 * client components. Callers control the label via `children`.
 */
export default function WhatsAppCta({
  source,
  className,
  ariaLabel,
  message,
  showIcon = true,
  children,
}: WhatsAppCtaProps) {
  const t = useTranslations('cta');
  const finalMessage = message ?? t('whatsapp_message');

  return (
    <a
      href={buildWhatsAppUrl(finalMessage)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel ?? t('whatsapp_aria')}
      onClick={() => trackCtaClick(source)}
      className={className}
    >
      {showIcon && <FaWhatsapp className="shrink-0" aria-hidden="true" />}
      {children}
    </a>
  );
}
