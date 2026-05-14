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
import Pagination from '../../shared/ui/pagination/pagination';

function MainPage() {
  const [items, setItems] = useState<CardItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

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
    void fetchData(getSavedSearchQuery(), 1);
  }, [fetchData]);

  const handleSearch = useCallback(
    (query: string) => {
      if (query === getSavedSearchQuery()) {
        return;
      }

      saveSearchQuery(query);
      setCurrentPage(1);
      void fetchData(query, 1);
    },
    [fetchData]
  );

  const handlePageChange = useCallback(
    (page: number) => {
      setCurrentPage(page);
      void fetchData(getSavedSearchQuery(), page);
    },
    [fetchData]
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
                <Pagination
                  currentPage={currentPage}
                  hasMore={hasMore}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
}

export default MainPage;
