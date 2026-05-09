import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SearchForm from './SearchForm';
import { UI_MESSAGES } from '../../constants/messages';

describe('SearchForm', () => {
  it('calls onQueryChange when user types in search input', () => {
    const handleQueryChange = vi.fn();

    render(<SearchForm query="" onQueryChange={handleQueryChange} />);

    const input = screen.getByLabelText('search');
    expect(input).toBeInTheDocument();

    fireEvent.change(input, { target: { value: 'react' } });

    expect(handleQueryChange).toHaveBeenCalledTimes(1);
    expect(handleQueryChange).toHaveBeenCalledWith('react');
  });

  it('calls onSearch with trimmed query on form submit', () => {
    const handleSearch = vi.fn();

    render(
      <SearchForm
        query="  react  "
        onQueryChange={vi.fn()}
        onSearch={handleSearch}
      />
    );

    fireEvent.click(
      screen.getByRole('button', { name: UI_MESSAGES.BUTTON_SEARCH })
    );

    expect(handleSearch).toHaveBeenCalledTimes(1);
    expect(handleSearch).toHaveBeenCalledWith('react');
  });
});
