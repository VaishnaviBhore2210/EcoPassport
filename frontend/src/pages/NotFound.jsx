import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf } from 'lucide-react';
import Nav from '../components/Nav';

export default function NotFound() {
  return (
    <>
      <Nav />
      <main className="center">
        <Leaf size={40} />
        <h1>404 — Page not found</h1>
        <p>The page you're looking for doesn't exist or may have moved.</p>
        <Link className="btn" to="/">Back to Dashboard</Link>
      </main>
    </>
  );
}