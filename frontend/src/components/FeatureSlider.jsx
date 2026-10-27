import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Recycle, QrCode, BrainCircuit, ShieldCheck } from 'lucide-react';

const SLIDES = [
  { icon: <BrainCircuit size={30} />, title: 'AI Sustainability Scoring', text: 'Every product is automatically scored using its material, weight, energy and transport data.' },
  { icon: <QrCode size={30} />, title: 'One Scan, Full Transparency', text: 'Each passport generates a unique QR code so anyone can verify a product instantly.' },
  { icon: <Recycle size={30} />, title: 'Track the Full Lifecycle', text: 'From manufacturing to shipping, repair, and recycling — one living timeline.' },
  { icon: <ShieldCheck size={30} />, title: 'Build Consumer Trust', text: 'A visible verified badge reassures customers your sustainability claims are real.' },
];

export default function FeatureSlider() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % SLIDES.length), 4500);
    return () => clearInterval(t);
  }, []);

  const slide = SLIDES[i];

  return (
    <div className="zone-block">
      <AnimatePresence mode="wait">
        <motion.div
          key={i}
          className="zone-feature-slide"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
        >
          <div className="zone-feature-icon">{slide.icon}</div>
          <h3>{slide.title}</h3>
          <p>{slide.text}</p>
        </motion.div>
      </AnimatePresence>
      <div className="zone-dots">
        {SLIDES.map((_, d) => (
          <button key={d} className={`zone-dot ${d === i ? 'active' : ''}`} onClick={() => setI(d)} aria-label={`Slide ${d + 1}`} />
        ))}
      </div>
    </div>
  );
}