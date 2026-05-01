import { Component } from 'react';
import Button from '../button/Button';
import type { ReactNode } from 'react';

interface ICardsContainerProps {
  children: ReactNode;
  onNextClick: () => void;
  onPrevClick: () => void;
  isPrevDisabled?: boolean;
  isNextDisabled?: boolean;
}

class CardsContainer extends Component<ICardsContainerProps> {
  render() {
    const {
      children,
      onNextClick,
      onPrevClick,
      isPrevDisabled,
      isNextDisabled,
    } = this.props;

    return (
      <div className="results-section">
        <div className="cards">{children}</div>
        <div className="pagination-controls">
          <Button onClick={onPrevClick} disabled={isPrevDisabled}>
            Previous
          </Button>

          <Button onClick={onNextClick} disabled={isNextDisabled}>
            Next
          </Button>
        </div>
      </div>
    );
  }
}

export default CardsContainer;
