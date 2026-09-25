import { MARQUEE } from '../data/content.js';

export function Marquee() {
  const row = [...MARQUEE, ...MARQUEE];

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {row.map((item, index) => (
          <span key={`${item}-${index}`}>
            {item}
            <i>•</i>
          </span>
        ))}
      </div>
    </div>
  );
}
