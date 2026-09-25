export const LOGO_URL = '/assets/logo/veterinaria-caobos-logo.png';

export const AGENDA_PASSWORD = 'Caobos2026';

export const SITE = {
  name: 'Veterinaria Caobos',
  tagline: 'Cuidado cercano y de confianza para tu mascota',
  instagram: 'https://www.instagram.com/veterinariacaobos',
  instagramHandle: '@veterinariacaobos',
  whatsapp: '573195949904',
  phone: '3195949904',
  phoneLabel: '319 594 9904',
  address: 'Calle 19 #0e-42, Los Caobos, Cúcuta',
  city: 'Cúcuta',
  maps: 'https://www.google.com/maps/place/Veterinaria+Caobos/@7.8789879,-72.4966193,17z',
  mapEmbed:
    'https://maps.google.com/maps?q=7.8789879,-72.4966193&hl=es&z=16&output=embed',
};

export const NAV_LINKS = [
  { href: '/#inicio', label: 'Inicio' },
  { href: '/servicios', label: 'Servicios' },
  { href: '/casos', label: 'Casos' },
  { href: '/reto', label: 'Reto' },
  { href: '/#ubicacion', label: 'Cómo llegar' },
];

export const defaultWhatsAppMessage =
  'Hola Veterinaria Caobos, quiero agendar una cita para mi mascota.';

export function getContactLink(message = defaultWhatsAppMessage) {
  if (SITE.whatsapp) {
    return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
  }
  return SITE.instagram;
}

export function composeAppointmentMessage(data) {
  return [
    'Hola Veterinaria Caobos, quiero agendar una cita.',
    data.owner && `Dueño: ${data.owner}`,
    data.pet && `Mascota: ${data.pet}`,
    data.species && `Especie: ${data.species}`,
    data.service && `Servicio: ${data.service}`,
    data.date && `Fecha preferida: ${data.date}`,
    data.phone && `Teléfono: ${data.phone}`,
    data.note && `Nota: ${data.note}`,
  ]
    .filter(Boolean)
    .join('\n');
}
