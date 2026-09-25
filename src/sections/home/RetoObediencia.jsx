import { useEffect, useState } from 'react';
import { RETO_DAYS, RETO_STORAGE_KEY, RETO_TIPS } from '../../data/reto.js';
import { reelFile } from '../../lib/reels.js';
import { BoneMark, PawMark } from '../../components/Decor.jsx';

const TOTAL = RETO_DAYS.length;

function TipIcon({ tone }) {
  if (tone === 'peach') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="7" y="9" width="10" height="6" rx="3" />
        <circle cx="6" cy="9" r="2.3" />
        <circle cx="6" cy="15" r="2.3" />
        <circle cx="18" cy="9" r="2.3" />
        <circle cx="18" cy="15" r="2.3" />
      </svg>
    );
  }
  if (tone === 'rose') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 20s-6.2-3.7-6.2-8.2A3.5 3.5 0 0 1 12 9.2a3.5 3.5 0 0 1 6.2 2.6C18.2 16.3 12 20 12 20z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="7.2" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M12 8.2V12l2.6 1.8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function loadProgress() {
  try {
    const raw = localStorage.getItem(RETO_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

export function RetoObediencia() {
  const [activeDay, setActiveDay] = useState(1);
  const [completed, setCompleted] = useState({});
  const day = RETO_DAYS.find((item) => item.day === activeDay) ?? RETO_DAYS[0];
  const doneCount = RETO_DAYS.filter((item) => completed[item.day]).length;
  const done = Boolean(completed[day.day]);
  const pct = Math.round((doneCount / TOTAL) * 100);

  useEffect(() => {
    setCompleted(loadProgress());
  }, []);

  const toggleDay = () => {
    const next = { ...completed, [day.day]: !completed[day.day] };
    if (!next[day.day]) delete next[day.day];
    setCompleted(next);
    try {
      localStorage.setItem(RETO_STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* el progreso sigue en esta visita */
    }
  };

  return (
    <section className="section reto" id="reto">
      <PawMark className="home-mark--peach mark-reto-paw" />
      <BoneMark className="mark-reto-bone" />
      <PawMark className="mark-reto-paw-low" />
      <BoneMark className="home-mark--peach mark-reto-bone-low" />
      <div className="container">
        <p className="eyebrow">En casa</p>
        <h2 className="section-title">Reto de obediencia</h2>
        <p className="section-copy">
          Siete días cortos para que te mire, espere y confíe. Cada día trae el ejercicio aquí mismo.
        </p>

        <div className="reto__layout">
          <aside className="reto__side">
            <p className="reto__kicker">7 días · en casa</p>
            <h3>Empieza cuando quieras</h3>
            <p>Un ejercicio por día. Sesiones cortas, sin gritos y con premio a tiempo.</p>
            <div className="reto__progress">
              <div className="reto__ring" style={{ '--pct': pct }} aria-hidden="true">
                <span>{doneCount}/{TOTAL}</span>
              </div>
              <div>
                <strong>Tu progreso</strong>
                <p>{doneCount === TOTAL ? 'Reto completo' : `${doneCount} de ${TOTAL} días`}</p>
                <div className="reto__bar">
                  <span style={{ width: `${pct}%` }} />
                </div>
              </div>
            </div>
            <a className="reto__cta" href="/#citas">
              <strong>Cuando quieras ir más lejos</strong>
              <span>El siguiente paso es una consulta en la clínica.</span>
              <em>Agendar cita</em>
            </a>
            <img
              className="reto__dog"
              src="/assets/images/reto-perro.png"
              alt="Perro con pañuelo azul"
            />
          </aside>

          <div className="reto__main">
            <div className="reto__days" role="tablist" aria-label="Días del reto">
              {RETO_DAYS.map((item) => {
                const selected = item.day === activeDay;
                const ready = Boolean(completed[item.day]);
                return (
                  <button
                    key={item.day}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    className={`reto__day${selected ? ' is-on' : ''}${ready ? ' is-done' : ''}`}
                    onClick={() => setActiveDay(item.day)}
                  >
                    <span>{ready && !selected ? '✓' : item.day}</span>
                    {item.label}
                  </button>
                );
              })}
            </div>

            <article className="reto__card">
              <p className="reto__kicker">Día {day.day}</p>
              <h3>{day.title}</h3>
              <p>{day.text}</p>
              <div className="reto__stage">
                <video
                  key={day.href}
                  className="reel reto__video"
                  src={reelFile(day.href)}
                  controls
                  playsInline
                  preload="auto"
                />
                <ul className="reto__tips">
                  {RETO_TIPS.map((tip) => (
                    <li key={tip.title} className={`reto__tip reto__tip--${tip.tone}`}>
                      <span>
                        <TipIcon tone={tip.tone} />
                      </span>
                      <div>
                        <strong>{tip.title}</strong>
                        <small>{tip.text}</small>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <button
                type="button"
                className={`reto__mark${done ? ' is-done' : ''}`}
                onClick={toggleDay}
              >
                {done ? `Día ${day.day} completado` : `Marcar día ${day.day} como completo`}
              </button>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
