import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Pencil, Plus, Search } from 'lucide-react';
import { SERVICES } from '../../data/content.js';
import { AGENDA_PASSWORD, LOGO_URL, SITE } from '../../data/site.js';
import {
  NEXT_STATUS,
  STATUSES,
  addDays,
  createAppointment,
  formatDay,
  isoDate,
  loadAppointments,
  saveAppointments,
  weekOf,
} from '../../lib/agenda.js';

const FILTERS = [{ id: 'activas', label: 'Activas' }, ...STATUSES];
const SESSION_KEY = 'caobos-agenda-ok';

const EMPTY = {
  owner: '',
  pet: '',
  species: 'Perro',
  service: SERVICES[0].title,
  date: '',
  time: '09:00',
  phone: '',
  note: '',
  status: 'confirmada',
};

function statusLabel(id) {
  return STATUSES.find((item) => item.id === id)?.label || id;
}

export function Agenda() {
  const [unlocked, setUnlocked] = useState(() => sessionStorage.getItem(SESSION_KEY) === '1');
  const [password, setPassword] = useState('');
  const [denied, setDenied] = useState(false);
  const [items, setItems] = useState([]);
  const [day, setDay] = useState(() => isoDate(new Date()));
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('activas');
  const [draft, setDraft] = useState(null);

  useEffect(() => {
    document.title = `Agenda | ${SITE.name}`;
  }, []);

  useEffect(() => {
    if (unlocked) setItems(loadAppointments());
  }, [unlocked]);

  const enter = (event) => {
    event.preventDefault();
    if (password.trim() !== AGENDA_PASSWORD) {
      setDenied(true);
      return;
    }
    sessionStorage.setItem(SESSION_KEY, '1');
    setDenied(false);
    setUnlocked(true);
  };

  const leave = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setItems([]);
    setDraft(null);
    setPassword('');
    setUnlocked(false);
  };

  const commit = (next) => {
    setItems(next);
    saveAppointments(next);
  };

  const week = weekOf(day);
  const searching = query.trim().length > 0;

  const visible = useMemo(() => {
    const text = query.trim().toLowerCase();
    return items
      .filter((item) => (searching ? true : item.date === day))
      .filter((item) => {
        if (!text) return true;
        return [item.owner, item.pet, item.phone, item.service, item.note]
          .join(' ')
          .toLowerCase()
          .includes(text);
      })
      .filter((item) => {
        if (filter === 'activas') return item.status !== 'cancelada';
        return item.status === filter;
      })
      .sort((a, b) => a.date.localeCompare(b.date) || (a.time || '99:99').localeCompare(b.time || '99:99'));
  }, [items, day, query, filter, searching]);

  const counts = useMemo(() => {
    const ofDay = items.filter((item) => item.date === day && item.status !== 'cancelada');
    return {
      activas: ofDay.length,
      nueva: ofDay.filter((item) => item.status === 'nueva').length,
      confirmada: ofDay.filter((item) => item.status === 'confirmada').length,
      sala: ofDay.filter((item) => item.status === 'sala').length,
    };
  }, [items, day]);

  const openNew = () => {
    setDraft({ ...EMPTY, date: day, id: null });
  };

  const onDraft = (event) => {
    const { name, value } = event.target;
    setDraft((current) => ({ ...current, [name]: value }));
  };

  const saveDraft = (event) => {
    event.preventDefault();
    if (!draft) return;
    if (draft.id) {
      commit(items.map((item) => (item.id === draft.id ? { ...item, ...draft, owner: draft.owner.trim(), pet: draft.pet.trim(), phone: draft.phone.trim(), note: draft.note.trim() } : item)));
    } else {
      commit([createAppointment(draft), ...items]);
    }
    setDay(draft.date);
    setDraft(null);
  };

  const setStatus = (id, status) => {
    commit(items.map((item) => (item.id === id ? { ...item, status } : item)));
  };

  if (!unlocked) {
    return (
      <section className="section agenda">
        <div className="container agenda__lock">
          <img src={LOGO_URL} alt="" />
          <p className="eyebrow">Uso interno</p>
          <h1 className="section-title">Agenda de la clínica</h1>
          <p className="section-copy">Esta pantalla es del equipo. Los dueños piden cita en el formulario público.</p>
          <form className="form agenda__lock-form" onSubmit={enter}>
            <label className="full">
              Clave
              <input
                type="password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                  setDenied(false);
                }}
                autoFocus
                required
              />
            </label>
            {denied ? <p className="agenda__denied full">La clave no coincide.</p> : null}
            <button className="btn btn--peach" type="submit">
              Entrar
            </button>
          </form>
          <Link className="agenda__back" to="/">
            Volver al sitio
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="section agenda">
      <div className="container">
        <header className="agenda__head">
          <div className="agenda__brand">
            <img src={LOGO_URL} alt="" />
            <div>
              <p className="eyebrow">Agenda de {SITE.name}</p>
              <h1 className="section-title">Citas del día</h1>
              <p className="section-copy">
                {formatDay(day, { weekday: 'long', day: 'numeric', month: 'long' })}. Las solicitudes
                de la web llegan como <strong>Por confirmar</strong>.
              </p>
            </div>
          </div>
          <div className="agenda__head-actions">
            <button className="btn btn--ghost" type="button" onClick={leave}>
              Cerrar agenda
            </button>
            <button className="btn btn--peach" type="button" onClick={openNew}>
              <Plus size={18} />
              Nueva cita
            </button>
          </div>
        </header>

        <div className="agenda__stats">
          <article>
            <strong>{counts.activas}</strong>
            <span>En este día</span>
          </article>
          <article>
            <strong>{counts.nueva}</strong>
            <span>Por confirmar</span>
          </article>
          <article>
            <strong>{counts.confirmada}</strong>
            <span>Confirmadas</span>
          </article>
          <article>
            <strong>{counts.sala}</strong>
            <span>En sala</span>
          </article>
        </div>

        <div className="agenda__week">
          <button type="button" className="agenda__nav" aria-label="Semana anterior" onClick={() => setDay(addDays(day, -7))}>
            <ChevronLeft size={18} />
          </button>
          {week.map((iso) => {
            const total = items.filter((item) => item.date === iso && item.status !== 'cancelada').length;
            return (
              <button
                key={iso}
                type="button"
                className={`agenda__day${iso === day ? ' is-on' : ''}${iso === isoDate(new Date()) ? ' is-today' : ''}`}
                onClick={() => setDay(iso)}
              >
                <small>{formatDay(iso, { weekday: 'short' })}</small>
                <strong>{parseISODay(iso)}</strong>
                <span>{total === 0 ? 'Libre' : `${total} cita${total === 1 ? '' : 's'}`}</span>
              </button>
            );
          })}
          <button type="button" className="agenda__nav" aria-label="Semana siguiente" onClick={() => setDay(addDays(day, 7))}>
            <ChevronRight size={18} />
          </button>
        </div>

        <div className="agenda__tools">
          <label className="agenda__search">
            <Search size={16} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar dueño, mascota o teléfono"
            />
          </label>
          <div className="agenda__filters" role="tablist" aria-label="Estado">
            {FILTERS.map((item) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={filter === item.id}
                className={filter === item.id ? 'is-on' : ''}
                onClick={() => setFilter(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {searching ? <p className="agenda__hint">Resultados en todos los días, no solo en el seleccionado.</p> : null}

        {visible.length === 0 ? (
          <div className="agenda__empty">
            <p>{searching ? 'Ninguna cita coincide con esa búsqueda.' : 'Este día está libre.'}</p>
            <button className="btn btn--ghost" type="button" onClick={openNew}>
              Agendar aquí
            </button>
          </div>
        ) : (
          <ul className="agenda__list">
            {visible.map((item) => {
              const next = NEXT_STATUS[item.status];
              return (
                <li key={item.id} className={`agenda__card is-${item.status}`}>
                  <div className="agenda__when">
                    <strong>{item.time || 'Hora por definir'}</strong>
                    {searching ? <small>{formatDay(item.date, { day: 'numeric', month: 'short' })}</small> : null}
                    <span className={`agenda__pill is-${item.status}`}>{statusLabel(item.status)}</span>
                  </div>
                  <div className="agenda__who">
                    <h2>
                      {item.pet} <small>{item.species}</small>
                    </h2>
                    <p>
                      {item.owner}
                      {item.phone ? (
                        <>
                          {' · '}
                          <a href={`tel:+57${item.phone.replace(/\D/g, '')}`}>{item.phone}</a>
                        </>
                      ) : null}
                    </p>
                    <p className="agenda__service">{item.service}</p>
                    {item.note ? <p className="agenda__note">{item.note}</p> : null}
                    {item.source === 'web' ? <p className="agenda__origin">Llegó desde el formulario de la web</p> : null}
                  </div>
                  <div className="agenda__actions">
                    {next ? (
                      <button className="btn btn--peach" type="button" onClick={() => setStatus(item.id, next.id)}>
                        {next.label}
                      </button>
                    ) : null}
                    {item.status === 'cancelada' ? (
                      <button className="btn btn--ghost" type="button" onClick={() => setStatus(item.id, 'nueva')}>
                        Reactivar
                      </button>
                    ) : null}
                    <button className="btn btn--ghost" type="button" onClick={() => setDraft(item)}>
                      <Pencil size={16} />
                      Editar
                    </button>
                    {item.status !== 'cancelada' ? (
                      <button className="btn btn--ghost" type="button" onClick={() => setStatus(item.id, 'cancelada')}>
                        Cancelar
                      </button>
                    ) : null}
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        <p className="agenda__back">
          <Link to="/#citas">Volver al formulario público</Link>
        </p>
      </div>

      {draft ? (
        <div className="agenda__modal" role="presentation" onClick={() => setDraft(null)}>
          <form
            className="form agenda__form"
            role="dialog"
            aria-labelledby="agenda-form-title"
            onClick={(event) => event.stopPropagation()}
            onSubmit={saveDraft}
          >
            <div className="full agenda__form-head">
              <h2 id="agenda-form-title">{draft.id ? 'Editar cita' : 'Nueva cita'}</h2>
              <button className="agenda__close" type="button" onClick={() => setDraft(null)} aria-label="Cerrar">
                ×
              </button>
            </div>
            <label>
              Dueño
              <input name="owner" value={draft.owner} onChange={onDraft} required placeholder="Ana Pérez" />
            </label>
            <label>
              Mascota
              <input name="pet" value={draft.pet} onChange={onDraft} required placeholder="Luna" />
            </label>
            <label>
              Especie
              <select name="species" value={draft.species} onChange={onDraft}>
                <option>Perro</option>
                <option>Gato</option>
                <option>Otra</option>
              </select>
            </label>
            <label>
              Servicio
              <select name="service" value={draft.service} onChange={onDraft}>
                {SERVICES.map((service) => (
                  <option key={service.id}>{service.title}</option>
                ))}
              </select>
            </label>
            <label>
              Fecha
              <input type="date" name="date" value={draft.date} onChange={onDraft} required />
            </label>
            <label>
              Hora
              <input type="time" name="time" value={draft.time} onChange={onDraft} />
            </label>
            <label>
              Teléfono
              <input name="phone" value={draft.phone} onChange={onDraft} required placeholder="300 000 0000" />
            </label>
            <label>
              Estado
              <select name="status" value={draft.status} onChange={onDraft}>
                {STATUSES.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="full">
              Nota
              <textarea name="note" value={draft.note} onChange={onDraft} placeholder="Síntomas, ayuno o cómo llega" />
            </label>
            <div className="full agenda__form-actions">
              <button className="btn btn--ghost" type="button" onClick={() => setDraft(null)}>
                Cerrar
              </button>
              <button className="btn btn--peach" type="submit">
                Guardar cita
              </button>
            </div>
          </form>
        </div>
      ) : null}
    </section>
  );
}

function parseISODay(iso) {
  return Number(iso.slice(8));
}
