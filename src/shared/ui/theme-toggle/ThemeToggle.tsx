import { useTheme } from '@/shared/context/hooks/use-theme';
import Button from '../button/Button';
import styles from './theme-toggle.module.scss';
import { Sun, Moon } from 'lucide-react';

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button onClick={toggleTheme} className={styles.toggle}>
      {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
    </Button>
  );
}

export default ThemeToggle;
