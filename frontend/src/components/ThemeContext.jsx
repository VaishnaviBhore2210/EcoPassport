import React, { createContext, useContext, useEffect, useState } from 'react';

const Ctx = createContext({ dark: false, toggle: () => {} });
export const useTheme = () => useContext(Ctx);

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(() => localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  return <Ctx.Provider value={{ dark, toggle: () => setDark((d) => !d) }}>{children}</Ctx.Provider>;
}
