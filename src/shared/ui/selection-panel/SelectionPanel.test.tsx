import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import SelectionPanel from './SelectionPanel';
import selectedReducer, {
  selectItem,
} from '@/store/selectedSlice/selectedSlice';
import type { CardItem } from '@/shared/constants/types';

vi.mock('../button/Button', () => ({
  default: ({
    children,
    onClick,
    className,
  }: {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
  }) => (
    <button type="button" className={className} onClick={onClick}>
      {children}
    </button>
  ),
}));

vi.mock('@/shared/utils/convert-to-csv', () => ({
  convertToCSV: vi.fn(),
}));

vi.mock('@/shared/utils/download-csv', () => ({
  downloadCsv: vi.fn(),
}));

const selectedCardsMock: CardItem[] = [
  {
    id: '1',
    name: 'Test name 1',
    description: 'Test description 1',
    imageUrl: 'test-1.jpg',
  },
  {
    id: '2',
    name: 'Test name 2',
    description: 'Test description 2',
    imageUrl: 'test-2.jpg',
  },
];

const createTestStore = () =>
  configureStore({
    reducer: {
      selected: selectedReducer,
    },
  });

const renderComponent = (cards: CardItem[] = []) => {
  const store = createTestStore();

  cards.forEach((card) => {
    store.dispatch(selectItem(card));
  });

  const utils = render(
    <Provider store={store}>
      <SelectionPanel />
    </Provider>
  );

  return { store, ...utils };
};

describe('SelectionPanel', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders nothing when no cards are selected', () => {
    const { container } = renderComponent();

    expect(container.firstChild).toBeNull();
  });

  it('renders selected count and buttons', () => {
    renderComponent(selectedCardsMock);

    expect(screen.getByText('Selected: 2 cards')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Unselect all' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Download' })
    ).toBeInTheDocument();
  });
});
