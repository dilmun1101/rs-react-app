import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import CardsContainer from './CardsContainer';

describe('CardsContainer', () => {
  it('renders children', () => {
    render(
      <CardsContainer>
        <p>Card content</p>
      </CardsContainer>
    );

    expect(screen.getByText('Card content')).toBeInTheDocument();
  });

  it('renders multiple children', () => {
    render(
      <CardsContainer>
        <p>First card</p>
        <p>Second card</p>
        <p>Third card</p>
      </CardsContainer>
    );

    expect(screen.getByText('First card')).toBeInTheDocument();
    expect(screen.getByText('Second card')).toBeInTheDocument();
    expect(screen.getByText('Third card')).toBeInTheDocument();
  });
});
