import axios from 'axios';

const BASE = import.meta.env.VITE_API_URL || 'http://localhost:8081';
export const api = axios.create({ baseURL: BASE + '/api' });
export const API_ORIGIN = BASE;
export function getUser() {
  try { return JSON.parse(localStorage.getItem('user')); } catch { return null; }
}

export function setUser(u) {
  localStorage.setItem('user', JSON.stringify(u));
}

export function logout() {
  localStorage.removeItem('user');
}

export function errMsg(e) {
  return e?.response?.data?.message || e?.message || 'Something went wrong. Please try again.';
}