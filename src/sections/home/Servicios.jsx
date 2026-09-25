import {
  Apple,
  FlaskConical,
  HeartPulse,
  Hospital,
  Plane,
  Scan,
  Scissors,
  ShoppingBag,
  Siren,
  Sparkles,
  Stethoscope,
  Sun,
  Truck,
} from 'lucide-react';
import { Reveal, RevealChild } from '../../components/Reveal.jsx';
import { SERVICES } from '../../data/content.js';

const ICONS = {
  consulta: Stethoscope,
  urgencias: Siren,
  laboratorio: FlaskConical,
  imagen: Scan,
  cirugia: Scissors,
  hospital: Hospital,
  estetica: Sparkles,
  guarderia: Sun,
  nutricion: Apple,
  terapias: HeartPulse,
  exportacion: Plane,
  farmacia: ShoppingBag,
  transporte: Truck,
};

export function Servicios() {
  return (
    <section className="section services" id="servicios">
      <div className="container">
        <Reveal className="services__intro">
          <p className="eyebrow">Nuestros servicios</p>
          <h2 className="section-title">Cómo podemos ayudarte</h2>
          <p className="section-copy services__lead">
            Atención integral para perros y gatos: de la consulta y el diagnóstico a la cirugía,
            el bienestar y el viaje.
          </p>
        </Reveal>

        <Reveal className="services__icons" stagger>
          {SERVICES.map((service) => {
            const Icon = ICONS[service.id];
            return (
              <RevealChild key={service.id} className="icon-item" as="a" href={`#servicio-${service.id}`}>
                <span className={`tone-${service.tone}`}>
                  <Icon size={26} strokeWidth={1.7} />
                </span>
                <strong>{service.short}</strong>
              </RevealChild>
            );
          })}
        </Reveal>

        <Reveal className="services__catalog" stagger>
          {SERVICES.map((service) => {
            return (
              <RevealChild
                key={service.id}
                id={`servicio-${service.id}`}
                className="service-card service-card--photo"
              >
                <img className="service-card__photo" src={service.image} alt={service.imageAlt} />
                <div>
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                  {service.extras ? (
                    <ul>
                      {service.extras.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </RevealChild>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
