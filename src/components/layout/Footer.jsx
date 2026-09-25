import { Link } from 'react-router-dom';
import { LOGO_URL, SITE } from '../../data/site.js';

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div>
          <div className="footer__brand">
            <img src={LOGO_URL} alt="" />
            {SITE.name}
          </div>
          <p>
            Clínica veterinaria para perros y gatos: consulta, diagnóstico, cirugía,
            hospitalización y bienestar.
          </p>
        </div>
        <div>
          <h3>Ir a</h3>
          <ul>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/#nosotros">Nosotros</Link></li>
            <li><Link to="/servicios">Servicios</Link></li>
            <li><Link to="/casos">Casos</Link></li>
            <li><Link to="/reto">Reto</Link></li>
            <li><Link to="/farmacia">Farmacia</Link></li>
            <li><Link to="/#citas">Citas</Link></li>
          </ul>
        </div>
        <div>
          <h3>Servicios</h3>
          <ul>
            <li><Link to="/servicios#servicio-consulta">Consulta médica</Link></li>
            <li><Link to="/servicios#servicio-laboratorio">Laboratorio e imagen</Link></li>
            <li><Link to="/servicios#servicio-cirugia">Cirugía y hospitalización</Link></li>
            <li><Link to="/servicios#servicio-estetica">Estética, farmacia y transporte</Link></li>
          </ul>
        </div>
        <div id="contacto">
          <h3>Contacto</h3>
          <p>{SITE.address}</p>
          <p>
            <a href={`tel:+57${SITE.phone}`}>{SITE.phoneLabel}</a>
          </p>
          <p>
            <a href={SITE.instagram} target="_blank" rel="noreferrer">
              {SITE.instagramHandle}
            </a>
          </p>
        </div>
      </div>
      <div className="container footer__bottom">
        © {new Date().getFullYear()} {SITE.name}. Todos los derechos reservados.
      </div>
    </footer>
  );
}
