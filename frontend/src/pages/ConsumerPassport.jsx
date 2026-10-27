import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Factory, Globe2, Scale, Recycle, PackageCheck, MapPin, SearchX, Loader2 } from 'lucide-react';
import Nav from '../components/Nav';
import ScoreRing from '../components/ScoreRing';
import TrustBadge from '../components/TrustBadge';
import { api } from '../api';

export default function ConsumerPassport() {
  const { pid } = useParams();
  const [p, setP] = useState(undefined); // undefined = loading, null = not found

  useEffect(() => {
    api.get('/products/passport/' + pid)
      .then((r) => setP(r.data))
      .catch(() => setP(null));
  }, [pid]);

  if (p === undefined) {
    return <><Nav /><main className="center"><Loader2 className="spin" size={28} /><p>Looking up passport…</p></main></>;
  }
  if (p === null) {
    return (
      <><Nav /><main className="center">
        <SearchX size={40} />
        <h1>Passport not found</h1>
        <p>We couldn't find a product for <b>{pid}</b>. Double-check the ID and try again.</p>
      </main></>
    );
  }

  return (
    <>
      <Nav />
      <main>
        <div className="passport">
          <div>
            <small className="eyebrow">CONSUMER VIEW</small>
            <h1>{p.name}</h1>
           <p>{p.passportId} · {p.category}</p>
        <TrustBadge score={p.sustainabilityScore} />
          </div>
        </div>
        <div className="grid stat-grid passport-stats">
          <div className="stat-card center-ring"><ScoreRing value={p.sustainabilityScore} label="Sustainability" /></div>
          <div className="stat-card"><Recycle size={20} /><small>Eco Rating</small><h2>{p.ecoRating || '—'}</h2></div>
          <div className="stat-card"><Globe2 size={20} /><small>Carbon Footprint</small><h2>{p.carbonFootprint ?? '—'} kg</h2></div>
          <div className="stat-card"><Scale size={20} /><small>Material</small><h2>{p.material}</h2></div>
        </div>
        <section className="panel">
          <h2>Product Information</h2>
          <div className="info-grid">
            <div><Factory size={15} /><span>Manufacturer</span><b>{p.manufacturer}</b></div>
            <div><MapPin size={15} /><span>Origin</span><b>{p.originCountry}</b></div>
            <div><PackageCheck size={15} /><span>Recyclable</span><b>{p.recyclable ? 'Yes' : 'No'}</b></div>
          </div>
        </section>
        <section className="panel ai">
          <h2>🤖 AI Sustainability Recommendation</h2>
          <p>{p.aiRecommendation || 'No recommendation available yet.'}</p>
        </section>
        {p.recyclingInstructions && (
          <section className="panel">
            <h2>♻️ Recycling Instructions</h2>
            <p>{p.recyclingInstructions}</p>
          </section>
        )}
      </main>
    </>
  );
}
