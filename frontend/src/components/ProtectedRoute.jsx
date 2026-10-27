import React from 'react';
import { Navigate } from 'react-router-dom';
import { getUser } from '../api';

export default function ProtectedRoute({ children, role }) {
  const user = getUser();
  if (!user) return <Navigate to="/login" replace />;
  if (role && user.role !== role) return <Navigate to="/" replace />;
  return children;
}