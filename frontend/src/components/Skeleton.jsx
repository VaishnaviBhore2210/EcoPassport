import React from 'react';

export function CardSkeleton({ count = 4 }) {
  return (
    <div className="grid">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="skeleton skel-card" />
      ))}
    </div>
  );
}

export function RowSkeleton({ count = 3 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="skeleton skel-row" />
      ))}
    </>
  );
}
