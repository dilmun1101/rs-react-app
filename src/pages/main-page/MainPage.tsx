import SearchForm from '../../shared/ui/search-form/SearchForm';
import CardsContainer from '../../shared/ui/cards-container/CardsContainer';
import { scryfallService } from '../../api/service/scryfall-service';
import { UI_MESSAGES } from '../../shared/constants/messages';
import styles from './main-page.module.scss';
import type { CardItem } from '../../shared/constants/types';
import CardsSkeletonLoader from '../../shared/ui/card-skeleton-loader/CardSkeletonLoader';
import { chunkArrayCards } from '../../shared/utils/chunk-array-cards';
import CardRowSlider from '../../shared/ui/cards-row-slider/CardRowSlider';
import { useEffect, useCallback } from 'react';
import { useSearchParams, useNavigate, Outlet, Link } from 'react-router';
import { useSearchQuerySync } from '../../shared/hooks/useSearchQuerySync';
import { useRedirectInvalidPage } from '../../shared/hooks/useRedirectInvalidPage';
import { useLocalStorage } from '../../shared/hooks/useLocalStorage';
import Pagination from '../../shared/ui/pagination/PaginationControls';
import { LOCAL_STORAGE_KEYS } from '../../shared/constants/local-storage-keys';
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks';
import {
  setItems,
  setIsLoading,
  setError,
  setHasMore,
} from '../../store/slices/cardsSlice';
import {
  selectCards,
  selectError,
  selectHasMore,
  selectIsLoading,
} from '../../store/selectors/selectors';
import SelectionPanel from '@/shared/ui/selection-panel/SelectionPanel';
import ThemeToggle from '@/shared/ui/theme-toggle/ThemeToggle';

const SLIDER_CHUNK_SIZE = 4;

function MainPage() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCards);
  const isLoading = useAppSelector(selectIsLoading);
  const error = useAppSelector(selectError);
  const hasMore = useAppSelector(selectHasMore);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const pageParam = searchParams.get('page');
  const parsedPage = Number(pageParam);
  const isInvalidPage = !Number.isInteger(parsedPage) || parsedPage < 1;
  const currentPage = isInvalidPage ? 1 : parsedPage;
  const currentQuery = searchParams.get('q') ?? '';

  useSearchQuerySync();

  const { setStoredValue: saveSearchQuery } = useLocalStorage(
    LOCAL_STORAGE_KEYS.SEARCH_QUERY,
    ''
  );

  useRedirectInvalidPage({ isInvalidPage, searchParams });

  useEffect(() => {
    if (isInvalidPage) return;
    const fetchCards = async () => {
      dispatch(setIsLoading(true));
      dispatch(setError(null));

      try {
        const response = await scryfallService.searchCards(
          currentQuery,
          currentPage
        );

        dispatch(setItems(response.items));
        dispatch(setHasMore(response.hasMore));
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : UI_MESSAGES.UNKNOWN_ERROR;
        dispatch(setError(errorMessage));
        dispatch(setItems([]));
      } finally {
        dispatch(setIsLoading(false));
      }
    };

    void fetchCards();
  }, [isInvalidPage, currentQuery, currentPage, dispatch]);

  const handleSearch = useCallback(
    (query: string) => {
      saveSearchQuery(query);

      const newParams = new URLSearchParams(searchParams);
      newParams.set('page', '1');

      if (query) {
        newParams.set('q', query);
      } else {
        newParams.delete('q');
      }

      void navigate(`/?${newParams.toString()}`, { replace: true });
    },
    [searchParams, navigate, saveSearchQuery]
  );

  const handleCloseDetails = useCallback(() => {
    const newParams = new URLSearchParams(searchParams);
    void navigate(`/?${newParams.toString()}`, { replace: true });
  }, [searchParams, navigate]);
  const sliderRows = chunkArrayCards<CardItem>(items, SLIDER_CHUNK_SIZE);

  return (
    <main className={styles.mainPage}>
      <div className={styles.topControls}>
        <ThemeToggle />
        <div className={styles.topControlsWrapper}>
          <SearchForm
            key={currentQuery}
            defaultValue={currentQuery}
            onSearch={handleSearch}
          />
          <Link to="/about" className={styles.aboutLink}>
            About
          </Link>
        </div>
      </div>
      <div className={styles.contentArea}>
        <div className={styles.contentAreaWrapper}>
          {error && <div className={styles.errorMessage}>Error: {error}</div>}

          {!error && (
            <>
              {isLoading ? (
                <CardsSkeletonLoader count={SLIDER_CHUNK_SIZE} />
              ) : sliderRows.length > 0 ? (
                <CardsContainer>
                  {sliderRows.map((rowCards, rowIndex) => (
                    <CardRowSlider
                      key={`row-${String(rowIndex)}`}
                      cards={rowCards}
                      rowIndex={rowIndex}
                    />
                  ))}
                </CardsContainer>
              ) : (
                <p>{UI_MESSAGES.NO_RESULTS}</p>
              )}
              {!isLoading && sliderRows.length > 0 && (
                <Pagination hasMore={hasMore} />
              )}
            </>
          )}
        </div>
        <Outlet context={{ onClose: handleCloseDetails }} />
        <SelectionPanel />
      </div>
    </main>
  );
}

export default MainPage;
