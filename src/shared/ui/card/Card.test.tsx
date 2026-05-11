import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Card from './Card';

const defaultProps = {
  name: 'Black magic',
  description: 'One of the most powerful cards in magic.',
  imageUrl: 'https://example.com/black-lotus.jpg',
};

describe('Card', () => {
  it('renders name and description', () => {
    render(<Card {...defaultProps} />);

    expect(screen.getByText(defaultProps.name)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.description)).toBeInTheDocument();
  });

  it('applies background-image when imageUrl is provided', () => {
    render(<Card {...defaultProps} />);

    const imageDiv = screen.getByTestId('card-image');
    expect(imageDiv).toHaveStyle(
      `background-image: url(${defaultProps.imageUrl})`
    );
  });

  it('renders empty background-image when imageUrl is not provided', () => {
    render(<Card name="No image card" description="No image here" />);

    const imageDiv = screen.getByTestId('card-image');
    expect(imageDiv).toHaveStyle('background-image: url()');
  });
});
