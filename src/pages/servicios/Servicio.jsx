import { useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BoneMark, PawMark } from '../../components/Decor.jsx';
import { Reveal } from '../../components/Reveal.jsx';
import { INSTAGRAM_CASES } from '../../data/content.js';
import { reelFile } from '../../lib/reels.js';

const GUIDES = {
  vacunacion: {
    lead: 'La vacuna se pone con calendario, antes de que llegue la fiebre. En cachorros el plan empieza a las 6 semanas y el refuerzo queda cada año. Si ya es adulto, el esquema se ajusta en consulta.',
    mascot: '/assets/images/vacuna-perrita.png?v=2',
    mascotAlt: 'Perrita con arnés rosa y turquesa',
    photo: '/assets/images/vacuna-aplicacion.jpg',
    photoAlt: 'Aplicación de una vacuna a una perrita en consulta',
    poster: '/assets/images/vacuna-calendario.jpg',
    posterAlt: 'Calendario de vacunas para cachorros, de las 6 semanas al refuerzo anual',
    points: [
      'Se revisa al paciente antes de aplicar',
      'El calendario de cachorros no es el de un adulto',
      'El refuerzo anual mantiene la protección',
    ],
    caseTitle: 'Sara cuenta la vacunación',
    caseParagraphs: [
      'Sara Romero muestra cómo vacunan a su perrita en la clínica. En el mismo reel cuenta un accidente que tuvo en los ojos y cómo se lo revisaron.',
    ],
  },
  quimioterapia: {
    decor: true,
    intro: [
      'La quimioterapia se usa cuando un grupo de células crece sin freno. El medicamento las detiene. No se resuelve en una sola aplicación: el tratamiento se reparte en sesiones.',
      'Antes de empezar tiene que haber un diagnóstico. En consulta se revisa al paciente, se confirma qué está pasando y recién ahí se arma el esquema.',
      'Cada sesión incluye preparación, aplicación y observación. Entre una y otra hay control, para ver cómo responde y si el plan sigue igual.',
    ],
    photo: '/assets/images/quimio-sesion.jpg',
    photoAlt: 'Paciente con suero durante una sesión en la clínica',
    side: '/assets/images/quimio-preparacion.jpg',
    sideAlt: 'Preparación de la pata antes de aplicar la sesión',
    points: [
      'Se confirma el diagnóstico antes de empezar',
      'La sesión se prepara y se aplica con el paciente en observación',
      'Entre sesión y sesión hay control',
      'El esquema se ajusta según cómo responde',
    ],
    caseTitle: 'Una alergia que era cáncer',
    caseParagraphs: [
      'Empezó pareciendo una alergia y el diagnóstico fue cáncer. El caso está contado en tres partes, del primer hallazgo a las sesiones y al control.',
    ],
  },
  'limpieza-dental': {
    decor: true,
    intro: [
      'La limpieza dental se hace en quirófano, con el paciente dormido. El sarro duro inflama la encía y no sale con un cepillo en casa.',
      'Se revisa la boca antes de entrar. Al salir se explica el cuidado en casa. El mal aliento también es un aviso.',
    ],
    compactPhotos: true,
    photo: '/assets/images/dental-quirofano.jpg',
    photoAlt: 'Limpieza dental en quirófano, con el paciente dormido',
    mascot: '/assets/images/dental-yorkie.png',
    mascotAlt: 'Yorkshire con pañoleta azul',
    side: '/assets/images/dental-detalle.jpg',
    sideAlt: 'Detalle de la boca durante la limpieza dental',
    points: [
      'Se valora la boca antes de entrar a quirófano',
      'La limpieza no se resuelve con un cepillo cuando el sarro ya está duro',
      'El mal aliento también es un aviso',
      'Al salir se explica el cuidado en casa',
    ],
    caseTitle: 'Dientes sucios, a quirófano',
    caseParagraphs: [
      'Un paciente llegó a quirófano por los dientes sucios. El caso se ve en tres partes: la limpieza, lo que siguió y el mal aliento como aviso.',
    ],
  },
  banos: {
    decor: true,
    compactPhotos: true,
    intro: [
      'Un baño clínico quita grasa, olor y lo que la piel trae de la calle. Es higiene, no un adorno, y se hace despacio para que la mascota no se estrese.',
      'Antes de mojar se mira la piel. En la misma visita puede ir la peluquería: corte, uñas y oídos.',
    ],
    photo: '/assets/images/banos-tina.jpg',
    photoAlt: 'Baño clínico de un bulldog en la tina',
    side: '/assets/images/banos-unas.jpg',
    sideAlt: 'Corte de uñas durante la peluquería',
    feature: '/assets/images/banos-peluqueria.jpg',
    featureAlt: 'Peluquería terminada, con lazos, en la clínica',
    points: [
      'Se mira la piel antes de mojar',
      'El baño va con calma, sin apuro',
      'En la misma visita puede ir la peluquería',
      'Corte de uñas y oídos entran en el cuidado',
    ],
    caseTitle: 'Baño y peluquería',
    caseParagraphs: [
      'El baño y la peluquería se hacen en la clínica, con calma. Los cuatro videos muestran cómo es esa visita.',
    ],
  },
  otitis: {
    decor: true,
    compactPhotos: true,
    intro: [
      'La otitis es el oído inflamado. Pica, duele y, si el tratamiento se queda a medias, vuelve.',
      'Se revisa el conducto, no solo se tapa con gotas. El control sirve para ver que ya quedó limpio.',
    ],
    photo: '/assets/images/otitis-conejo.jpg',
    photoAlt: 'Revisión del oído de un conejo en consulta',
    points: [
      'Se revisa el oído, no solo se tapa con gotas',
      'El plan se cumple hasta el final',
      'El control confirma que quedó limpio',
    ],
    caseTitle: 'El control del conejo',
    caseParagraphs: [
      'En el video se ve el control de un conejo después del tratamiento. Ahí se revisa cómo quedó el oído.',
    ],
  },
  gatos: {
    heroVideo: true,
    lead: 'Hospitalizar es quedarse en observación: suero, analgesia y alguien pendiente cuando en casa no alcanza. No es una consulta de un rato.',
    points: [
      'Hay monitoreo mientras el paciente está internado',
      'Entra el suero y el manejo del dolor',
      'Se usa cuando el cuidado en casa no basta',
    ],
  },
};

