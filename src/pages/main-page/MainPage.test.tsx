import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import MainPage from './MainPage';
import * as storage from '../../shared/utils/storage';
import { server } from '../../api/msw-mocks/server';
import { http, HttpResponse } from 'msw';
import { UI_MESSAGES } from '../../shared/constants/messages';

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
});
