import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import MainPage from './MainPage';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router';
import { useLocalStorage } from '../../shared/hooks/useLocalStorage';
import { useSearchCardsQuery } from '@/api/scryfall-api';
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
  useSearchCardsQuery: vi.fn(),
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

vi.mock('@/shared/ui/main-page-content/MainPageContent', () => ({
  default: ({
    errorMessage,
    isLoading,
    isFetching,
    sliderRows,
    hasMore,
  }: {
    errorMessage: string;
    isLoading: boolean;
    isFetching: boolean;
    sliderRows: unknown[];
    hasMore: boolean;
  }) => (
    <div>
      <div>MainPageContent</div>
      <div>errorMessage:{errorMessage}</div>
      <div>isLoading:{String(isLoading)}</div>
      <div>isFetching:{String(isFetching)}</div>
      <div>hasMore:{String(hasMore)}</div>
      <div>sliderRowsLength:{sliderRows.length}</div>
    </div>
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

    vi.mocked(useSearchCardsQuery).mockReturnValue({
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

  it('renders top-level UI parts', () => {
    renderMainPage();

    expect(screen.getByText('SearchForm')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'About' })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'RefreshListButton' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'ThemeToggle' })
    ).toBeInTheDocument();
    expect(screen.getByText('SelectionPanel')).toBeInTheDocument();
    expect(screen.getByText('MainPageContent')).toBeInTheDocument();
  });

  it('passes query and page from URL to useSearchCardsQuery', () => {
    renderMainPage('/?page=3&q=dragon');

    expect(useSearchCardsQuery).toHaveBeenCalledWith(
      { query: 'dragon', page: 3 },
      { skip: false }
    );
  });

  it('uses page 1 and skips query when page param is invalid', () => {
    renderMainPage('/?page=0&q=elf');

    expect(useSearchCardsQuery).toHaveBeenCalledWith(
      { query: 'elf', page: 1 },
      { skip: true }
    );
  });

  it('passes current query to SearchForm', () => {
    renderMainPage('/?page=1&q=angel');

    expect(screen.getByText('defaultValue:angel')).toBeInTheDocument();
  });

  it('passes error message to MainPageContent', () => {
    vi.mocked(useSearchCardsQuery).mockReturnValue({
      data: undefined,
      isLoading: false,
      isFetching: false,
      error: { status: 500 },
      refetch: refetchMock,
    });

    vi.mocked(getRtkQueryErrorMessage).mockReturnValue('Server error');

    renderMainPage();

    expect(screen.getByText('errorMessage:Server error')).toBeInTheDocument();
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
});
