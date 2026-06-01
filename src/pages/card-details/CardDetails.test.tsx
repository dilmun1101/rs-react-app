import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route, Outlet } from 'react-router';
import CardDetails from './CardDetails';
import type { CardItem } from '../../shared/constants/types';
import { useGetCardByIdQuery } from '@/api/scryfall-api';
import { getRtkQueryErrorMessage } from '@/api/utils/rtk-query-error';

const onCloseMock = vi.fn();
const refetchMock = vi.fn();

vi.mock('@/api/scryfall-api', () => ({
  useGetCardByIdQuery: vi.fn(),
}));

vi.mock('@/api/utils/rtk-query-error', () => ({
  getRtkQueryErrorMessage: vi.fn(),
}));

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

vi.mock('@/shared/ui/content-state/ContentState', () => ({
  default: ({
    errorMessage,
    isLoadingState,
    skeletonCount,
    children,
  }: {
    errorMessage: string | null;
    isLoadingState: boolean;
    skeletonCount?: number;
    children?: React.ReactNode;
  }) => (
    <div>
      <div>ContentState</div>
      <div>errorMessage:{errorMessage ?? ''}</div>
      <div>isLoadingState:{String(isLoadingState)}</div>
      <div>skeletonCount:{String(skeletonCount)}</div>
      {children}
    </div>
  ),
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

vi.mock('@/shared/ui/refresh-details-button/RefreshDetailsButton', () => ({
  default: ({
    onRefetch,
    cardId,
  }: {
    onRefetch: () => void;
    cardId: string;
  }) => (
    <button type="button" onClick={onRefetch}>
      Refresh {cardId}
    </button>
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

    vi.mocked(getRtkQueryErrorMessage).mockReturnValue('');

    vi.mocked(useGetCardByIdQuery).mockReturnValue({
      data: undefined,
      isLoading: false,
      isFetching: false,
      error: undefined,
      refetch: refetchMock,
    });
  });

  it('renders fetched card details', async () => {
    vi.mocked(useGetCardByIdQuery).mockReturnValue({
      data: cardMock,
      isLoading: false,
      isFetching: false,
      error: undefined,
      refetch: refetchMock,
    });

    renderComponent();

    expect(await screen.findByText('Test name')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
    expect(screen.getByText('Test artist')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', async () => {
    vi.mocked(useGetCardByIdQuery).mockReturnValue({
      data: undefined,
      isLoading: false,
      isFetching: false,
      error: undefined,
      refetch: refetchMock,
    });
    renderComponent();

    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: 'X' }));

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it('calls hook with card id from params', () => {
    renderComponent('/details/999');

    expect(useGetCardByIdQuery).toHaveBeenCalledWith('999', {
      skip: false,
    });
  });

  it('renders refresh button when cardId exists', () => {
    renderComponent('/details/999');

    expect(
      screen.getByRole('button', { name: 'Refresh 999' })
    ).toBeInTheDocument();
  });

  it('calls refetch when refresh button is clicked', async () => {
    vi.mocked(useGetCardByIdQuery).mockReturnValue({
      data: cardMock,
      isLoading: false,
      error: undefined,
      refetch: refetchMock,
    });

    renderComponent('/details/123');

    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: 'Refresh 123' }));

    expect(refetchMock).toHaveBeenCalledTimes(1);
  });

  it('passes loading state to ContentState', () => {
    vi.mocked(useGetCardByIdQuery).mockReturnValue({
      data: cardMock,
      isLoading: true,
      isFetching: false,
      error: undefined,
      refetch: refetchMock,
    });

    renderComponent();

    expect(screen.getByText('ContentState')).toBeInTheDocument();
    expect(screen.getByText('isLoadingState:true')).toBeInTheDocument();
    expect(screen.getByText('skeletonCount:1')).toBeInTheDocument();
  });
});
