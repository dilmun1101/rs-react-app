import Card from '../card/Card';
import type { CardItem } from '../../constants/types';
import styles from './card-row-slider.module.scss';
import Button from '../button/Button';
import cx from 'classnames';
import { useRef } from 'react';
import { Link, useSearchParams } from 'react-router';

const SLIDER_CONFIG = {
  SCROLL_STEP: 320,
  DRAG_SCROLL_SPEED: 1.5,
} as const;

interface Props {
  cards: CardItem[];
  rowIndex: number;
  className?: string;
}

function CardRowSlider({ cards, className }: Props) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [searchParams] = useSearchParams();

  const scroll = (direction: 'left' | 'right') => {
    trackRef.current?.scrollBy({
      left:
        direction === 'right'
          ? SLIDER_CONFIG.SCROLL_STEP
          : -SLIDER_CONFIG.SCROLL_STEP,
      behavior: 'smooth',
    });
  };

  const scrollRight = () => {
    scroll('right');
  };

  const scrollLeft = () => {
    scroll('left');
  };

  return (
    <div className={cx(styles.row, className)}>
      <Button className={styles.arrow} onClick={scrollLeft}>
        ‹
      </Button>

      <div className={styles.track} ref={trackRef}>
        {cards.map((card) => (
          <Link
            key={card.id}
            to={`/details/${card.id}?${searchParams.toString()}`}
            className={styles.cardLink}
          >
            <Card
              key={card.id}
              id={card.id}
              name={card.name}
              description={card.description}
              imageUrl={card.imageUrl}
              showCheckbox
            />
          </Link>
        ))}
      </div>

      <Button className={styles.arrow} onClick={scrollRight}>
        ›
      </Button>
    </div>
  );
}

export default CardRowSlider;
