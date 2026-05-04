import { Component } from 'react';
import type { ReactNode } from 'react';
import styles from './cards-container.module.scss';
import cx from 'classnames';

interface ICardsContainerProps {
  children: ReactNode;
  className?: string;
}

class CardsContainer extends Component<ICardsContainerProps> {
  render() {
    const { children, className } = this.props;

    return (
      <div className="results-section">
        <div className={cx(styles.cards, className)}>{children}</div>
      </div>
    );
  }
}

export default CardsContainer;
