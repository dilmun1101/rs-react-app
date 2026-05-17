import { Link } from 'react-router';
import styles from './404.module.scss';

function PageNotFound() {
  return (
    <div className={styles.container}>
      <p className={styles.code}>404</p>
      <p className={styles.message}>Page not found</p>
      <Link to="/" className={styles.link}>
        Return to main page
      </Link>
    </div>
  );
}

export default PageNotFound;
