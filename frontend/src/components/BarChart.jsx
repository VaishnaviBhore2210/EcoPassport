import React from 'react';

export default function BarChart({ data, valueSuffix = '%' }) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <div className="bar-chart">
      {data.map((d) => (
        <div className="bar-row" key={d.label}>
          <span className="bar-label">{d.label}</span>
          <div className="bar-track">
            <div
              className="bar-fill"
              style={{ width: `${(d.value / max) * 100}%` }}
            />
          </div>
          <span className="bar-value">{d.value}{valueSuffix}</span>
        </div>
      ))}
      {data.length === 0 && <p className="muted">Not enough data yet.</p>}
    </div>
  );
}