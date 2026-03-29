import { useCallback, useEffect, useState } from 'react';
import { useLenis } from './hooks';
import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Process } from './components/Process';
import { Portfolio } from './components/Portfolio';
import { Pricing } from './components/Pricing';
import { FAQ } from './components/FAQ';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Splash } from './components/Splash';
import { AnimatedBlobCursor } from './components/AnimatedBlobCursor';
import { ProgressBar } from './components/ProgressBar';
import { CanvasParticleBackground } from './components/CanvasParticleBackground';
import { InteractiveMeshGradient } from './components/InteractiveMeshGradient';
import { ScrollVelocityEffect } from './components/ScrollVelocityEffect';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  useLenis();
  const onDone = useCallback(() => setShowSplash(false), []);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <>
      {showSplash && <Splash onDone={onDone} />}
      <ProgressBar />
      <AnimatedBlobCursor />
      <CanvasParticleBackground />
      <InteractiveMeshGradient />
      <ScrollVelocityEffect />
      <div className="min-h-screen bg-[#07080f] text-white overflow-x-hidden cursor-none relative">
        <Nav scrolled={scrolled} />
        <Hero />
        <Services />
        <Process />
        <Portfolio />
        <Pricing />
        <FAQ />
        <Contact />
        <Footer />
      </div>
    </>
  );
}
