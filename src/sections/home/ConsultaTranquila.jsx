import { Reveal } from '../../components/Reveal.jsx';

export function ConsultaTranquila() {
  return (
    <section className="section calm" id="consulta">
      <div className="container calm__grid">
        <Reveal className="calm__intro">
          <p className="eyebrow">En la consulta</p>
          <h2 className="section-title">
            Se quedan
            <br />
            tranquilos
          </h2>
          <p className="section-copy">
            Durante el procedimiento el paciente sigue calmado. Al salir, se va contento.
          </p>
        </Reveal>
        <div className="calm__videos">
          <Reveal className="calm__clip">
            <div className="calm__frame">
              <video
                className="calm__video"
                controls
                muted
                loop
                autoPlay
                playsInline
                preload="metadata"
                poster="/assets/images/consulta-tranquila.jpg"
              >
                <source src="/assets/videos/consulta-tranquila-web.mp4" type="video/mp4" />
              </video>
            </div>
            <p className="calm__caption">Tranquilo en la consulta</p>
          </Reveal>
          <Reveal className="calm__clip">
            <div className="calm__frame">
              <video
                className="calm__video calm__video--happy"
                controls
                muted
                loop
                autoPlay
                playsInline
                preload="metadata"
                poster="/assets/images/perrito-feliz.jpg"
              >
                <source src="/assets/videos/perrito-feliz-web.mp4" type="video/mp4" />
              </video>
            </div>
            <p className="calm__caption">Feliz al salir</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
