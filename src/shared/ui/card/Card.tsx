import styles from './card.module.scss';
import cx from 'classnames';
import type { CSSProperties, ChangeEvent, MouseEvent } from 'react';

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
  const backgroundStyle: CSSProperties = {
    backgroundImage: `url(${imageUrl ?? ''})`,
  };

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
        className={cx(styles.image, imageClassName)}
        style={backgroundStyle}
      />
      <p className={styles.info}>{description}</p>
      {artist && <p className={styles.artist}>{artist}</p>}
    </div>
  );
}

export default Card;
