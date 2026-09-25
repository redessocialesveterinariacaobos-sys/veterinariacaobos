import {
  Apple,
  Bone,
  FlaskConical,
  HeartPulse,
  Hospital,
  Pill,
  Plane,
  Scan,
  Scissors,
  ShoppingBag,
  Siren,
  Sparkles,
  Stethoscope,
  Sun,
  Truck,
  UtensilsCrossed,
} from 'lucide-react';
import { FEATURED, SERVICES, SHOP_TEASERS } from '../../data/content.js';

const ICONS = {
  consulta: Stethoscope,
  urgencias: Siren,
  estetica: Sparkles,
  guarderia: Sun,
  hospital: Hospital,
  farmacia: ShoppingBag,
  laboratorio: FlaskConical,
  imagen: Scan,
  cirugia: Scissors,
  nutricion: Apple,
  terapias: HeartPulse,
  exportacion: Plane,
  transporte: Truck,
  medicamentos: Pill,
  alimentos: UtensilsCrossed,
  dietas: Bone,
  snacks: ShoppingBag,
};

const SHOP_ICONS = ['medicamentos', 'alimentos', 'dietas', 'snacks'];

const STRIP = [
  ...FEATURED.map((item) => ({
    key: `home-${item.id}`,
    title: item.title,
    text: item.text,
    tone: item.tone,
    icon: item.id,
    href: `/servicios#servicio-${item.id}`,
  })),
  ...SERVICES.map((item) => ({
    key: `svc-${item.id}`,
    title: item.short,
    text: item.text,
    tone: item.tone,
    icon: item.id,
    href: `/servicios#servicio-${item.id}`,
  })),
  ...SHOP_TEASERS.map((item, index) => ({
    key: `shop-${index}`,
    title: item.title,
    text: item.text,
    tone: item.tone,
    icon: SHOP_ICONS[index],
    href: '/farmacia',
  })),
];

function Card({ item, hidden }) {
  const Icon = ICONS[item.icon];
  return (
    <a className="feature-card" href={item.href} tabIndex={hidden ? -1 : undefined}>
      <span className={`tone-${item.tone}`}>
        <Icon size={28} strokeWidth={1.7} />
      </span>
      <h3>{item.title}</h3>
      <p>{item.text}</p>
    </a>
  );
}

export function TrustBar() {
  return (
    <section className="featured" aria-label="Servicios de la clínica">
      <div className="featured__viewport">
        <div className="featured__track">
          <div className="featured__set">
            {STRIP.map((item) => (
              <Card key={item.key} item={item} />
            ))}
          </div>
          <div className="featured__set" aria-hidden="true">
            {STRIP.map((item) => (
              <Card key={`${item.key}-copy`} item={item} hidden />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
