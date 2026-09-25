import { Check } from 'lucide-react';
import { BoneMark, PawMark } from '../../components/Decor.jsx';
import { Reveal } from '../../components/Reveal.jsx';
import { ABOUT_POINTS } from '../../data/content.js';

export function About() {
  return (
    <section className="section about" id="nosotros">
      <PawMark className="mark-about-paw" />
      <BoneMark className="home-mark--peach mark-about-bone" />
      <div className="container about__grid">
        <Reveal className="about__media">
          <div className="about__blob about__blob--sun" />
          <div className="about__blob about__blob--mint" />
          <img
            className="about__photo"
            src="/assets/images/perro-consulta.png"
            alt="Perro en recuperación, con pañuelo y vendaje, en Veterinaria Caobos"
          />
        </Reveal>
        <Reveal>
          <p className="eyebrow">Nuestra promesa</p>
          <h2 className="section-title">
            Porque se merecen
            <br />
            lo mejor
          </h2>
          <p className="section-copy">
            Clínica para perros y gatos: consulta, laboratorio, imagen, cirugía y
            hospitalización. También estética, nutrición, farmacia y transporte a domicilio.
          </p>
          <ul className="about__checks">
            {ABOUT_POINTS.map((item) => (
              <li key={item.title}>
                <b>
                  <Check size={16} strokeWidth={2.6} />
                </b>
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.text}</p>
                </div>
              </li>
            ))}
          </ul>
          <a className="text-link" href="/#citas">
            Agendar cita
          </a>
        </Reveal>
      </div>
    </section>
  );
}
