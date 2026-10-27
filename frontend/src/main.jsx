import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import './style.css';

import { ThemeProvider } from './components/ThemeContext';
import { ToastProvider } from './components/Toast';
import PageTransition from './components/PageTransition';
import ProtectedRoute from './components/ProtectedRoute';
import Footer from './components/Footer';

import Dashboard from './pages/Dashboard';
import Auth from './pages/Auth';
import AddProduct from './pages/AddProduct';
import Passport from './pages/Passport';
import Consumer from './pages/Consumer';
import ConsumerPassport from './pages/ConsumerPassport';
import NotFound from './pages/NotFound';
import Admin from './pages/Admin';

function wrap(el) { return <PageTransition>{el}</PageTransition>; }

function App() {
  const location = useLocation();
  return (
    <>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={wrap(<Dashboard />)} />
          <Route path="/login" element={wrap(<Auth />)} />
          <Route path="/register" element={wrap(<Auth reg />)} />
          <Route path="/add" element={wrap(<ProtectedRoute><AddProduct /></ProtectedRoute>)} />
          <Route path="/admin" element={wrap(<ProtectedRoute role="ADMIN"><Admin /></ProtectedRoute>)} />
          <Route path="/passport/:id" element={wrap(<Passport />)} />
          <Route path="/consumer" element={wrap(<Consumer />)} />
          <Route path="/consumer/passport/:pid" element={wrap(<ConsumerPassport />)} />
          <Route path="*" element={wrap(<NotFound />)} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </>
  );
}

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ThemeProvider>
      <ToastProvider>
        <App />
      </ToastProvider>
    </ThemeProvider>
  </BrowserRouter>
);