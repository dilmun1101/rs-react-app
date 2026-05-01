import { Component } from 'react';
import Button from '../button/Button';
import type { ReactNode } from 'react';
import { UI_MESSAGES } from '../../constants/messages';

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
            {UI_MESSAGES.BUTTON_PREV}
          </Button>

          <Button onClick={onNextClick} disabled={isNextDisabled}>
            {UI_MESSAGES.BUTTON_NEXT}
          </Button>
        </div>
      </div>
    );
  }
}

export default CardsContainer;
