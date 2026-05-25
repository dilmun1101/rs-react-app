import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route, Outlet } from 'react-router';
import CardDetails from './CardDetails';
import { scryfallService } from '../../api/service/scryfall-service';
import type { CardItem } from '../../shared/constants/types';

const onCloseMock = vi.fn();

vi.mock('../../shared/ui/button/Button', () => ({
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

vi.mock('../../shared/ui/card-skeleton/CardSkeleton', () => ({
  default: () => <div>CardSkeleton</div>,
}));

vi.mock('../../shared/ui/card/Card', () => ({
  default: ({
    name,
    description,
    artist,
  }: {
    name: string;
    description: string;
    artist?: string;
  }) => (
    <div>
      <div>{name}</div>
      <div>{description}</div>
      {artist ? <div>{artist}</div> : null}
    </div>
  ),
}));

function OutletWrapper() {
  return <Outlet context={{ onClose: onCloseMock }} />;
}

const renderComponent = (initialEntry = '/details/123') =>
  render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <Routes>
        <Route element={<OutletWrapper />}>
          <Route path="/details/:cardId" element={<CardDetails />} />
        </Route>
      </Routes>
    </MemoryRouter>
  );

const cardMock: CardItem = {
  id: '123',
  name: 'Test name',
  description: 'Test description',
  imageUrl: 'test.jpg',
  artist: 'Test artist',
};

describe('CardDetails', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders fetched card details', async () => {
    vi.spyOn(scryfallService, 'getCardById').mockResolvedValue(cardMock);

    renderComponent();

    expect(await screen.findByText('Test name')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
    expect(screen.getByText('Test artist')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', async () => {
    vi.spyOn(scryfallService, 'getCardById').mockResolvedValue(cardMock);

    renderComponent();

    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: 'X' }));

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it('calls service with card id from params', async () => {
    const getCardByIdSpy = vi
      .spyOn(scryfallService, 'getCardById')
      .mockResolvedValue(cardMock);

    renderComponent('/details/999');

    await waitFor(() => {
      expect(getCardByIdSpy).toHaveBeenCalledWith('999');
    });
  });
});
