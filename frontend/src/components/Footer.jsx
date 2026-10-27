import React from 'react';
import { Leaf } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-brand"><Leaf size={16} /> EcoPassport</div>
      <p>Digital Product Passports for a more transparent, sustainable supply chain.</p>
      <small>© {new Date().getFullYear()} EcoPassport · v1.0</small>
    </footer>
  );
}