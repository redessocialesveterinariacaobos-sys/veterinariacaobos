import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { BoneMark, PawMark } from '../../components/Decor.jsx';
import { STORIES } from '../../data/content.js';

export function Testimonios() {
  const [index, setIndex] = useState(0);
  const story = STORIES[index];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % STORIES.length);
    }, 5200);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="section stories">
      <PawMark className="home-mark--peach mark-stories-paw" />
      <BoneMark className="mark-stories-bone" />
      <div className="container stories__layout">
        <img
          className="stories__photo"
          src="/assets/images/atencion-recepcion.png"
          alt="Atención en la recepción de Veterinaria Caobos"
        />
        <div className="stories__wrap">
        <p className="eyebrow">En la clínica</p>
        <h2 className="section-title">Usuarios felices</h2>
        <div className="stories__card">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={story.name}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.45 }}
            >
              <p>“{story.quote}”</p>
              <footer>
                <strong>{story.name}</strong>
                <span>{story.pet}</span>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
          <div className="stories__dots">
            {STORIES.map((item, itemIndex) => (
              <button
                key={item.name}
                type="button"
                className={itemIndex === index ? 'is-active' : ''}
                aria-label={`Ver historia de ${item.name}`}
                onClick={() => setIndex(itemIndex)}
              />
            ))}
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
