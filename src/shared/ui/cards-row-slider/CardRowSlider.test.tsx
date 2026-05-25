import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import CardRowSlider from './CardRowSlider';
import type { CardItem } from '@/shared/constants/types';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import selectedReducer from '@/store/selectedSlice/selectedSlice';

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

const renderComponent = () => {
  const store = configureStore({
    reducer: {
      selected: selectedReducer,
    },
  });
  return render(
    <Provider store={store}>
      <MemoryRouter>
        <CardRowSlider cards={cards} rowIndex={0} />
      </MemoryRouter>
    </Provider>
  );
};

describe('CardRowSlider', () => {
  it('renders passed cards', () => {
    renderComponent();

    expect(screen.getByText('Card 1')).toBeInTheDocument();
    expect(screen.getByText('Card 2')).toBeInTheDocument();
  });

  it('renders two slider buttons', () => {
    renderComponent();

    expect(screen.getAllByRole('button')).toHaveLength(2);
  });
});
