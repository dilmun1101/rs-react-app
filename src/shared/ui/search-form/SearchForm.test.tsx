import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SearchForm from './SearchForm';
import { UI_MESSAGES } from '../../constants/messages';
import userEvent from '@testing-library/user-event';

describe('SearchForm', () => {
  it('renders search input', () => {
    render(<SearchForm defaultValue="" onSearch={vi.fn()} />);

    expect(screen.getByLabelText('search')).toBeInTheDocument();
  });

  it('renders search button', () => {
    render(<SearchForm defaultValue="" onSearch={vi.fn()} />);

    expect(
      screen.getByRole('button', { name: UI_MESSAGES.BUTTON_SEARCH })
    ).toBeInTheDocument();
  });

  it('calls onSearch with trimmed query on form submit', async () => {
    const user = userEvent.setup();
    const handleSearch = vi.fn();

    render(<SearchForm defaultValue="  react  " onSearch={handleSearch} />);

    await user.click(
      screen.getByRole('button', { name: UI_MESSAGES.BUTTON_SEARCH })
    );

    expect(handleSearch).toHaveBeenCalledTimes(1);
    expect(handleSearch).toHaveBeenCalledWith('react');
  });

  it('calls onSearch with empty string when query contains only spaces', async () => {
    const user = userEvent.setup();
    const handleSearch = vi.fn();

    render(<SearchForm defaultValue=" " onSearch={handleSearch} />);

    await user.click(
      screen.getByRole('button', { name: UI_MESSAGES.BUTTON_SEARCH })
    );

    expect(handleSearch).toHaveBeenCalledTimes(1);
    expect(handleSearch).toHaveBeenCalledWith('');
  });
});
