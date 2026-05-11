import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import CardsContainer from './CardsContainer';

describe('CardsContainer', () => {
  it('renders children', () => {
    const testName = 'Card content';

    render(
      <CardsContainer>
        <p>{testName}</p>
      </CardsContainer>
    );

    expect(screen.getByText(testName)).toBeInTheDocument();
  });

  it('renders multiple children', () => {
    const firstCard = 'First card';
    const secondCard = 'Second card';
    const thirdCard = 'Third card';

    render(
      <CardsContainer>
        <p>{firstCard}</p>
        <p>{secondCard}</p>
        <p>{thirdCard}</p>
      </CardsContainer>
    );

    expect(screen.getByText(firstCard)).toBeInTheDocument();
    expect(screen.getByText(secondCard)).toBeInTheDocument();
    expect(screen.getByText(thirdCard)).toBeInTheDocument();
  });
});
