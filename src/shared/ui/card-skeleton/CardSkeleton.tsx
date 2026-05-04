import { Component } from 'react';
import styles from './card-skeleton.module.scss';

class CardSkeleton extends Component {
  render() {
    return (
      <div className={styles.card}>
        <div className={styles.title}></div>
        <div className={styles.image}></div>
        <div className={styles.info}>
          <div className={styles.infoLine}></div>
          <div className={styles.infoLine}></div>
          <div className={styles.infoLine}></div>
          <div className={styles.infoLineShort}></div>
        </div>
      </div>
    );
  }
}

export default CardSkeleton;
