import { Bone, Pill, ShoppingBag, UtensilsCrossed } from 'lucide-react';
import { Reveal, RevealChild } from '../../components/Reveal.jsx';
import { SHOP_TEASERS } from '../../data/content.js';

const ICONS = [Pill, UtensilsCrossed, Bone, ShoppingBag];

export function Farmacia() {
  return (
    <section className="section shop" id="farmacia">
      <div className="container">
        <Reveal>
          <p className="eyebrow">Farmacia y tienda</p>
          <h2 className="section-title">Lo que tu mascota necesita</h2>
          <p className="section-copy" style={{ marginInline: 'auto' }}>
            Medicamentos, alimentos, dietas terapéuticas y accesorios. Pregúntanos por
            disponibilidad en Instagram.
          </p>
        </Reveal>
        <Reveal className="shop__grid" stagger>
          {SHOP_TEASERS.map((item, index) => {
            const Icon = ICONS[index];
            return (
              <RevealChild key={item.title} className="shop-card" as="a" href="/servicios#servicio-farmacia">
                <span className={`tone-${item.tone}`}>
                  <Icon size={28} strokeWidth={1.7} />
                </span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </RevealChild>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
