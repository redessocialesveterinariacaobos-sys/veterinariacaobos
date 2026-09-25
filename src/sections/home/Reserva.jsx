import { memo, useRef, useState } from 'react';
import { PawMark } from '../../components/Decor.jsx';
import { Reveal } from '../../components/Reveal.jsx';
import { SERVICES } from '../../data/content.js';
import { reelFile } from '../../lib/reels.js';
import { composeAppointmentMessage, getContactLink, SITE } from '../../data/site.js';

const HOSPITAL_VIDEO = reelFile('https://www.instagram.com/reel/DXaQbasgYv-/');

const HospitalClip = memo(function HospitalClip() {
  const once = useRef(false);

  return (
    <video
      ref={(node) => {
        if (!node || once.current) return;
        once.current = true;
        node.muted = true;
        node.play().catch(() => {});
      }}
      src={HOSPITAL_VIDEO}
      autoPlay
      muted
      loop
      playsInline
      controls
      preload="auto"
      aria-label="Recorrido por el hospital de Veterinaria Caobos"
    />
  );
});

const INITIAL = {
  owner: '',
  pet: '',
  species: 'Perro',
  service: SERVICES[0].title,
  date: '',
  phone: '',
  note: '',
};

export function Reserva() {
  const [form, setForm] = useState(INITIAL);

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    window.location.assign(getContactLink(composeAppointmentMessage(form)));
  };

  return (
    <section className="section reserva" id="citas">
      <PawMark className="home-mark--peach mark-reserva-paw" />
      <div className="container">
        <Reveal className="reserva__intro">
          <p className="eyebrow">Reserva de citas</p>
          <h2 className="section-title">Pide tu cita en un minuto</h2>
          <p className="section-copy">
            Completa dueño, mascota, servicio y fecha. Armamos el mensaje y te llevamos a
            {SITE.whatsapp ? ' WhatsApp' : ' Instagram'} para confirmar.
          </p>
        </Reveal>
        <div className="reserva__grid">
        <Reveal>
          <figure className="reserva__clip">
            <HospitalClip />
          </figure>
        </Reveal>

        <Reveal>
          <form className="form" onSubmit={onSubmit}>
            <label>
              Nombre del dueño
              <input name="owner" value={form.owner} onChange={onChange} required placeholder="Ana Pérez" />
            </label>
            <label>
              Nombre de la mascota
              <input name="pet" value={form.pet} onChange={onChange} required placeholder="Luna" />
            </label>
            <label>
              Especie
              <select name="species" value={form.species} onChange={onChange}>
                <option>Perro</option>
                <option>Gato</option>
                <option>Otra</option>
              </select>
            </label>
            <label>
              Servicio
              <select name="service" value={form.service} onChange={onChange}>
                {SERVICES.map((service) => (
                  <option key={service.id}>{service.title}</option>
                ))}
              </select>
            </label>
            <label>
              Fecha preferida
              <input type="date" name="date" value={form.date} onChange={onChange} required />
            </label>
            <label>
              Teléfono
              <input name="phone" value={form.phone} onChange={onChange} required placeholder="300 000 0000" />
            </label>
            <label className="full">
              Nota
              <textarea
                name="note"
                value={form.note}
                onChange={onChange}
                placeholder="Síntomas, urgencia o horario que te queda mejor"
              />
            </label>
            <button className="btn btn--peach" type="submit">
              Enviar solicitud
            </button>
          </form>
        </Reveal>
        </div>
      </div>
    </section>
  );
}
