import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Instagram, Menu, X } from 'lucide-react';
import { INSTAGRAM_CASES } from '../../data/content.js';
import { LOGO_URL, NAV_LINKS, SITE } from '../../data/site.js';

const MENU_LINKS = NAV_LINKS;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const dropRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const close = () => {
    setOpen(false);
    setServicesOpen(false);
  };

  useEffect(() => {
    const onPointer = (event) => {
      if (!dropRef.current?.contains(event.target)) setServicesOpen(false);
    };
    const onKey = (event) => {
      if (event.key === 'Escape') setServicesOpen(false);
    };
    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  return (
    <header className={`nav ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`}>
      <div className="nav__inner container">
        <nav className="nav__links" aria-label="Principal">
          {MENU_LINKS.map((link) =>
            link.href === '/servicios' ? (
              <div className="nav__drop" key={link.href} ref={dropRef}>
                <button
                  type="button"
                  className={`nav__drop-btn${servicesOpen ? ' is-on' : ''}`}
                  aria-expanded={servicesOpen}
                  aria-controls="menu-servicios"
                  onClick={() => setServicesOpen((value) => !value)}
                >
                  {link.label}
                  <ChevronDown size={16} />
                </button>
                {servicesOpen ? (
                  <div className="nav__menu" id="menu-servicios" role="menu">
                    <Link role="menuitem" to="/servicios" onClick={close}>
                      Todos los servicios
                    </Link>
                    {INSTAGRAM_CASES.map((item) => (
                      <Link
                        key={item.id}
                        role="menuitem"
                        to={`/servicios/${item.id}`}
                        onClick={close}
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            ) : (
              <Link key={link.href} to={link.href} onClick={close}>
                {link.label}
              </Link>
            ),
          )}
          <Link className="btn btn--peach nav__cta-mobile" to="/#citas" onClick={close}>
            Agendar cita
          </Link>
        </nav>

        <Link to="/" className="nav__brand" onClick={close} aria-label={`${SITE.name}, ir al inicio`}>
          <img src={LOGO_URL} alt="" />
          <span>{SITE.name}</span>
        </Link>

        <div className="nav__actions">
          <a
            className="nav__social"
            href={SITE.instagram}
            target="_blank"
            rel="noreferrer"
          >
            <Instagram size={16} />
            {SITE.instagramHandle}
          </a>
          <Link className="btn btn--peach nav__cta" to="/#citas" onClick={close}>
            Agendar cita
          </Link>
        </div>

        <button
          className="nav__toggle"
          type="button"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </header>
  );
}
