import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Leaf, Loader2, Mail, Lock, User as UserIcon } from 'lucide-react';
import { api, setUser, errMsg } from '../api';
import { useToast } from '../components/Toast';

export default function Auth({ reg = false }) {
  const [f, setF] = useState({ name: '', email: '', password: '', role: 'MANUFACTURER' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const submit = async (e) => {
    e.preventDefault();
    if (!f.email || !f.password || (reg && !f.name)) {
      toast('Please fill in all required fields.', 'error');
      return;
    }
    setLoading(true);
    try {
      const r = await api.post(`/auth/${reg ? 'register' : 'login'}`, f);
      if (!reg) {
        setUser(r.data);
        toast(`Welcome back, ${r.data.name}!`, 'success');
        navigate('/');
      } else {
        toast('Account created — please log in.', 'success');
        navigate('/login');
      }
    } catch (err) {
      toast(errMsg(err), 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth">
      <form className="auth-card" onSubmit={submit}>
        <div className="auth-logo"><Leaf size={26} /></div>
        <h1>{reg ? 'Create your account' : 'Welcome back'}</h1>
        <p className="auth-sub">{reg ? 'Start tracking sustainable products today.' : 'Log in to manage your EcoPassports.'}</p>

        {reg && (
          <label className="input-icon">
            <UserIcon size={16} />
            <input placeholder="Full name" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} />
          </label>
        )}
        <label className="input-icon">
          <Mail size={16} />
          <input placeholder="Email address" type="email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} />
        </label>
        <label className="input-icon">
          <Lock size={16} />
          <input placeholder="Password" type="password" value={f.password} onChange={(e) => setF({ ...f, password: e.target.value })} />
        </label>
        {reg && (
          <label>
            <span className="field-label">Account type</span>
            <select value={f.role} onChange={(e) => setF({ ...f, role: e.target.value })}>
              <option value="MANUFACTURER">Manufacturer</option>
              <option value="CONSUMER">Consumer</option>
              <option value="ADMIN">Admin</option>
            </select>
          </label>
        )}
        <button disabled={loading}>{loading ? <Loader2 className="spin" size={18} /> : reg ? 'Create account' : 'Login'}</button>
        <p className="auth-switch">
          {reg ? 'Already have an account? ' : 'New here? '}
          <Link to={reg ? '/login' : '/register'}>{reg ? 'Login' : 'Register'}</Link>
        </p>
      </form>
    </div>
  );
}
