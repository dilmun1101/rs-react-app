import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import MainPage from './MainPage';
import { server } from '../../api/test-utils/server';
import { http, HttpResponse } from 'msw';
import { UI_MESSAGES } from '../../shared/constants/messages';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router';
import * as localStorageHook from '../../shared/hooks/useLocalStorage';

const setStoredValueMock = vi.fn();

vi.mock('../../shared/hooks/useLocalStorage', () => ({
  useLocalStorage: vi.fn(),
}));

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

const renderMainPage = (initialEntry = '/?page=1&q=') =>
  render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <Routes>
        <Route path="/" element={<MainPage />}>
          <Route path="details/:id" element={<div>Details page</div>} />
        </Route>
        <Route path="/about" element={<div>About page</div>} />
      </Routes>
    </MemoryRouter>
  );

beforeEach(() => {
  vi.clearAllMocks();

  vi.mocked(localStorageHook.useLocalStorage).mockReturnValue({
    value: '',
    setStoredValue: setStoredValueMock,
    removeStoredValue: vi.fn(),
  });
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('MainPage', () => {
  it('renders fetched cards on mount', async () => {
    renderMainPage();

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

    renderMainPage();

    expect(await screen.findByText(UI_MESSAGES.NO_RESULTS)).toBeInTheDocument();
  });

  it('displays error message when API call fails', async () => {
    server.use(
      http.get('https://api.scryfall.com/cards/search', () =>
        HttpResponse.error()
      )
    );

    renderMainPage();

    expect(await screen.findByText(/Error:/)).toBeInTheDocument();
  });

  it('renders search input on mount', () => {
    renderMainPage();
    expect(screen.getByLabelText('search')).toBeInTheDocument();
  });

  it('shows skeleton while loading', () => {
    renderMainPage();

    expect(screen.getByText('Skeleton')).toBeInTheDocument();
  });

  it('reads search query from URL on mount', () => {
    renderMainPage('/?page=1&q=dragon');
    expect(screen.getByLabelText('search')).toHaveValue('dragon');
  });

  it('saves search query to localStorage when search is submitted', async () => {
    renderMainPage();

    const user = userEvent.setup();
    const input = screen.getByLabelText('search');

    await user.clear(input);
    await user.type(input, 'dragon');
    await user.click(screen.getByRole('button', { name: /search/i }));

    expect(setStoredValueMock).toHaveBeenCalledWith('dragon');
  });

  it('updates input value when user types', async () => {
    renderMainPage();

    const user = userEvent.setup();
    const input = screen.getByLabelText('search');

    await user.type(input, 'elf');

    expect(input).toHaveValue('elf');
  });

  it('fetches new data when search is submitted', async () => {
    renderMainPage();

    const user = userEvent.setup();
    const input = screen.getByLabelText('search');

    await user.clear(input);
    await user.type(input, 'goblin');
    await user.click(screen.getByRole('button', { name: /search/i }));

    expect(await screen.findByText('Avatar')).toBeInTheDocument();
  });
});
