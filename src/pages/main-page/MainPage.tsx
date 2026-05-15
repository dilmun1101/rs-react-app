import SearchForm from '../../shared/ui/search-form/SearchForm';
import CardsContainer from '../../shared/ui/cards-container/CardsContainer';
import { scryfallService } from '../../api/service/scryfall-service';
import {
  getSavedSearchQuery,
  saveSearchQuery,
} from '../../shared/utils/storage';
import { UI_MESSAGES } from '../../shared/constants/messages';
import styles from './main-page.module.scss';
import type { CardItem } from '../../shared/constants/types';
import ErrorTest from '../../shared/ui/error-test/ErrorTest';
import CardsSkeletonLoader from '../../shared/ui/card-skeleton-loader/CardSkeletonLoader';
import { chunkArrayCards } from '../../shared/utils/chunk-array-cards';
import CardRowSlider from '../../shared/ui/cards-row-slider/CardRowSlider';
import { useState, useEffect, useCallback } from 'react';
import Pagination from '../../shared/ui/pagination/Pagination';
import { useSearchParams, useNavigate } from 'react-router';

function MainPage() {
  const [items, setItems] = useState<CardItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(false);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const currentPage = Number(searchParams.get('page') ?? '1');
  const currentQuery = searchParams.get('q') ?? getSavedSearchQuery();

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
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void fetchData(currentQuery, currentPage);
  }, [fetchData, currentQuery, currentPage]);

  const handleSearch = useCallback(
    (query: string) => {
      saveSearchQuery(query);

      const newParams = new URLSearchParams(searchParams);
      newParams.set('page', '1');
      newParams.set('q', query);
      void navigate(`?${newParams.toString()}`, { replace: true });
    },
    [searchParams, navigate]
  );

  const sliderRows = chunkArrayCards<CardItem>(items, 4);

  return (
    <main className={styles.mainPage}>
      <div className={styles.topControls}>
        <div className={styles.topControlsWrapper}>
          <SearchForm
            defaultValue={getSavedSearchQuery()}
            onSearch={handleSearch}
          />
          <ErrorTest />
        </div>
      </div>
      <div className={styles.contentArea}>
        <div className={styles.contentAreaWrapper}>
          {error && <div className={styles.errorMessage}>Error: {error}</div>}

          {!error && (
            <>
              {isLoading ? (
                <CardsSkeletonLoader count={10} />
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
      </div>
    </main>
  );
}

export default MainPage;
