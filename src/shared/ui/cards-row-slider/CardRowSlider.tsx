import { Component, createRef } from 'react';
import Card from '../card/Card';
import type { CardItem } from '../../constants/types';
import styles from './card-row-slider.module.scss';
import Button from '../button/Button';
import cx from 'classnames';

const SLIDER_CONFIG = {
  SCROLL_STEP: 320,
  DRAG_SCROLL_SPEED: 1.5,
} as const;

interface ICardRowProps {
  cards: CardItem[];
  rowIndex: number;
  className?: string;
}

class CardRowSlider extends Component<ICardRowProps> {
  private trackRef = createRef<HTMLDivElement>();
  private isDragging = false;
  private startX = 0;
  private scrollLeftStart = 0;

  scroll = (direction: 'left' | 'right') => {
    this.trackRef.current?.scrollBy({
      left:
        direction === 'right'
          ? SLIDER_CONFIG.SCROLL_STEP
          : -SLIDER_CONFIG.SCROLL_STEP,
      behavior: 'smooth',
    });
  };

  onMouseDown = (event: React.MouseEvent) => {
    this.isDragging = true;
    this.startX = event.pageX - (this.trackRef.current?.offsetLeft ?? 0);
    this.scrollLeftStart = this.trackRef.current?.scrollLeft ?? 0;
  };

  onMouseMove = (event: React.MouseEvent) => {
    if (!this.isDragging) return;
    const currentX = event.pageX - (this.trackRef.current?.offsetLeft ?? 0);
    const distance = (currentX - this.startX) * SLIDER_CONFIG.DRAG_SCROLL_SPEED;
    if (this.trackRef.current) {
      this.trackRef.current.scrollLeft = this.scrollLeftStart - distance;
    }
  };

  stopDrag = () => {
    this.isDragging = false;
  };

  scrollRight = () => {
    this.scroll('right');
  };

  scrollLeft = () => {
    this.scroll('left');
  };

  render() {
    const { cards, className } = this.props;

    return (
      <div className={cx(styles.row, className)}>
        <Button className={styles.arrow} onClick={this.scrollLeft}>
          ‹
        </Button>
        <div
          className={styles.track}
          ref={this.trackRef}
          onMouseDown={this.onMouseDown}
          onMouseMove={this.onMouseMove}
          onMouseUp={this.stopDrag}
          onMouseLeave={this.stopDrag}
        >
          {cards.map((card: CardItem) => (
            <Card
              key={card.id}
              name={card.name}
              description={card.description}
              imageUrl={card.imageUrl}
            />
          ))}
        </div>
        <Button className={styles.arrow} onClick={this.scrollRight}>
          ›
        </Button>
      </div>
    );
  }
}

export default CardRowSlider;
