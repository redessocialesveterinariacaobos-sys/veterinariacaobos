import { BoneMark } from '../../components/Decor.jsx';

const SLIDES = [
  {
    key: 'consulta',
    kind: 'video',
    src: '/assets/videos/consulta-tranquila-web.mp4',
    poster: '/assets/images/consulta-tranquila.jpg',
    caption: 'Tranquilo en la consulta',
    alt: 'Paciente tranquilo durante la consulta en Veterinaria Caobos',
  },
  {
    key: 'estrella',
    kind: 'photo',
    src: '/assets/images/exp-gata-estrella.png',
    caption: 'Con su estrellita',
    alt: 'Gata tricolor con una estrellita, sostenida en la clínica',
  },
  {
    key: 'husky',
    kind: 'photo',
    src: '/assets/images/exp-husky.png',
    caption: 'En la tienda',
    alt: 'Husky sentado en la tienda de Veterinaria Caobos',
  },
  {
    key: 'salida',
    kind: 'video',
    src: '/assets/videos/perrito-feliz-web.mp4',
    poster: '/assets/images/perrito-feliz.jpg',
    caption: 'Feliz al salir',
    alt: 'Yorkshire feliz al salir de la clínica',
  },
  {
    key: 'bano',
    kind: 'photo',
    src: '/assets/images/exp-bano.png',
    caption: 'Salió hermosa del baño',
    alt: 'Perra contenta después de su baño',
  },
  {
    key: 'alma',
    kind: 'photo',
    src: '/assets/images/exp-alma.png',
    caption: 'Alma, después del baño',
    alt: 'Alma, una chihuahua, saliendo de su baño',
  },
  {
    key: 'visita',
    kind: 'photo',
    src: '/assets/images/exp-visita.png',
    caption: 'Una gran visita',
    alt: 'Cerdito de visita en Veterinaria Caobos',
  },
  {
    key: 'toro',
    kind: 'photo',
    src: '/assets/images/exp-toro.png',
    caption: 'Toro',
    alt: 'Toro, un golden, en la clínica',
  },
  {
    key: 'casa',
    kind: 'photo',
    src: '/assets/images/exp-en-casa.png',
    caption: 'Bellos en casa',
    alt: 'Fotos que envían las familias de sus mascotas en casa',
  },
  {
    key: 'mono',
    kind: 'photo',
    src: '/assets/images/exp-gato-mono.png',
    caption: 'Listo para irse',
    alt: 'Gato con moño azul en Veterinaria Caobos',
  },
];

function Slide({ item, hidden }) {
  return (
    <figure className="exp-card">
      {item.kind === 'video' ? (
        <video
          src={item.src}
          poster={item.poster}
          muted
          loop
          autoPlay
          playsInline
          controls={!hidden}
          preload="auto"
          tabIndex={hidden ? -1 : undefined}
          aria-label={hidden ? undefined : item.alt}
        />
      ) : (
        <img src={item.src} alt={hidden ? '' : item.alt} />
      )}
      <figcaption>{item.caption}</figcaption>
    </figure>
  );
}

export function Experiencias() {
  return (
    <section className="experiencias" id="experiencias" aria-label="Experiencias en la clínica">
      <BoneMark className="home-mark--peach mark-exp-bone" />
      <div className="container experiencias__intro">
        <p className="eyebrow">En la clínica</p>
        <h2 className="section-title">Experiencias</h2>
        <p className="section-copy">
          Se quedan tranquilos en la consulta, salen contentos del baño y las familias
          los presumen en casa.
        </p>
      </div>
      <div className="experiencias__frame">
        <div className="experiencias__viewport">
          <div className="experiencias__track">
            <div className="experiencias__set">
              {SLIDES.map((item) => (
                <Slide key={item.key} item={item} />
              ))}
            </div>
            <div className="experiencias__set" aria-hidden="true">
              {SLIDES.map((item) => (
                <Slide key={`${item.key}-copy`} item={item} hidden />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
