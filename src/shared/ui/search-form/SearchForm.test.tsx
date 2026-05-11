import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SearchForm from './SearchForm';
import { UI_MESSAGES } from '../../constants/messages';
import userEvent from '@testing-library/user-event';

describe('SearchForm', () => {
  it('renders search input', () => {
    render(<SearchForm query="" onQueryChange={vi.fn()} />);

    expect(screen.getByLabelText('search')).toBeInTheDocument();
  });

  it('renders search button', () => {
    render(<SearchForm query="" onQueryChange={vi.fn()} />);

    expect(
      screen.getByRole('button', { name: UI_MESSAGES.BUTTON_SEARCH })
    ).toBeInTheDocument();
  });

  it('calls onQueryChange when user types in search input', async () => {
    const user = userEvent.setup();
    const handleQueryChange = vi.fn();

    render(<SearchForm query="" onQueryChange={handleQueryChange} />);

    const input = screen.getByLabelText('search');
    await user.type(input, 'react');

    expect(handleQueryChange).toHaveBeenCalled();
  });

  it('calls onSearch with trimmed query on form submit', async () => {
    const user = userEvent.setup();
    const handleSearch = vi.fn();

    render(
      <SearchForm
        query="  react  "
        onQueryChange={vi.fn()}
        onSearch={handleSearch}
      />
    );

    await user.click(
      screen.getByRole('button', { name: UI_MESSAGES.BUTTON_SEARCH })
    );

    expect(handleSearch).toHaveBeenCalledTimes(1);
    expect(handleSearch).toHaveBeenCalledWith('react');
  });
});
