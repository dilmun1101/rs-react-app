import SearchForm from '../../shared/ui/search-form/SearchForm';
import styles from './main-page.module.scss';
import type { CardItem } from '../../shared/constants/types';
import { chunkArrayCards } from '../../shared/utils/chunk-array-cards/chunk-array-cards';
import { useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Link } from '@/i18n/navigation';
import { useSearchQuerySync } from '../../shared/hooks/useSearchQuerySync';
import { useRedirectInvalidPage } from '../../shared/hooks/useRedirectInvalidPage';
import { useLocalStorage } from '../../shared/hooks/useLocalStorage';
import { LOCAL_STORAGE_KEYS } from '../../shared/constants/local-storage-keys';

import SelectionPanel from '@/shared/ui/selection-panel/SelectionPanel';
import ThemeToggle from '@/shared/ui/theme-toggle/ThemeToggle';
import { useGetAllCardsQuery } from '@/api/scryfall-api';
import { getRtkQueryErrorMessage } from '@/api/utils/rtk-query-error';
import RefreshListButton from '@/shared/ui/refresh-list-button/RefreshListButton';
import ContentState from '@/shared/ui/content-state/ContentState';
import CardsContainer from '@/shared/ui/cards-container/CardsContainer';
import CardRowSlider from '@/shared/ui/cards-row-slider/CardRowSlider';
import Pagination from '@/shared/ui/pagination/PaginationControls';

const SLIDER_CHUNK_SIZE = 4;

function MainPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const pageParam = searchParams?.get('page') ?? null;
  const parsedPage = Number(pageParam);
  const isInvalidPage = !Number.isInteger(parsedPage) || parsedPage < 1;
  const currentPage = isInvalidPage ? 1 : parsedPage;
  const currentQuery = searchParams?.get('q') ?? '';

  useSearchQuerySync();

  const { setStoredValue: saveSearchQuery } = useLocalStorage(
    LOCAL_STORAGE_KEYS.SEARCH_QUERY,
    ''
  );

  useRedirectInvalidPage({ isInvalidPage, searchParams });

  const { data, isLoading, isFetching, error, refetch } = useGetAllCardsQuery(
    { query: currentQuery, page: currentPage },
    { skip: isInvalidPage }
  );

  const items = data?.items ?? [];
  const hasMore = data?.hasMore ?? false;
  const errorMessage = getRtkQueryErrorMessage(error);

  const handleSearch = useCallback(
    (query: string) => {
      saveSearchQuery(query);

      const newParams = new URLSearchParams(searchParams?.toString() ?? '');
      newParams.set('page', '1');

      if (query) {
        newParams.set('q', query);
      } else {
        newParams.delete('q');
      }

      router.replace(`/?${newParams.toString()}`);
    },
    [searchParams, router, saveSearchQuery]
  );

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
          <div className={styles.controls}>
            <Link href="/about" className={styles.aboutLink}>
              About
            </Link>
            <RefreshListButton onRefetch={refetch} />
            <ThemeToggle />
          </div>
        </div>
      </div>
      <div className={styles.contentArea}>
        <div className={styles.contentAreaWrapper}>
          <ContentState
            errorMessage={errorMessage}
            isLoadingState={isLoading || isFetching}
            skeletonCount={SLIDER_CHUNK_SIZE}
          >
            <CardsContainer>
              {sliderRows.map((rowCards, rowIndex) => (
                <CardRowSlider
                  key={`row-${String(rowIndex)}`}
                  cards={rowCards}
                  rowIndex={rowIndex}
                />
              ))}
            </CardsContainer>

            <Pagination hasMore={hasMore} />
          </ContentState>
        </div>
      </div>
      <SelectionPanel className={styles.selectionPanel} />
    </main>
  );
}

export default MainPage;
