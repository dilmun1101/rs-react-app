import { Link } from '@/i18n/navigation';
import styles from './page-not-found.module.scss';

function PageNotFound() {
  return (
    <div className={styles.container}>
      <p className={styles.code}>404</p>
      <p className={styles.message}>Page not found</p>
      <Link href="/" className={styles.link}>
        Return to main page
      </Link>
    </div>
  );
}

export default PageNotFound;
