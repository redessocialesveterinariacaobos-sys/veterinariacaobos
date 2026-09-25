import { Instagram, MapPin, Phone } from 'lucide-react';
import { BoneMark, PawMark } from '../../components/Decor.jsx';
import { Reveal } from '../../components/Reveal.jsx';
import { SITE } from '../../data/site.js';
import { reelFile } from '../../lib/reels.js';

export function Ubicacion() {
  return (
    <section className="section ubicacion" id="ubicacion">
      <PawMark className="mark-ubi-paw" />
      <BoneMark className="home-mark--peach mark-ubi-bone" />
      <div className="container ubicacion__grid">
        <Reveal className="ubicacion__main">
          <div className="ubicacion__intro">
            <p className="eyebrow">Contacto</p>
            <h2 className="section-title">Estamos en Los Caobos</h2>
            <p className="section-copy">
              En recepción te reciben y te orientan. Si vienes por primera vez, el mapa
              te deja en la puerta.
            </p>
          </div>
          <figure className="ubicacion__frame">
            <video
              ref={(node) => {
                if (!node || node.dataset.ready === '1') return;
                node.dataset.ready = '1';
                node.muted = true;
                node.play().catch(() => {});
              }}
              className="ubicacion__photo"
              src={reelFile('https://www.instagram.com/reel/C56CXPorzJ5/')}
              aria-label="Cómo llegar a Veterinaria Caobos"
              autoPlay
              muted
              loop
              controls
              playsInline
              preload="auto"
            />
            <figcaption>Cómo llegar</figcaption>
          </figure>
          <div className="ubicacion__facts">
            <p>
              <MapPin size={18} />
              {SITE.address}
            </p>
            <p>
              <Phone size={18} />
              <a href={`tel:+57${SITE.phone}`}>{SITE.phoneLabel}</a>
            </p>
            <p>
              <Instagram size={18} />
              <a href={SITE.instagram} target="_blank" rel="noreferrer">
                {SITE.instagramHandle}
              </a>
            </p>
          </div>
        </Reveal>
        <Reveal className="ubicacion__map-wrap">
          <iframe
            className="ubicacion__map"
            title="Mapa de Veterinaria Caobos en Los Caobos, Cúcuta"
            src={SITE.mapEmbed}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
          <a className="ubicacion__maps-link" href={SITE.maps} target="_blank" rel="noreferrer">
            Abrir en Google Maps
          </a>
        </Reveal>
      </div>
    </section>
  );
}
