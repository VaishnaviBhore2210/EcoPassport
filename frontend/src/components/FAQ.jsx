import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const QA = [
  {
    q: 'What is a Digital Product Passport?',
    a: 'It\'s a single record that follows a product from manufacturing to end-of-life — its materials, sustainability score, carbon footprint, and every lifecycle event, accessible via a unique ID or QR code.',
  },
  {
    q: 'How is the sustainability score calculated?',
    a: 'Our AI engine looks at weight, recycled content percentage, energy used in manufacturing, and transport distance to generate a 0–100 score and a written recommendation.',
  },
  {
    q: 'Can customers see this without an account?',
    a: 'Yes. Anyone can scan the QR code or enter the passport ID on the Consumer page to view a read-only public summary — no login required.',
  },
  {
    q: 'Who can add or edit products?',
    a: 'Only signed-in Manufacturer accounts can register products and add lifecycle events. Consumers only get read access.',
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section className="panel">
      <h2>Frequently Asked Questions</h2>
      <div className="faq-list">
        {QA.map((item, i) => (
          <div className="faq-item" key={i}>
            <button className="faq-question" onClick={() => setOpen(open === i ? -1 : i)}>
              <span>{item.q}</span>
              <motion.span animate={{ rotate: open === i ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <ChevronDown size={18} />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {open === i && (
                <motion.div
                  className="faq-answer"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                >
                  <p>{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}