import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const REVIEWS = [
  { name: 'Ananya Rao', role: 'Sustainability Lead, GreenWeave Textiles', quote: 'EcoPassport cut the time we spend answering retailer sustainability audits from days to minutes.', rating: 5 },
  { name: 'Marcus Webb', role: 'Operations Manager, Northfield Goods', quote: 'The AI scoring gave us a clear, consistent way to compare materials across product lines.', rating: 5 },
  { name: 'Priya Sharma', role: 'Consumer', quote: 'I scanned the tag on a jacket and could see where it was made and how to recycle it.', rating: 4 },
  { name: 'Daniel Ortiz', role: 'Supply Chain Analyst, Verde Manufacturing', quote: 'Logging lifecycle events through repair and recycling has been huge for compliance reporting.', rating: 5 },
];

export default function Testimonials() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % REVIEWS.length), 5000);
    return () => clearInterval(t);
  }, []);

  const r = REVIEWS[i];

  return (
    <div className="zone-block zone-testimonial">
      <h3 className="zone-subhead">What people are saying</h3>
      <AnimatePresence mode="wait">
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35 }}
        >
          <Quote className="zone-quote-icon" size={22} />
          <p className="zone-testimonial-text">"{r.quote}"</p>
          <div className="zone-stars">
            {Array.from({ length: 5 }).map((_, s) => <Star key={s} size={14} fill={s < r.rating ? 'currentColor' : 'none'} />)}
          </div>
          <div className="zone-author">
            <div className="zone-avatar">{r.name.split(' ').map((w) => w[0]).join('')}</div>
            <div><b>{r.name}</b><span>{r.role}</span></div>
          </div>
        </motion.div>
      </AnimatePresence>
      <div className="zone-dots">
        {REVIEWS.map((_, d) => <button key={d} className={`zone-dot ${d === i ? 'active' : ''}`} onClick={() => setI(d)} aria-label={`Review ${d + 1}`} />)}
      </div>
    </div>
  );
}