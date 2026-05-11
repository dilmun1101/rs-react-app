import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import CardRowSlider from './CardRowSlider';
import type { CardItem } from '../../constants/types';

vi.mock('../card/Card', () => ({
  default: ({ name }: { name: string }) => <div>{name}</div>,
}));

vi.mock('../button/Button', () => ({
  default: ({
    children,
    onClick,
  }: {
    children: React.ReactNode;
    onClick?: () => void;
  }) => (
    <button type="button" onClick={onClick}>
      {children}
    </button>
  ),
}));

const cards: CardItem[] = [
  {
    id: '1',
    name: 'Card 1',
    description: 'Description 1',
    imageUrl: 'image1.jpg',
  },
  {
    id: '2',
    name: 'Card 2',
    description: 'Description 2',
    imageUrl: 'image2.jpg',
  },
];

describe('CardRowSlider', () => {
  it('renders passed cards', () => {
    render(<CardRowSlider cards={cards} rowIndex={0} />);

    expect(screen.getByText('Card 1')).toBeInTheDocument();
    expect(screen.getByText('Card 2')).toBeInTheDocument();
  });

  it('renders two slider buttons', () => {
    render(<CardRowSlider cards={cards} rowIndex={0} />);

    expect(screen.getAllByRole('button')).toHaveLength(2);
  });
});
