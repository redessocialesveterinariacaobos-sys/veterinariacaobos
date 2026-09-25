import { Calendar } from 'lucide-react';
import { Reveal } from '../../components/Reveal.jsx';

export function CtaBand() {
  return (
    <section className="section" style={{ paddingTop: 20 }}>
      <Reveal className="container">
        <div className="cta-band">
          <div className="cta-band__copy">
            <p className="eyebrow">El hospital</p>
            <h2>Equipo médico especializado</h2>
            <p>
              En quirófano hay un equipo listo para cirugías y urgencias, con anestesia y
              monitoreo. En consulta revisan al paciente y te explican el paso a seguir.
            </p>
            <a className="btn btn--peach" href="/#citas">
              <Calendar size={18} />
              Reservar cita
            </a>
          </div>
          <div className="cta-band__media">
            <figure className="cta-band__shot cta-band__surgery">
              <img
                src="/assets/images/equipo-cirugia.png"
                alt="Equipo médico especializado de Veterinaria Caobos en quirófano"
              />
              <figcaption>Quirófano</figcaption>
            </figure>
            <figure className="cta-band__shot cta-band__consult">
              <img
                src="/assets/images/equipo-consulta.png"
                alt="El equipo de Veterinaria Caobos revisando a un paciente"
              />
              <figcaption>En consulta</figcaption>
            </figure>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
