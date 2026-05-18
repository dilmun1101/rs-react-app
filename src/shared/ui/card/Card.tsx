import styles from './card.module.scss';
import cx from 'classnames';
import type { CSSProperties } from 'react';
import { useSearchParams, useNavigate } from 'react-router';

interface Props {
  id: string;
  name: string;
  description: string;
  artist?: string;
  imageUrl?: string;
  className?: string;
  showArtist?: boolean;
  imageClassName?: string;
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
}: Props) {
  const backgroundStyle: CSSProperties = {
    backgroundImage: `url(${imageUrl ?? ''})`,
  };
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleClick = () => {
    const newParams = new URLSearchParams(searchParams);
    void navigate(`/details/${id}?${newParams.toString()}`);
  };

  const artistElement =
    showArtist && artist ? <p className={styles.artist}>{artist}</p> : null;

  return (
    <div className={cx(styles.card, className)} onClick={handleClick}>
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
