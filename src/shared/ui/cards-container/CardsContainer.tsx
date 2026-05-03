import { Component } from 'react';
import type { ReactNode } from 'react';
import styles from './cards-container.module.scss';

interface ICardsContainerProps {
  children: ReactNode;
}

class CardsContainer extends Component<ICardsContainerProps> {
  render() {
    const { children } = this.props;

    return (
      <div className="results-section">
        <div className={styles.cards}>{children}</div>
      </div>
    );
  }
}

export default CardsContainer;
