import type { ReactNode } from 'react';
import styles from './cards-container.module.scss';
import cx from 'classnames';

interface Props {
  children: ReactNode;
  className?: string;
}

function CardsContainer({ children, className }: Props) {
  return (
    <div className={cx(styles.resultsSection, className)}>
      <div className={styles.cards}>{children}</div>
    </div>
  );
}

export default CardsContainer;
