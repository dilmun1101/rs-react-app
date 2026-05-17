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
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftStartRef = useRef(0);
  const [searchParams] = useSearchParams();
  const dragDistanceRef = useRef(0);

  const scroll = (direction: 'left' | 'right') => {
    trackRef.current?.scrollBy({
      left:
        direction === 'right'
          ? SLIDER_CONFIG.SCROLL_STEP
          : -SLIDER_CONFIG.SCROLL_STEP,
      behavior: 'smooth',
    });
  };

  const onMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    isDraggingRef.current = true;
    startXRef.current = event.pageX - (trackRef.current?.offsetLeft ?? 0);
    scrollLeftStartRef.current = trackRef.current?.scrollLeft ?? 0;
  };

  const onMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;

    const currentX = event.pageX - (trackRef.current?.offsetLeft ?? 0);
    const distance =
      (currentX - startXRef.current) * SLIDER_CONFIG.DRAG_SCROLL_SPEED;

    if (trackRef.current) {
      trackRef.current.scrollLeft = scrollLeftStartRef.current - distance;
    }
  };

  const stopDrag = () => {
    isDraggingRef.current = false;
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

      <div
        className={styles.track}
        ref={trackRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={stopDrag}
        onMouseLeave={stopDrag}
      >
        {cards.map((card) => (
          <Link
            key={card.id}
            to={`/details/${card.id}?${searchParams.toString()}`}
            className={styles.cardLink}
            onClick={(event) => {
              if (dragDistanceRef.current > 5) event.preventDefault();
            }}
          >
            <Card
              key={card.id}
              id={card.id}
              name={card.name}
              description={card.description}
              imageUrl={card.imageUrl}
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
