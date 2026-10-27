import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ScanLine, ArrowRight } from 'lucide-react';
import Nav from '../components/Nav';

export default function Consumer() {
  const [x, setX] = useState('');
  const navigate = useNavigate();

  const go = () => {
    if (!x.trim()) return;
    navigate('/consumer/passport/' + x.trim());
  };

  return (
    <>
      <Nav />
      <main className="center">
        <div className="consumer-icon"><ScanLine size={40} /></div>
        <h1>Consumer Passport Lookup</h1>
        <p>Enter the EcoPassport ID printed on the product, or scan its QR code.</p>
        <div className="consumer-input-row">
          <input placeholder="ECO-XXXXXXXX" value={x} onChange={(e) => setX(e.target.value.toUpperCase())} onKeyDown={(e) => e.key === 'Enter' && go()} />
          <button onClick={go}>View Passport <ArrowRight size={16} /></button>
        </div>
      </main>
    </>
  );
}
