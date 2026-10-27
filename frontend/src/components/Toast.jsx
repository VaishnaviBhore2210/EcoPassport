import React, { createContext, useCallback, useContext, useState } from 'react';
import { CheckCircle2, XCircle, Info, X } from 'lucide-react';

const ToastCtx = createContext(() => {});
export const useToast = () => useContext(ToastCtx);

const ICONS = {
  success: <CheckCircle2 size={18} />,
  error: <XCircle size={18} />,
  info: <Info size={18} />,
};

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const push = useCallback((message, type = 'info') => {
    const id = Math.random().toString(36).slice(2);
    setToasts((t) => [...t, { id, message, type }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 4000);
  }, []);

  const dismiss = (id) => setToasts((t) => t.filter((x) => x.id !== id));

  return (
    <ToastCtx.Provider value={push}>
      {children}
      <div className="toast-stack">
        {toasts.map((t) => (
          <div key={t.id} className={`toast toast-${t.type}`}>
            {ICONS[t.type]}
            <span>{t.message}</span>
            <button className="toast-close" onClick={() => dismiss(t.id)}><X size={14} /></button>
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}
