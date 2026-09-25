import { Reveal, RevealChild } from '../../components/Reveal.jsx';
import { GALLERY } from '../../data/content.js';

export function Galeria() {
  return (
    <section className="section">
      <div className="container">
        <Reveal>
          <p className="eyebrow">Ellos son el centro</p>
          <h2 className="section-title">Pacientes de cuatro patas</h2>
        </Reveal>
        <Reveal className="gallery__grid" stagger>
          {GALLERY.map((item) => (
            <RevealChild key={item.src} as="a" href="#citas">
              <img src={item.src} alt={item.alt} />
            </RevealChild>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
