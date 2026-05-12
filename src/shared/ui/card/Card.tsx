import styles from './card.module.scss';
import cx from 'classnames';
import type { CSSProperties } from 'react';

interface ICardProps {
  name: string;
  description: string;
  imageUrl?: string;
  className?: string;
}

function Card({ name, description, imageUrl, className }: ICardProps) {
  const backgroundStyle: CSSProperties = {
    backgroundImage: `url(${imageUrl ?? ''})`,
  };

  return (
    <div className={cx(styles.card, className)}>
      <p className={styles.title}>{name}</p>
      <div
        data-testid="card-image"
        className={styles.image}
        style={backgroundStyle}
      />
      <p className={styles.info}>{description}</p>
    </div>
  );
}

export default Card;
