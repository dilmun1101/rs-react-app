import type { ReactNode } from 'react';
import styles from './cards-container.module.scss';
import cx from 'classnames';

interface ICardsContainerProps {
  children: ReactNode;
  className?: string;
}

function CardsContainer({ children, className }: ICardsContainerProps) {
  return (
    <div className={cx(styles.resultsSection, className)}>
      <div className={styles.cards}>{children}</div>
    </div>
  );
}

export default CardsContainer;
