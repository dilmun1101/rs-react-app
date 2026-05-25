import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import CardWithSelection from './CardWithSelection';
import selectedReducer, {
  selectItem,
} from '@/store/selectedSlice/selectedSlice';
import type { CardItem } from '@/shared/constants/types';

vi.mock('../card/Card', () => ({
  default: ({
    name,
    isSelected,
    onCheckboxChange,
    onCheckboxClick,
  }: {
    name: string;
    isSelected: boolean;
    onCheckboxChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onCheckboxClick?: (event: React.MouseEvent<HTMLInputElement>) => void;
  }) => (
    <div>
      <div>{name}</div>
      <div>{isSelected ? 'selected' : 'not selected'}</div>
      <input
        aria-label="select card"
        type="checkbox"
        checked={isSelected}
        onChange={onCheckboxChange}
        onClick={onCheckboxClick}
      />
    </div>
  ),
}));

const defaultProps: CardItem & { showCheckbox: boolean } = {
  id: '1',
  name: 'Test name',
  description: 'Test description',
  imageUrl: 'test.jpg',
  artist: 'Test artist',
  showCheckbox: true,
};

const createTestStore = () =>
  configureStore({
    reducer: {
      selected: selectedReducer,
    },
  });

const renderComponent = (preselected = false) => {
  const store = createTestStore();

  if (preselected) {
    store.dispatch(selectItem(defaultProps));
  }

  const utils = render(
    <Provider store={store}>
      <CardWithSelection {...defaultProps} />
    </Provider>
  );

  return { store, ...utils };
};

describe('CardWithSelection', () => {
  it('renders card with unselected state', () => {
    renderComponent();

    expect(screen.getByText('Test name')).toBeInTheDocument();
    expect(screen.getByText('not selected')).toBeInTheDocument();
    expect(screen.getByLabelText('select card')).not.toBeChecked();
  });

  it('renders card with selected state', () => {
    renderComponent(true);

    expect(screen.getByText('selected')).toBeInTheDocument();
    expect(screen.getByLabelText('select card')).toBeChecked();
  });

  it('selects card when checkbox becomes checked', async () => {
    renderComponent();

    const user = userEvent.setup();
    const checkbox = screen.getByLabelText('select card');

    await user.click(checkbox);

    expect(screen.getByText('selected')).toBeInTheDocument();
    expect(checkbox).toBeChecked();
  });

  it('unselects card when checkbox becomes unchecked', async () => {
    renderComponent(true);

    const user = userEvent.setup();
    const checkbox = screen.getByLabelText('select card');

    await user.click(checkbox);

    expect(screen.getByText('not selected')).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
  });

  it('stops click propagation from checkbox', async () => {
    const parentClickHandler = vi.fn();
    const store = createTestStore();

    render(
      <Provider store={store}>
        <div onClick={parentClickHandler}>
          <CardWithSelection {...defaultProps} />
        </div>
      </Provider>
    );

    const user = userEvent.setup();
    await user.click(screen.getByLabelText('select card'));

    expect(parentClickHandler).not.toHaveBeenCalled();
  });
});
