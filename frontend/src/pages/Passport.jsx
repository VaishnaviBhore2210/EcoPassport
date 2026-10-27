import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { Factory, Globe2, Scale, Recycle, PackageCheck, MapPin, SearchX, Loader2, Clock } from 'lucide-react';
import Nav from '../components/Nav';
import ScoreRing from '../components/ScoreRing';
import TrustBadge from '../components/TrustBadge';
import { api, getUser, errMsg, API_ORIGIN } from '../api';
import { useToast } from '../components/Toast';

const TYPES = ['MANUFACTURED', 'SHIPPED', 'SOLD', 'REPAIRED', 'RECYCLED', 'DISPOSED'];

export default function Passport() {
  const { id } = useParams();
  const user = getUser();
  const toast = useToast();
  const [p, setP] = useState(undefined);
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({ eventType: 'MANUFACTURED', location: '', description: '' });

  const loadEvents = () =>
    api.get(`/products/${id}/lifecycle`).then((r) => setEvents(r.data)).catch(() => setEvents([]));

  useEffect(() => {
    api.get(`/products/${id}`).then((r) => setP(r.data)).catch(() => setP(null));
    loadEvents();
  }, [id]);

  const addEvent = async () => {
    try {
      await api.post(`/products/${id}/lifecycle`, form);
      setForm({ ...form, location: '', description: '' });
      loadEvents();
      toast?.('Event added');
    } catch (e) { toast?.(errMsg(e)); }
  };

  if (p === undefined) return <><Nav /><main className="center"><Loader2 className="spin" size={28} /></main></>;
  if (p === null) return <><Nav /><main className="center"><SearchX size={40} /><h1>Product not found</h1></main></>;

  const url = `${window.location.origin}/consumer/passport/${p.passportId}`;

  return (
    <>
      <Nav />
      <main>
        <div className="passport">
          <div>
            <small className="eyebrow">PRODUCT PASSPORT</small>
            <h1>{p.name}</h1>
            <p>{p.passportId} · {p.category}</p>
            <TrustBadge score={p.sustainabilityScore} />
          </div>
          <div className="qr-box">
            <QRCodeSVG value={url} size={120} />
            <small>Scan to verify</small>
          </div>
        </div>

        {p.imageUrl && <img src={API_ORIGIN + p.imageUrl} alt={p.name} style={{ maxWidth: '100%', borderRadius: 16 }} />}

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

        <section className="panel">
          <h2><Clock size={16} style={{ verticalAlign: '-3px', marginRight: 6 }} />Lifecycle Timeline</h2>
          {user && (
            <div className="lifecycle-form">
              <select value={form.eventType} onChange={(e) => setForm({ ...form, eventType: e.target.value })}>
                {TYPES.map((t) => <option key={t}>{t}</option>)}
              </select>
              <input placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
              <input placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              <button onClick={addEvent}>Add</button>
            </div>
          )}
          <div className="timeline">
            {events.length === 0 && <p className="muted">No events yet.</p>}
            {events.map((e) => (
              <div className="timeline-item" key={e.id}>
                <div className="timeline-icon"><PackageCheck size={14} /></div>
                <div>
                  <b>{e.eventType}</b>
                  <span className="timeline-meta">{e.location} {e.eventDate ? `· ${e.eventDate}` : ''}</span>
                  {e.description && <p>{e.description}</p>}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}