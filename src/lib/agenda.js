const KEY = 'caobos-agenda';

export const STATUSES = [
  { id: 'nueva', label: 'Por confirmar' },
  { id: 'confirmada', label: 'Confirmada' },
  { id: 'sala', label: 'En sala' },
  { id: 'atendida', label: 'Atendida' },
  { id: 'cancelada', label: 'Cancelada' },
];

export const NEXT_STATUS = {
  nueva: { id: 'confirmada', label: 'Confirmar' },
  confirmada: { id: 'sala', label: 'Llegó' },
  sala: { id: 'atendida', label: 'Atendida' },
};

export function isoDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function parseISO(iso) {
  const [year, month, day] = iso.split('-').map(Number);
  return new Date(year, month - 1, day);
}

export function addDays(iso, days) {
  const date = parseISO(iso);
  date.setDate(date.getDate() + days);
  return isoDate(date);
}

export function weekOf(iso) {
  const date = parseISO(iso);
  const weekday = date.getDay();
  const mondayOffset = weekday === 0 ? -6 : 1 - weekday;
  return Array.from({ length: 7 }, (_, index) => addDays(iso, mondayOffset + index));
}

export function formatDay(iso, options) {
  return parseISO(iso).toLocaleDateString('es-CO', options);
}

function uid() {
  return `cita-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

function buildSeed() {
  const today = isoDate(new Date());
  const rows = [
    ['Camila Rojas', 'Luna', 'Perro', 'Consulta médica veterinaria', 0, '09:00', '300 441 2201', 'Control y vacunas al día.', 'confirmada'],
    ['Andrés Peña', 'Milo', 'Gato', 'Consulta de urgencias diurnas', 0, '10:30', '301 558 9033', 'No come desde anoche.', 'nueva'],
    ['Laura Gómez', 'Kira', 'Perro', 'Estética y bienestar', 0, '11:15', '312 670 1144', 'Baño y corte de uñas.', 'sala'],
    ['Sara Romero', 'Nina', 'Perro', 'Hospitalización', 0, '14:00', '315 220 8841', 'Pasa a observación después del control.', 'confirmada'],
    ['Julián Ortiz', 'Tomás', 'Gato', 'Exámenes diagnósticos de laboratorio', 1, '08:30', '300 918 4420', '', 'confirmada'],
    ['Mariana Díaz', 'Coco', 'Perro', 'Diagnóstico por imagen', 1, '16:00', '318 334 7765', 'Cojea de la pata derecha.', 'nueva'],
    ['Helena Cruz', 'Simón', 'Perro', 'Cirugía veterinaria', -1, '09:40', '310 225 0091', 'Castración. Ya salió.', 'atendida'],
    ['Pedro Rueda', 'Mía', 'Gato', 'Asesoría en nutrición', 2, '15:30', '304 771 6630', '', 'confirmada'],
  ];

  return rows.map(([owner, pet, species, service, offset, time, phone, note, status]) => ({
    id: uid(),
    owner,
    pet,
    species,
    service,
    date: addDays(today, offset),
    time,
    phone,
    note,
    status,
    source: 'agenda',
    createdAt: new Date().toISOString(),
  }));
}

export function loadAppointments() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) {
      const seeded = buildSeed();
      localStorage.setItem(KEY, JSON.stringify(seeded));
      return seeded;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveAppointments(items) {
  localStorage.setItem(KEY, JSON.stringify(items));
}

export function createAppointment(data, source = 'agenda') {
  return {
    id: uid(),
    owner: data.owner.trim(),
    pet: data.pet.trim(),
    species: data.species || 'Perro',
    service: data.service,
    date: data.date,
    time: data.time || '',
    phone: data.phone.trim(),
    note: (data.note || '').trim(),
    status: source === 'web' ? 'nueva' : data.status || 'confirmada',
    source,
    createdAt: new Date().toISOString(),
  };
}
