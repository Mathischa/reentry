import { useCallback, useEffect, useState } from 'react';
import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Process } from './components/Process';
import { Portfolio } from './components/Portfolio';
import { Pricing } from './components/Pricing';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { Splash } from './components/Splash';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  const onDone = useCallback(() => setShowSplash(false), []);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <>
      {showSplash && <Splash onDone={onDone} />}
      <div className="min-h-screen bg-[#07080f] text-white overflow-x-hidden">
        <Nav scrolled={scrolled} />
        <Hero />
        <Services />
        <Process />
        <Portfolio />
        <Pricing />
        <FAQ />
        <Footer />
      </div>
    </>
  );
}
