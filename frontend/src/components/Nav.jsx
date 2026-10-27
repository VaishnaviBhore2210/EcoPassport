import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Leaf, Menu, X, LogOut, Sun, Moon, LayoutDashboard, PlusCircle, ScanLine, ShieldCheck } from 'lucide-react';
import { getUser, logout } from '../api';
import { useTheme } from './ThemeContext';

export default function Nav() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const user = getUser();
  const { dark, toggle } = useTheme();

  const links = [
    { to: '/', label: 'Dashboard', icon: <LayoutDashboard size={16} /> },
    ...(user ? [{ to: '/add', label: 'Add Product', icon: <PlusCircle size={16} /> }] : []),
    { to: '/consumer', label: 'Consumer', icon: <ScanLine size={16} /> },
    ...(user?.role === 'ADMIN' ? [{ to: '/admin', label: 'Admin', icon: <ShieldCheck size={16} /> }] : []),
  ];

  const doLogout = () => { logout(); navigate('/login'); };

  return (
    <nav className="nav">
      <Link to="/" className="brand"><Leaf size={22} /> EcoPassport</Link>

      <div className={`nav-links ${open ? 'open' : ''}`}>
        {links.map((l) => (
          <Link key={l.to} to={l.to} className={pathname === l.to ? 'active' : ''} onClick={() => setOpen(false)}>
            {l.icon}{l.label}
          </Link>
        ))}
        <button className="icon-btn" onClick={toggle} title="Toggle theme">
          {dark ? <Sun size={17} /> : <Moon size={17} />}
        </button>
        {user ? (
          <button className="icon-btn logout" onClick={doLogout} title="Log out"><LogOut size={16} /> {user.name?.split(' ')[0]}</button>
        ) : (
          <Link to="/login" className="btn-outline-nav">Login</Link>
        )}
      </div>

      <button className="burger" onClick={() => setOpen((o) => !o)} aria-label="Menu">
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>
    </nav>
  );
}