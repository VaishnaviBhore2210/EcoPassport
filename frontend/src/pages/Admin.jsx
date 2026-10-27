import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Boxes, CheckCircle2, Clock, Check, X, ShieldCheck } from 'lucide-react';
import Nav from '../components/Nav';
import { api, errMsg } from '../api';
import { useToast } from '../components/Toast';

const list = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } } };

export default function Admin() {
  const [products, setProducts] = useState(null);
  const [users, setUsers] = useState(null);
  const [tab, setTab] = useState('pending');
  const toast = useToast();

  const load = () => {
    api.get('/products').then((r) => setProducts(r.data)).catch(() => setProducts([]));
    api.get('/admin/users').then((r) => setUsers(r.data)).catch(() => setUsers([]));
  };
  useEffect(load, []);

  const setApproval = async (id, approve) => {
    try {
      await api.post(`/admin/products/${id}/${approve ? 'approve' : 'reject'}`);
      toast(approve ? 'Product approved.' : 'Product moved back to pending.', 'success');
      load();
    } catch (err) {
      toast(errMsg(err), 'error');
    }
  };

  if (products === null || users === null) return <><Nav /><main><p className="muted">Loading admin dashboard…</p></main></>;

  const pending = products.filter((p) => !p.approved);
  const approved = products.filter((p) => p.approved);
  const shown = tab === 'pending' ? pending : tab === 'approved' ? approved : products;

  return (
    <>
      <Nav />
      <main>
        <section className="hero admin-hero">
          <div className="hero-blob hero-blob-1" />
          <div>
            <small className="eyebrow">ADMINISTRATOR</small>
            <h1>Platform <b>oversight</b>, at a glance.</h1>
            <p>Review new products, manage users, and keep the sustainability data trustworthy.</p>
          </div>
          <div className="hero-icon"><ShieldCheck size={90} /></div>
        </section>

        <motion.div className="grid stat-grid" variants={list} initial="hidden" animate="show">
          <motion.div variants={item} className="stat-card" whileHover={{ y: -4 }}><Boxes size={20} /><small>Total Products</small><h2>{products.length}</h2></motion.div>
          <motion.div variants={item} className="stat-card" whileHover={{ y: -4 }}><Clock size={20} /><small>Pending Approval</small><h2>{pending.length}</h2></motion.div>
          <motion.div variants={item} className="stat-card" whileHover={{ y: -4 }}><CheckCircle2 size={20} /><small>Approved</small><h2>{approved.length}</h2></motion.div>
          <motion.div variants={item} className="stat-card" whileHover={{ y: -4 }}><Users size={20} /><small>Registered Users</small><h2>{users.length}</h2></motion.div>
        </motion.div>

        <section className="panel">
          <div className="panel-head">
            <h2>Product Approvals</h2>
            <div className="admin-tabs">
              <button className={`admin-tab ${tab === 'pending' ? 'active' : ''}`} onClick={() => setTab('pending')}>Pending ({pending.length})</button>
              <button className={`admin-tab ${tab === 'approved' ? 'active' : ''}`} onClick={() => setTab('approved')}>Approved ({approved.length})</button>
              <button className={`admin-tab ${tab === 'all' ? 'active' : ''}`} onClick={() => setTab('all')}>All ({products.length})</button>
            </div>
          </div>

          {shown.length === 0 && <div className="empty-state"><CheckCircle2 size={32} /><p>Nothing here right now.</p></div>}

          <motion.div variants={list} initial="hidden" animate="show">
            {shown.map((p) => (
              <motion.div variants={item} key={p.id} className="admin-row">
                <div className="admin-row-main">
                  <b>{p.name}</b>
                  <span>{p.passportId} · {p.category} · {p.manufacturer}</span>
                </div>
                <div className="admin-row-actions">
                  <span className={`approval-pill ${p.approved ? 'approved' : 'pending'}`}>
                    {p.approved ? 'Approved' : 'Pending'}
                  </span>
                  {!p.approved ? (
                    <button className="icon-action approve" onClick={() => setApproval(p.id, true)} title="Approve"><Check size={16} /></button>
                  ) : (
                    <button className="icon-action reject" onClick={() => setApproval(p.id, false)} title="Revoke approval"><X size={16} /></button>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        <section className="panel">
          <h2>Registered Users</h2>
          <div className="admin-table">
            <div className="admin-table-head">
              <span>Name</span><span>Email</span><span>Role</span>
            </div>
            {users.map((u) => (
              <div className="admin-table-row" key={u.id}>
                <span>{u.name}</span>
                <span className="muted">{u.email}</span>
                <span className={`role-pill role-${(u.role || '').toLowerCase()}`}>{u.role}</span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}