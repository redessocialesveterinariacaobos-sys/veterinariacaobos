import { Reveal } from '../../components/Reveal.jsx';
import { PawStroke } from '../../components/Illustrations.jsx';
import { WHY } from '../../data/content.js';

export function WhyUs() {
  return (
    <section className="section why">
      <div className="container">
        <Reveal className="why__intro">
          <PawStroke className="why__stroke" />
          <h2 className="section-title">¿Por qué confiar en nosotros?</h2>
        </Reveal>
        <Reveal className="why__row">
          {WHY.map((item) => (
            <article key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
