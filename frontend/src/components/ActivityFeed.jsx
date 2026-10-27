import React, { useEffect, useState } from 'react';
import { Factory, Truck, Wrench, PackageCheck, Recycle, Trash2, Clock } from 'lucide-react';
import { api } from '../api';

const ICONS = {
  MANUFACTURED: <Factory size={15} />,
  SHIPPED: <Truck size={15} />,
  REPAIRED: <Wrench size={15} />,
  SOLD: <PackageCheck size={15} />,
  RECYCLED: <Recycle size={15} />,
  DISPOSED: <Trash2 size={15} />,
};

export default function ActivityFeed() {
  const [events, setEvents] = useState(null);

  useEffect(() => {
    api.get('/events/recent').then((r) => setEvents(r.data)).catch(() => setEvents([]));
  }, []);

  if (events === null) return null;
  if (events.length === 0) return null;

  return (
    <section className="panel">
      <h2><Clock size={16} style={{ verticalAlign: '-3px', marginRight: 6 }} />Recent Activity</h2>
      <div className="activity-list">
        {events.map((e) => (
          <div className="activity-row" key={e.id}>
            <div className="activity-icon">{ICONS[e.eventType] || <PackageCheck size={15} />}</div>
            <div>
              <b>{e.eventType}</b>{e.product ? <> · {e.product.name}</> : null}
              <span className="activity-meta">{e.location}{e.eventDate ? ` · ${e.eventDate}` : ''}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}