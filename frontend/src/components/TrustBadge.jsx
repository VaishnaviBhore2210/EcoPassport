import React from 'react';
import { ShieldCheck, ShieldAlert, ShieldQuestion } from 'lucide-react';

export default function TrustBadge({ score }) {
  const s = score ?? 0;
  let tier = 'low';
  let label = 'Needs Improvement';
  let Icon = ShieldAlert;

  if (s >= 70) {
    tier = 'good';
    label = 'Verified Sustainable';
    Icon = ShieldCheck;
  } else if (s >= 40) {
    tier = 'mid';
    label = 'Under Review';
    Icon = ShieldQuestion;
  }

  return (
    <div className={`trust-badge trust-${tier}`}>
      <Icon size={16} />
      <span>{label}</span>
    </div>
  );
}