function GuideDivider({ peach }) {
  const Mark = peach ? PawMark : BoneMark;

  return (
    <div className="case-divider guia__divider" aria-hidden="true">
      <span />
      <Mark className={peach ? 'home-mark--peach' : ''} />
      <span />
    </div>
  );
}

function GuideVideo({ src, label }) {
  const once = useRef(false);

  return (
    <video
      className="reel"
      ref={(node) => {
        if (!node || once.current) return;
        once.current = true;
        node.muted = true;
        node.play().catch(() => {});
      }}
      src={src}
      autoPlay
      muted
      loop
      playsInline
      controls
      preload="auto"
      aria-label={label}
    />
  );
}

export function Servicio() {
  const { servicioId } = useParams();
  const item = INSTAGRAM_CASES.find((entry) => entry.id === servicioId);
  const guide = item ? GUIDES[item.id] : null;

  if (!item || !guide) {
    return (
      <section className="section servicio-page">
        <div className="container">
          <h1 className="section-title">No encontramos ese servicio</h1>
          <Link className="text-link" to="/servicios">
            Volver a servicios
          </Link>
        </div>
      </section>
    );
  }

  const parts = item.links.length > 1 && Boolean(guide.caseParagraphs);
  const mascotInHero = Boolean(guide.mascot && guide.side);
  const hasSide = Boolean((guide.mascot && !mascotInHero) || guide.side);

  return (
    <section className={`section servicio-page${guide.decor ? ' servicio-page--decor' : ''}`}>
      {guide.decor ? (
        <>
          <div className="guia__blob" aria-hidden="true" />
          <div className="guia__blob guia__blob--deep" aria-hidden="true" />
          <img className="guia__leaves" src="/assets/images/hero-leaves.png" alt="" />
          <img className="guia__leaves guia__leaves--low" src="/assets/images/hero-leaves.png" alt="" />
          <BoneMark className="home-mark--peach mark-guia-bone-mid" />
          <PawMark className="mark-guia-paw-low" />
        </>
      ) : null}
      <PawMark className="home-mark--peach mark-guia-paw" />
      <BoneMark className="mark-guia-bone" />
      <div className="container">
        <Reveal>
          <div className={`guia__hero${guide.photo || guide.heroVideo ? '' : ' guia__hero--solo'}`}>
            <div>
              <p className="eyebrow">Servicios</p>
              <h1 className="section-title">{item.title}</h1>
              {guide.intro ? (
                guide.intro.map((paragraph) => (
                  <p className="section-copy guia__intro" key={paragraph}>
                    {paragraph}
                  </p>
                ))
              ) : (
                <p className="section-copy">{guide.lead}</p>
              )}
              {guide.heroVideo ? (
                <>
                  <h2 className="guia__aside-title">Qué incluye</h2>
                  <ol className="guia__steps">
                    {guide.points.map((point, index) => (
                      <li key={point}>
                        <span>{index + 1}</span>
                        <p>{point}</p>
                      </li>
                    ))}
                  </ol>
                </>
              ) : null}
              <Link className="btn btn--peach guia__cta" to="/#citas">
                Agendar cita
              </Link>
              {mascotInHero ? (
                <img className="guia__mascot guia__mascot--hero" src={guide.mascot} alt={guide.mascotAlt} />
              ) : null}
            </div>
            {guide.photo ? (
              <img
                className={`guia__photo${guide.decor ? ' guia__photo--portrait' : ''}${guide.compactPhotos ? ' guia__photo--compact' : ''}`}
                src={guide.photo}
                alt={guide.photoAlt}
              />
            ) : null}
            {guide.heroVideo
              ? item.links.map((clip) => (
                  <div className="guia__frame" key={clip.href}>
                    <GuideVideo src={reelFile(clip.href)} label={`${item.title}. ${clip.label}`} />
                  </div>
                ))
              : null}
          </div>
        </Reveal>

        {guide.decor ? <GuideDivider peach /> : null}

        {guide.heroVideo ? null : (
        <Reveal>
          <div className={`guia__visit${hasSide ? '' : ' guia__visit--solo'}`}>
            {guide.mascot && !mascotInHero ? (
              <img className="guia__mascot" src={guide.mascot} alt={guide.mascotAlt} />
            ) : null}
            {guide.side ? (
              <img
                className={`guia__side${guide.compactPhotos ? ' guia__side--compact' : ''}`}
                src={guide.side}
                alt={guide.sideAlt}
              />
            ) : null}
            <div>
              <p className="eyebrow">La guía</p>
              <h2>Qué incluye</h2>
              <ol className="guia__steps">
                {guide.points.map((point, index) => (
                  <li key={point}>
                    <span>{index + 1}</span>
                    <p>{point}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Reveal>
        )}

        {guide.poster ? (
          <div className="guia__calendar">
            <p className="eyebrow">Cachorros</p>
            <h2>Todas las vacunas del calendario</h2>
            <img className="guia__poster" src={guide.poster} alt={guide.posterAlt} />
          </div>
        ) : null}

        {guide.feature ? (
          <img className="guia__feature" src={guide.feature} alt={guide.featureAlt} />
        ) : null}

        {guide.decor ? <GuideDivider /> : null}

        {guide.heroVideo ? null : parts ? (
          <div className="guia__case guia__case--parts">
            <p className="eyebrow">El caso</p>
            <h2>{guide.caseTitle || item.text}</h2>
            {guide.caseParagraphs?.map((paragraph) => (
              <p className="guia__case-copy" key={paragraph}>
                {paragraph}
              </p>
            ))}
            <div className={`guia__parts${item.links.length === 3 ? '' : ' guia__parts--pair'}`}>
              {item.links.map((clip, index) => (
                <figure key={clip.href}>
                  <figcaption>
                    <span>{index + 1}</span>
                    {clip.label}
                  </figcaption>
                  <div className="guia__frame">
                    <GuideVideo src={reelFile(clip.href)} label={`${item.title}. ${clip.label}`} />
                  </div>
                </figure>
              ))}
            </div>
          </div>
        ) : (
          <div className={`guia__case${guide.caseParagraphs ? ' guia__case--featured' : ''}`}>
            <div>
              <p className="eyebrow">En la clínica</p>
              <h2>{guide.caseTitle || item.text}</h2>
              {guide.caseParagraphs?.map((paragraph) => (
                <p className="guia__case-copy" key={paragraph}>
                  {paragraph}
                </p>
              ))}
            </div>
            <div className={guide.caseParagraphs ? 'guia__frame' : 'servicio-videos'}>
              {item.links.map((clip) => (
                <figure key={clip.href}>
                  <GuideVideo src={reelFile(clip.href)} label={`${item.title}. ${clip.label}`} />
                  {guide.caseParagraphs ? null : <figcaption>{clip.label}</figcaption>}
                </figure>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
