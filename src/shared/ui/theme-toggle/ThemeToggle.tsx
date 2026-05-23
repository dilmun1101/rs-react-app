import { useTheme } from '@/shared/context/hooks/use-theme';
import Button from '../button/Button';
import styles from './theme-toggle.module.scss';

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button onClick={toggleTheme} className={styles.toggle}>
      {theme === 'dark' ? 'Light mode' : 'Dark mode'}
    </Button>
  );
}

export default ThemeToggle;
