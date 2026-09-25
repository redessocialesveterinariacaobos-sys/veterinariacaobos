import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Droplets, Ear, Hospital, Ribbon, Syringe } from 'lucide-react';
import { BoneMark, PawMark } from '../../components/Decor.jsx';
import { Reveal } from '../../components/Reveal.jsx';
import { INSTAGRAM_CASES } from '../../data/content.js';
import { reelFile } from '../../lib/reels.js';

function ToothIcon({ size = 26 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2c2 0 3.2 1.2 3.2 3.2 0 .8.4 1.4 1 1.8 1.2.6 2.3 1.8 2.3 3.6 0 2.4-1 4.6-1.8 6.4-.6 1.4-1.2 3.2-1.7 4.2-.3.6-1.2.5-1.4-.2-.3-1.2-.7-2.6-1.6-2.6s-1.3 1.4-1.6 2.6c-.2.7-1.1.8-1.4.2-.5-1-1.1-2.8-1.7-4.2C6.5 15.2 5.5 13 5.5 10.6c0-1.8 1.1-3 2.3-3.6.6-.4 1-1 1-1.8C8.8 3.2 10 2 12 2z"
      />
    </svg>
  );
}

const CASE_ICONS = {
  vacunacion: Syringe,
  quimioterapia: Ribbon,
  'limpieza-dental': ToothIcon,
  banos: Droplets,
  otitis: Ear,
  gatos: Hospital,
};

function CaseVideo({ src, label }) {
  const once = useRef(false);

  return (
    <motion.video
      className="case-story__video"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
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

function CaseDivider({ peach }) {
  const Mark = peach ? PawMark : BoneMark;

  return (
    <div className="case-divider" aria-hidden="true">
      <span />
      <Mark className={peach ? 'home-mark--peach' : ''} />
      <span />
    </div>
  );
}

function CaseStory({ item, flip }) {
  const [current, setCurrent] = useState(0);
  const Icon = CASE_ICONS[item.id] ?? Hospital;
  const clip = item.links[current] ?? item.links[0];
  const several = item.links.length > 1;

  return (
    <article className={`case-story${flip ? ' case-story--flip' : ''}`}>
      <div className="case-story__media">
        <div className="case-story__stage">
          <AnimatePresence initial={false}>
            <CaseVideo
              key={clip.href}
              src={reelFile(clip.href)}
              label={`${item.title}. ${clip.label}`}
            />
          </AnimatePresence>
        </div>
        {several ? (
          <div
            className="case-story__steps"
            role="tablist"
            aria-label={`Partes de ${item.title}`}
            style={{ '--step': current, '--total': item.links.length }}
          >
            <span className="case-story__track" aria-hidden="true" />
            <span className="case-story__fill" aria-hidden="true" />
            {item.links.map((link, index) => (
              <button
                key={link.href}
                type="button"
                role="tab"
                aria-selected={index === current}
                className={`case-story__step${index === current ? ' is-on' : ''}${index < current ? ' is-done' : ''}`}
                onClick={() => setCurrent(index)}
              >
                <span>{index + 1}</span>
                {link.label}
              </button>
            ))}
          </div>
        ) : null}
      </div>
      <div className="case-story__copy">
        <div className={`case-story__logo case-story__logo--${item.tone}`}>
          <motion.span
            initial={{ scale: 0.55, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.7 }}
            transition={{ type: 'spring', stiffness: 320, damping: 16 }}
          >
            <Icon size={26} strokeWidth={2.2} />
          </motion.span>
          <strong>{item.condition}</strong>
        </div>
        <h3>{item.title}</h3>
        <p className="case-story__explain">{item.explain}</p>
        <p>{item.text}</p>
        <ul className="case-story__notes">
          {item.notes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
        <div className="case-story__actions">
          <Link className="btn btn--peach" to="/#citas">
            Agendar cita
          </Link>
          <Link className="btn btn--ghost" to={`/servicios/${item.id}`}>
            Ver el servicio
          </Link>
        </div>
      </div>
    </article>
  );
}

export function CasosInstagram() {
  return (
    <section className="section cases" id="casos">
      <div className="cases__blob" aria-hidden="true" />
      <div className="cases__blob cases__blob--deep" aria-hidden="true" />
      <img className="cases__leaves" src="/assets/images/hero-leaves.png" alt="" />
      <img className="cases__leaves cases__leaves--low" src="/assets/images/hero-leaves.png" alt="" />
      <PawMark className="home-mark--peach mark-cases-paw" />
      <BoneMark className="mark-cases-bone" />
      <div className="container">
        <Reveal>
          <p className="eyebrow">En la clínica</p>
          <h2 className="section-title">Casos reales</h2>
          <p className="section-copy">
            Detrás de cada video hay un cuidado concreto: qué le pasaba a la mascota, por qué importa y cómo se vio aquí.
          </p>
        </Reveal>
        {INSTAGRAM_CASES.map((item, index) => (
          <Reveal key={item.id}>
            {index > 0 ? <CaseDivider peach={index % 2 === 0} /> : null}
            <CaseStory item={item} flip={index % 2 === 1} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
