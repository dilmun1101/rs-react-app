import styles from './card.module.scss';
import cx from 'classnames';
import type { ChangeEvent, MouseEvent } from 'react';
import Image from 'next/image';

interface Props {
  id: string;
  name: string;
  description: string;
  artist?: string;
  imageUrl?: string;
  className?: string;
  imageClassName?: string;
  showCheckbox?: boolean;
  isSelected?: boolean;
  onCheckboxChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onCheckboxClick?: (event: MouseEvent<HTMLInputElement>) => void;
}

function Card({
  name,
  description,
  artist,
  imageUrl,
  className,
  imageClassName,
  showCheckbox,
  onCheckboxChange,
  isSelected,
  onCheckboxClick,
}: Props) {
  return (
    <div className={cx(styles.card, className)}>
      {showCheckbox && (
        <input
          type="checkbox"
          className={styles.checkbox}
          checked={isSelected}
          onChange={onCheckboxChange}
          onClick={onCheckboxClick}
        />
      )}
      <p className={styles.title}>{name}</p>
      <div
        data-testid="card-image"
        className={cx(styles.imageWrapper, imageClassName)}
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={name}
            width={300}
            height={300}
            className={styles.image}
          />
        ) : (
          <div className={styles.imagePlaceholder} />
        )}
      </div>
      <p className={styles.info}>{description}</p>
      {artist && <p className={styles.artist}>{artist}</p>}
    </div>
  );
}

export default Card;
