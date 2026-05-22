import styles from './card.module.scss';
import cx from 'classnames';
import type { CSSProperties } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks/hooks';
import { selectItem, unselectItem } from '../../../store/slices/selectedSlice';
import type { CardItem } from '../../constants/types';
import { selectSelectedCards } from '../../../store/selectors/selectors';

interface Props {
  id: string;
  name: string;
  description: string;
  artist?: string;
  imageUrl?: string;
  className?: string;
  showArtist?: boolean;
  imageClassName?: string;
  showCheckbox?: boolean;
}

function Card({
  id,
  name,
  description,
  artist,
  imageUrl,
  className,
  showArtist,
  imageClassName,
  showCheckbox = false,
}: Props) {
  const backgroundStyle: CSSProperties = {
    backgroundImage: `url(${imageUrl ?? ''})`,
  };

  const dispatch = useAppDispatch();
  const selectedCards = useAppSelector(selectSelectedCards);
  const isSelected = selectedCards.some((item) => item.id === id);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    if (event.target.checked) {
      const card: CardItem = { id, name, description, imageUrl };
      dispatch(selectItem(card));
    } else {
      dispatch(unselectItem(id));
    }
  };

  const artistElement =
    showArtist && artist ? <p className={styles.artist}>{artist}</p> : null;

  return (
    <div className={cx(styles.card, className)}>
      {showCheckbox && (
        <input
          type="checkbox"
          className={styles.checkbox}
          checked={isSelected}
          onChange={handleCheckboxChange}
          onClick={(e) => {
            e.stopPropagation();
          }}
        />
      )}
      <p className={styles.title}>{name}</p>
      <div
        data-testid="card-image"
        className={cx(styles.image, imageClassName)}
        style={backgroundStyle}
      />
      <p className={styles.info}>{description}</p>
      {artistElement}
    </div>
  );
}

export default Card;
