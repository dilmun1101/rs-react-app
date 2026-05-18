import SearchForm from '../../shared/ui/search-form/SearchForm';
import CardsContainer from '../../shared/ui/cards-container/CardsContainer';
import { scryfallService } from '../../api/service/scryfall-service';
import { UI_MESSAGES } from '../../shared/constants/messages';
import styles from './main-page.module.scss';
import type { CardItem } from '../../shared/constants/types';
import CardsSkeletonLoader from '../../shared/ui/card-skeleton-loader/CardSkeletonLoader';
import { chunkArrayCards } from '../../shared/utils/chunk-array-cards';
import CardRowSlider from '../../shared/ui/cards-row-slider/CardRowSlider';
import { useState, useEffect, useCallback } from 'react';
import Pagination from '../../shared/ui/pagination/Pagination';
import { useSearchParams, useNavigate, Outlet, Link } from 'react-router';
import { useSearchQuerySync } from '../../shared/hooks/useSearchQuerySync';

const SLIDER_CHUNK_SIZE = 4;

function MainPage() {
  const [items, setItems] = useState<CardItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(false);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const pageParam = searchParams.get('page');
  const parsedPage = Number(pageParam);
  const isInvalidPage = !Number.isInteger(parsedPage) || parsedPage < 1;
  const currentPage = isInvalidPage ? 1 : parsedPage;
  const currentQuery = searchParams.get('q') ?? '';
  const { saveSearchQuery } = useSearchQuerySync();

  const fetchData = useCallback(async (query: string, page: number) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await scryfallService.searchCards(query, page);

      setItems(response.items);
      setHasMore(response.hasMore);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : UI_MESSAGES.UNKNOWN_ERROR;

      setError(errorMessage);
      setItems([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isInvalidPage) return;

    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', '1');
    void navigate(`/?${newParams.toString()}`, { replace: true });
  }, [isInvalidPage, searchParams, navigate]);

  useEffect(() => {
    if (isInvalidPage) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    void fetchData(currentQuery, currentPage);
  }, [isInvalidPage, fetchData, currentQuery, currentPage]);

  const handleSearch = useCallback(
    (query: string) => {
      saveSearchQuery(query);

      const newParams = new URLSearchParams(searchParams);
      newParams.set('page', '1');
      newParams.set('q', query);
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
      </div>
    </main>
  );
}

export default MainPage;
