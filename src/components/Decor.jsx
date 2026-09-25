export function Heart({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 20s-7-4.4-9.2-8.2C1 9.2 2.2 6 5.4 6c1.8 0 3.1 1 3.8 2.2C10 7 11.2 6 13 6c3.2 0 4.4 3.2 2.6 5.8C13.4 15.6 12 20 12 20z" />
    </svg>
  );
}

export function HeartOutline({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 20s-7-4.4-9.2-8.2C1 9.2 2.2 6 5.4 6c1.8 0 3.1 1 3.8 2.2C10 7 11.2 6 13 6c3.2 0 4.4 3.2 2.6 5.8C13.4 15.6 12 20 12 20z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Paw({ className }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
      <ellipse cx="8" cy="10.4" rx="3.5" ry="4.1" />
      <ellipse cx="16" cy="8" rx="3.7" ry="4.3" />
      <ellipse cx="24" cy="10.4" rx="3.5" ry="4.1" />
      <ellipse cx="16" cy="22.2" rx="8.4" ry="6.6" />
    </svg>
  );
}

export function PawMark({ className = '' }) {
  return (
    <svg className={`home-mark ${className}`} viewBox="0 0 80 80" aria-hidden="true">
      <ellipse cx="22" cy="28" rx="9" ry="12" transform="rotate(-28 22 28)" />
      <ellipse cx="40" cy="18" rx="9.5" ry="13" />
      <ellipse cx="58" cy="28" rx="9" ry="12" transform="rotate(28 58 28)" />
      <path d="M40 38c-16 0-24 11-24 20 0 9 9 15 24 15s24-6 24-15c0-9-8-20-24-20z" />
    </svg>
  );
}

export function BoneMark({ className = '' }) {
  return (
    <svg className={`home-mark ${className}`} viewBox="0 0 88 40" aria-hidden="true">
      <rect x="24" y="14" width="40" height="12" rx="6" />
      <circle cx="20" cy="14" r="8" />
      <circle cx="20" cy="26" r="8" />
      <circle cx="68" cy="14" r="8" />
      <circle cx="68" cy="26" r="8" />
    </svg>
  );
}
