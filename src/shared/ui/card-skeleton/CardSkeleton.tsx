import { Component } from 'react';
import styles from './card-skeleton.module.scss';

class CardSkeleton extends Component {
  render() {
    return (
      <div className={styles.card}>
        <div className={styles.title} />
        <div className={styles.image} />
        <div className={styles.info}>
          <div className={styles.infoLine} />
          <div className={styles.infoLine} />
          <div className={styles.infoLine} />
          <div className={styles.infoLineShort} />
        </div>
      </div>
    );
  }
}

export default CardSkeleton;
