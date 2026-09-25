import { About } from '../sections/home/About.jsx';
import { CtaBand } from '../sections/home/CtaBand.jsx';
import { Experiencias } from '../sections/home/Experiencias.jsx';
import { Hero } from '../sections/home/Hero.jsx';
import { Reserva } from '../sections/home/Reserva.jsx';
import { Testimonios } from '../sections/home/Testimonios.jsx';
import { TrustBar } from '../sections/home/TrustBar.jsx';
import { Ubicacion } from '../sections/home/Ubicacion.jsx';

export function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <About />
      <Experiencias />
      <CtaBand />
      <Testimonios />
      <Reserva />
      <Ubicacion />
    </>
  );
}
