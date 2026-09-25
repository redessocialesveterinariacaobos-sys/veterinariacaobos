import { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { FloatingWhatsApp } from './components/FloatingWhatsApp.jsx';
import { Footer } from './components/layout/Footer.jsx';
import { Navbar } from './components/layout/Navbar.jsx';
import { Agenda } from './pages/citas/Agenda.jsx';
import { Casos } from './pages/casos/Casos.jsx';
import { FarmaciaPage } from './pages/farmacia/FarmaciaPage.jsx';
import { Home } from './pages/Home.jsx';
import { Reto } from './pages/reto/Reto.jsx';
import { Servicio } from './pages/servicios/Servicio.jsx';
import { ServiciosPage } from './pages/servicios/ServiciosPage.jsx';

function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.slice(1);
      const frame = window.requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView();
      });
      return () => window.cancelAnimationFrame(frame);
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

function Shell() {
  const { pathname } = useLocation();
  const agenda = pathname === '/agenda';

  return (
    <>
      <ScrollManager />
      {agenda ? null : <Navbar />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/servicios" element={<ServiciosPage />} />
          <Route path="/servicios/:servicioId" element={<Servicio />} />
          <Route path="/casos" element={<Casos />} />
          <Route path="/reto" element={<Reto />} />
          <Route path="/farmacia" element={<FarmaciaPage />} />
          <Route path="/agenda" element={<Agenda />} />
        </Routes>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Shell />
    </BrowserRouter>
  );
}

export default App;
