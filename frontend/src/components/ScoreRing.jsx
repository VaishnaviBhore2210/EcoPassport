import React from 'react';

export default function ScoreRing({ value = 0, size = 110, label = 'Score' }) {
  const stroke = 10;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = Math.max(0, Math.min(100, value || 0));
  const offset = c - (pct / 100) * c;
  const color = pct >= 75 ? '#2fae5f' : pct >= 45 ? '#e8a33d' : '#e6584f';

  return (
    <div className="score-ring" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        <circle cx={size / 2} cy={size / 2} r={r} stroke="var(--ring-bg)" strokeWidth={stroke} fill="none" />
        <circle
          cx={size / 2} cy={size / 2} r={r} stroke={color} strokeWidth={stroke} fill="none"
          strokeDasharray={c} strokeDashoffset={offset} strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ transition: 'stroke-dashoffset 1s ease' }}
        />
      </svg>
      <div className="score-ring-text">
        <b>{value ?? '—'}{value != null ? '%' : ''}</b>
        <small>{label}</small>
      </div>
    </div>
  );
}
