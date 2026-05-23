import { useEffect, useState } from 'react';
import { ThemeContext } from './hooks/use-theme';
import type { Theme } from './hooks/use-theme';

interface Props {
  children: React.ReactNode;
}

function ThemeProvider({ children }: Props) {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = (): void => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return <ThemeContext value={{ theme, toggleTheme }}>{children}</ThemeContext>;
}

export default ThemeProvider;
