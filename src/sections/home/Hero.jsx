import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { Heart, HeartOutline, Paw } from '../../components/Decor.jsx';
import { fadeUp, slideIn, stagger } from '../../lib/motion.js';

export function Hero() {
  return (
    <section className="hero" id="inicio">
      <div className="hero__stage">
        <div className="hero__scene">
          <div className="hero__blobs">
            <div className="hero__blob hero__blob--pale" aria-hidden="true" />
            <div className="hero__blob" aria-hidden="true" />
            <div className="hero__blob hero__blob--deep" aria-hidden="true" />
          </div>
          <svg className="hero__sparks" viewBox="0 0 36 36" aria-hidden="true">
            <path d="M6 18h8M18 4v9M27 10l-7 6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          </svg>
          <HeartOutline className="hero__heart" />
          <Paw className="hero__deco-paw" />
          <img
            className="hero__branch"
            src="/assets/images/hero-leaves.png"
            alt=""
          />
          <img
            className="hero__branch hero__branch--mid"
            src="/assets/images/hero-leaves.png"
            alt=""
          />
          <img
            className="hero__branch hero__branch--low"
            src="/assets/images/hero-leaves.png"
            alt=""
          />
          <motion.img
            className="hero__pets"
            src="/assets/images/hero-pets.png"
            alt="Perro y gato en recuperación en Veterinaria Caobos"
            variants={slideIn}
            initial="hidden"
            animate="show"
          />
        </div>

        <div className="hero__grid">
          <motion.div className="hero__copy" variants={stagger} initial="hidden" animate="show">
            <motion.p className="eyebrow" variants={fadeUp}>
              Mascotas felices, familias tranquilas
              <Heart className="hero__eyebrow-heart" />
            </motion.p>
            <motion.h1 variants={fadeUp}>
              <span className="hero__line hero__line--lead">
                Cuidado excepcional
                <Paw className="hero__title-paw hero__title-paw--soft" />
              </span>
              <span className="hero__line hero__line--mid">
                para tu
                <Paw className="hero__title-paw" />
              </span>
              <span className="hero__line hero__line--mint">
                mejor amigo
                <Paw className="hero__title-paw" />
              </span>
            </motion.h1>
            <motion.p className="hero__lead" variants={fadeUp}>
              Consulta, diagnóstico, cirugía, hospitalización y bienestar para perros y
              gatos, en un mismo lugar de confianza.
            </motion.p>
            <motion.div className="hero__actions" variants={fadeUp}>
              <a className="btn btn--peach" href="/#citas">
                Agendar cita
                <Paw className="btn__paw" />
              </a>
              <a className="btn btn--ghost" href="/servicios">
                <span className="btn__play">
                  <Play size={11} strokeWidth={2.4} fill="currentColor" />
                </span>
                Ver servicios
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
