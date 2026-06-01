import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import RefreshListButton from './RefreshListButton';
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

describe('RefreshListButton', () => {
  const dispatchMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useAppDispatch).mockReturnValue(dispatchMock);
  });

  it('renders button text', () => {
    render(<RefreshListButton onRefetch={vi.fn()} />);

    expect(
      screen.getByRole('button', { name: 'Refresh List' })
    ).toBeInTheDocument();
  });

  it('dispatches invalidateTags and calls onRefetch when button is clicked', async () => {
    const user = userEvent.setup();
    const onRefetch = vi.fn();
    const invalidateTagsAction = { type: 'scryfall/invalidateTags' };

    vi.mocked(scryfallApi.util.invalidateTags).mockReturnValue(
      invalidateTagsAction as never
    );

    render(<RefreshListButton onRefetch={onRefetch} />);

    await user.click(screen.getByRole('button', { name: 'Refresh List' }));

    expect(scryfallApi.util.invalidateTags).toHaveBeenCalledWith(['Cards']);
    expect(dispatchMock).toHaveBeenCalledWith(invalidateTagsAction);
    expect(onRefetch).toHaveBeenCalledTimes(1);
  });
});
