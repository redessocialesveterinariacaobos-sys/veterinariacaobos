import { SITE, defaultWhatsAppMessage } from '../data/site.js';

export function buildContactUrl(message = defaultWhatsAppMessage) {
  if (SITE.whatsapp) {
    return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
  }
  return SITE.instagram;
}
