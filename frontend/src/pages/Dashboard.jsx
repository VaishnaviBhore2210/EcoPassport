import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Leaf, PlusCircle, Package, BadgeCheck, Gauge } from 'lucide-react';
import Nav from '../components/Nav';
import AnimatedNumber from '../components/AnimatedNumber';
import BarChart from '../components/BarChart';
import ActivityFeed from '../components/ActivityFeed';
import FeatureSlider from '../components/FeatureSlider';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import TrustBadge from '../components/TrustBadge';
import { CardSkeleton } from '../components/Skeleton';
import { api, getUser } from '../api';

export default function Dashboard() {
  const [products, setProducts] = useState(null);
  const user = getUser();

  useEffect(() => {
    api.get('/products').then((r) => setProducts(r.data)).catch(() => setProducts([]));
  }, []);

  const list = products || [];
  const scored = list.filter((p) => p.sustainabilityScore != null);
  const avg = scored.length
    ? Math.round(scored.reduce((s, p) => s + p.sustainabilityScore, 0) / scored.length)
    : 0;
  const verified = list.filter((p) => (p.sustainabilityScore ?? 0) >= 70).length;
  const chart = scored
    .slice(0, 8)
    .map((p) => ({ label: p.name, value: Math.round(p.sustainabilityScore) }));

  return (
    <>
      <Nav />
      <main>
        <section className="hero">
          <div>
            <small className="eyebrow">DIGITAL PRODUCT PASSPORT</small>
            <h1>Make every product <b>transparent</b> and sustainable</h1>
            <p>Track materials, carbon footprint and lifecycle events in one verifiable passport.</p>
            {user && <Link className="btn" to="/add"><PlusCircle size={16} /> Add Product</Link>}
            {!user && <Link className="btn" to="/register">Get Started</Link>}
          </div>
          <Leaf className="hero-icon" size={120} />
        </section>

        <div className="grid">
          <div><Package size={20} /><small>Products</small><h2><AnimatedNumber value={list.length} /></h2></div>
          <div><Gauge size={20} /><small>Avg. Score</small><h2><AnimatedNumber value={avg} suffix="%" /></h2></div>
          <div><BadgeCheck size={20} /><small>Verified</small><h2><AnimatedNumber value={verified} /></h2></div>
        </div>

        {products === null ? <CardSkeleton count={3} /> : (
          <>
            <section className="panel">
              <h2>Sustainability by Product</h2>
              <BarChart data={chart} />
            </section>
            <section className="panel">
              <h2>Products</h2>
              {list.length === 0 && <p className="muted">No products yet.</p>}
              <div className="activity-list">
                {list.map((p) => (
                  <div className="activity-row" key={p.id}>
                    <div>
                      <Link to={`/passport/${p.id}`}><b>{p.name}</b></Link>
                      <span className="activity-meta">{p.passportId} · {p.category}</span>
                    </div>
                    <TrustBadge score={p.sustainabilityScore} />
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        <ActivityFeed />
        <FeatureSlider />
        <Testimonials />
        <FAQ />
      </main>
    </>
  );
}