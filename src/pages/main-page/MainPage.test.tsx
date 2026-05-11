import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import MainPage from './MainPage';
import * as storage from '../../shared/utils/storage';
import { server } from '../../api/msw-mocks/server';
import { http, HttpResponse } from 'msw';
import { UI_MESSAGES } from '../../shared/constants/messages';
import userEvent from '@testing-library/user-event';

vi.mock('../../shared/ui/error-test/ErrorTest', () => ({
  default: () => <div>ErrorTest</div>,
}));

vi.mock('../../shared/ui/card-skeleton-loader/CardSkeletonLoader', () => ({
  default: () => <div>Skeleton</div>,
}));

vi.mock('../../shared/ui/cards-row-slider/CardRowSlider', () => ({
  default: ({
    cards,
  }: {
    cards: {
      id: string;
      name: string;
      description: string;
      imageUrl?: string;
    }[];
  }) => (
    <div>
      {cards.map((card) => (
        <div key={card.id}>{card.name}</div>
      ))}
    </div>
  ),
}));

beforeEach(() => {
  vi.clearAllMocks();
  vi.spyOn(storage, 'getSavedSearchQuery').mockReturnValue('');
  vi.spyOn(storage, 'saveSearchQuery').mockImplementation(() => undefined);
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('MainPage', () => {
  it('renders fetched cards on mount', async () => {
    render(<MainPage />);

    expect(screen.getByLabelText('search')).toBeInTheDocument();

    expect(await screen.findByText('Avatar')).toBeInTheDocument();
  });

  it('renders no results message when api returns empty items', async () => {
    server.use(
      http.get('https://api.scryfall.com/cards/search', () => {
        return HttpResponse.json({
          data: [],
          has_more: false,
          total_cards: 0,
        });
      })
    );

    render(<MainPage />);

    expect(await screen.findByText(UI_MESSAGES.NO_RESULTS)).toBeInTheDocument();
  });

  it('displays error message when API call fails', async () => {
    server.use(
      http.get('https://api.scryfall.com/cards/search', () =>
        HttpResponse.error()
      )
    );

    render(<MainPage />);

    expect(await screen.findByText(/Error:/)).toBeInTheDocument();
  });

  it('renders search input on mount', () => {
    render(<MainPage />);
    expect(screen.getByLabelText('search')).toBeInTheDocument();
  });

  it('shows skeleton while loading', () => {
    render(<MainPage />);

    expect(screen.getByText('Skeleton')).toBeInTheDocument();
  });

  it('reads saved search query from localStorage on mount', () => {
    vi.spyOn(storage, 'getSavedSearchQuery').mockReturnValue('dragon');

    render(<MainPage />);

    expect(screen.getByLabelText('search')).toHaveValue('dragon');
  });

  it('saves search query to localStorage when search is submitted', async () => {
    render(<MainPage />);

    const user = userEvent.setup();
    const input = screen.getByLabelText('search');

    await user.clear(input);
    await user.type(input, 'dragon');
    await user.click(screen.getByRole('button', { name: /search/i }));

    expect(storage.saveSearchQuery).toHaveBeenCalledWith('dragon');
  });

  it('updates input value when user types', async () => {
    render(<MainPage />);

    const user = userEvent.setup();
    const input = screen.getByLabelText('search');

    await user.type(input, 'elf');

    expect(input).toHaveValue('elf');
  });

  it('fetches new data when search is submitted', async () => {
    render(<MainPage />);

    const user = userEvent.setup();
    const input = screen.getByLabelText('search');

    await user.clear(input);
    await user.type(input, 'goblin');
    await user.click(screen.getByRole('button', { name: /search/i }));

    expect(await screen.findByText('Avatar')).toBeInTheDocument();
  });

  it('does not fetch again if same query is submitted', async () => {
    vi.spyOn(storage, 'getSavedSearchQuery').mockReturnValue('dragon');

    render(<MainPage />);

    const user = userEvent.setup();
    const saveSpyCount = vi.spyOn(storage, 'saveSearchQuery');

    await user.click(screen.getByRole('button', { name: /search/i }));

    expect(saveSpyCount).not.toHaveBeenCalled();
  });
});
