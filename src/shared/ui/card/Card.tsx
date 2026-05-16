import styles from './card.module.scss';
import cx from 'classnames';
import type { CSSProperties } from 'react';
import { useSearchParams, useNavigate } from 'react-router';

interface ICardProps {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  className?: string;
}

function Card({ id, name, description, imageUrl, className }: ICardProps) {
  const backgroundStyle: CSSProperties = {
    backgroundImage: `url(${imageUrl ?? ''})`,
  };
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleClick = () => {
    const newParams = new URLSearchParams(searchParams);
    void navigate(`/details/${id}?${newParams.toString()}`);
  };

  return (
    <div className={cx(styles.card, className)} onClick={handleClick}>
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
