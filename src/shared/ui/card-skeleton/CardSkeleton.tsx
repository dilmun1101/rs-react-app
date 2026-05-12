import styles from './card-skeleton.module.scss';

function CardSkeleton() {
  return (
    <div data-testid="skeleton-card" className={styles.card}>
      <div className={styles.title} />
      <div className={styles.image} />
      <div data-testid="skeleton-info" className={styles.info}>
        <div className={styles.infoLine} />
        <div className={styles.infoLine} />
        <div className={styles.infoLine} />
        <div className={styles.infoLineShort} />
      </div>
    </div>
  );
}

export default CardSkeleton;
