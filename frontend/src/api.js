import axios from 'axios';

export const api = axios.create({ baseURL: 'http://localhost:8081/api' });
export const API_ORIGIN = 'http://localhost:8081';
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
