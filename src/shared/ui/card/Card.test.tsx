import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Card from './Card';
import { MemoryRouter } from 'react-router';

const defaultProps = {
  id: '1',
  name: 'Black magic',
  description: 'One of the most powerful cards in magic.',
  imageUrl: 'https://example.com/black-lotus.jpg',
};

const renderCard = (props: Partial<typeof defaultProps> = {}) => {
  return render(
    <MemoryRouter>
      <Card {...defaultProps} {...props} />
    </MemoryRouter>
  );
};

describe('Card', () => {
  it('renders name and description', () => {
    renderCard();

    expect(screen.getByText(defaultProps.name)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.description)).toBeInTheDocument();
  });

  it('applies background-image when imageUrl is provided', () => {
    renderCard();

    const imageDiv = screen.getByTestId('card-image');
    expect(imageDiv).toHaveStyle(
      `background-image: url(${defaultProps.imageUrl})`
    );
  });

  it('renders empty background-image when imageUrl is not provided', () => {
    renderCard({ imageUrl: undefined });

    const imageDiv = screen.getByTestId('card-image');
    expect(imageDiv).toHaveStyle('background-image: url()');
  });
});
