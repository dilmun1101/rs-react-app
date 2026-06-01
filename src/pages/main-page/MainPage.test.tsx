import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import MainPage from './MainPage';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router';
import { useLocalStorage } from '../../shared/hooks/useLocalStorage';
import { useGetAllCardsQuery } from '@/api/scryfall-api';
import { getRtkQueryErrorMessage } from '@/api/utils/rtk-query-error';

const setStoredValueMock = vi.fn();
const navigateMock = vi.fn();
const refetchMock = vi.fn();

let submittedQuery = 'test';

vi.mock('react-router', async () => {
  const actual =
    await vi.importActual<typeof import('react-router')>('react-router');

  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

vi.mock('../../shared/hooks/useLocalStorage', () => ({
  useLocalStorage: vi.fn(),
}));

vi.mock('../../shared/hooks/useSearchQuerySync', () => ({
  useSearchQuerySync: vi.fn(),
}));

vi.mock('../../shared/hooks/useRedirectInvalidPage', () => ({
  useRedirectInvalidPage: vi.fn(),
}));

vi.mock('@/api/scryfall-api', () => ({
  useGetAllCardsQuery: vi.fn(),
}));

vi.mock('@/api/utils/rtk-query-error', () => ({
  getRtkQueryErrorMessage: vi.fn(),
}));

vi.mock('../../shared/ui/search-form/SearchForm', () => ({
  default: ({
    defaultValue,
    onSearch,
  }: {
    defaultValue: string;
    onSearch: (query: string) => void;
  }) => (
    <div>
      <div>SearchForm</div>
      <div>defaultValue:{defaultValue}</div>
      <button
        type="button"
        onClick={() => {
          onSearch(submittedQuery);
        }}
      >
        Submit search
      </button>
    </div>
  ),
}));

vi.mock('@/shared/ui/content-state/ContentState', () => ({
  default: ({
    errorMessage,
    isLoadingState,
    children,
  }: {
    errorMessage: string | null;
    isLoadingState: boolean;
    children?: React.ReactNode;
  }) => (
    <div>
      <div>ContentState</div>
      <div>errorMessage:{errorMessage ?? ''}</div>
      <div>isLoadingState:{String(isLoadingState)}</div>
      {children}
    </div>
  ),
}));

vi.mock('@/shared/ui/cards-container/CardsContainer', () => ({
  default: ({ children }: { children?: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

vi.mock('@/shared/ui/cards-row-slider/CardRowSlider', () => ({
  default: ({ rowIndex, cards }: { rowIndex: number; cards: unknown[] }) => (
    <div>
      row:{rowIndex}
      cards:{cards.length}
    </div>
  ),
}));

vi.mock('@/shared/ui/pagination/PaginationControls', () => ({
  default: ({ hasMore }: { hasMore: boolean }) => (
    <div>Pagination hasMore:{String(hasMore)}</div>
  ),
}));

vi.mock('@/shared/ui/refresh-list-button/RefreshListButton', () => ({
  default: ({ onRefetch }: { onRefetch: () => void }) => (
    <button type="button" onClick={onRefetch}>
      RefreshListButton
    </button>
  ),
}));

vi.mock('@/shared/ui/theme-toggle/ThemeToggle', () => ({
  default: () => <button type="button">ThemeToggle</button>,
}));

vi.mock('@/shared/ui/selection-panel/SelectionPanel', () => ({
  default: () => <div>SelectionPanel</div>,
}));

function OutletReader() {
  return <div>OutletContent</div>;
}

const renderMainPage = (initialEntry = '/?page=1&q=') => {
  render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <Routes>
        <Route path="/" element={<MainPage />}>
          <Route path="details/:id" element={<OutletReader />} />
        </Route>
        <Route path="/about" element={<div>About page</div>} />
      </Routes>
    </MemoryRouter>
  );
};

describe('MainPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    submittedQuery = 'dragon';

    vi.mocked(useLocalStorage).mockReturnValue({
      value: '',
      setStoredValue: setStoredValueMock,
      removeStoredValue: vi.fn(),
    });

    vi.mocked(getRtkQueryErrorMessage).mockReturnValue('');

    vi.mocked(useGetAllCardsQuery).mockReturnValue({
      data: {
        items: [],
        hasMore: false,
      },
      isLoading: false,
      isFetching: false,
      error: undefined,
      refetch: refetchMock,
    });
  });

  it('passes query and page from URL to useGetAllCardsQuery', () => {
    renderMainPage('/?page=3&q=dragon');

    expect(useGetAllCardsQuery).toHaveBeenCalledWith(
      { query: 'dragon', page: 3 },
      { skip: false }
    );
  });

  it('uses page 1 and skips query when page param is invalid', () => {
    renderMainPage('/?page=0&q=elf');

    expect(useGetAllCardsQuery).toHaveBeenCalledWith(
      { query: 'elf', page: 1 },
      { skip: true }
    );
  });

  it('passes current query to SearchForm', () => {
    renderMainPage('/?page=1&q=angel');

    expect(screen.getByText('defaultValue:angel')).toBeInTheDocument();
  });

  it('saves query and navigates on search submit', async () => {
    renderMainPage('/?page=3&q=old');

    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: 'Submit search' }));

    expect(setStoredValueMock).toHaveBeenCalledWith('dragon');
    expect(navigateMock).toHaveBeenCalledWith('/?page=1&q=dragon', {
      replace: true,
    });
  });

  it('removes q param when submitted query is empty', async () => {
    submittedQuery = '';

    renderMainPage('/?page=3&q=old');

    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: 'Submit search' }));

    expect(setStoredValueMock).toHaveBeenCalledWith('');
    expect(navigateMock).toHaveBeenCalledWith('/?page=1', {
      replace: true,
    });
  });

  it('calls refetch when refresh button is clicked', async () => {
    renderMainPage();

    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: 'RefreshListButton' }));

    expect(refetchMock).toHaveBeenCalledTimes(1);
  });

  it('passes loading state to ContentState', () => {
    vi.mocked(useGetAllCardsQuery).mockReturnValue({
      data: {
        items: [],
        hasMore: false,
      },
      isLoading: true,
      isFetching: false,
      error: undefined,
      refetch: refetchMock,
    });

    renderMainPage();

    expect(screen.getByText('ContentState')).toBeInTheDocument();
    expect(screen.getByText('isLoadingState:true')).toBeInTheDocument();
  });

  it('passes error message to ContentState', () => {
    vi.mocked(getRtkQueryErrorMessage).mockReturnValue('Test error message');

    renderMainPage();

    expect(screen.getByText('ContentState')).toBeInTheDocument();
    expect(
      screen.getByText('errorMessage:Test error message')
    ).toBeInTheDocument();
  });
});
