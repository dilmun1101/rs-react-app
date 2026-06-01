import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import RefreshDetailsButton from './RefreshDetailsButton';
import { useAppDispatch } from '@/store/hooks/hooks';
import { scryfallApi } from '@/api/scryfall-api';

vi.mock('@/store/hooks/hooks', () => ({
  useAppDispatch: vi.fn(),
}));

vi.mock('@/api/scryfall-api', () => ({
  scryfallApi: {
    util: {
      invalidateTags: vi.fn(),
    },
  },
}));

describe('RefreshDetailsButton', () => {
  const dispatchMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useAppDispatch).mockReturnValue(dispatchMock);
  });

  it('renders button text', () => {
    render(<RefreshDetailsButton cardId="card-1" onRefetch={vi.fn()} />);

    expect(
      screen.getByRole('button', { name: 'Refresh details' })
    ).toBeInTheDocument();
  });

  it('dispatches invalidateTags and calls onRefetch when button is clicked', async () => {
    const user = userEvent.setup();
    const onRefetch = vi.fn();
    const invalidateTagsAction = { type: 'scryfall/invalidateTags' };

    vi.mocked(scryfallApi.util.invalidateTags).mockReturnValue(
      invalidateTagsAction as never
    );

    render(<RefreshDetailsButton cardId="card-1" onRefetch={onRefetch} />);

    await user.click(screen.getByRole('button', { name: 'Refresh details' }));

    expect(scryfallApi.util.invalidateTags).toHaveBeenCalledWith([
      { type: 'Card', id: 'card-1' },
    ]);
    expect(dispatchMock).toHaveBeenCalledWith(invalidateTagsAction);
    expect(onRefetch).toHaveBeenCalledTimes(1);
  });
});
