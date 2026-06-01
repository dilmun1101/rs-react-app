import SearchForm from '../../shared/ui/search-form/SearchForm';
import styles from './main-page.module.scss';
import type { CardItem } from '../../shared/constants/types';
import { chunkArrayCards } from '../../shared/utils/chunk-array-cards/chunk-array-cards';
import { useCallback } from 'react';
import { useSearchParams, useNavigate, Outlet, Link } from 'react-router';
import { useSearchQuerySync } from '../../shared/hooks/useSearchQuerySync';
import { useRedirectInvalidPage } from '../../shared/hooks/useRedirectInvalidPage';
import { useLocalStorage } from '../../shared/hooks/useLocalStorage';
import { LOCAL_STORAGE_KEYS } from '../../shared/constants/local-storage-keys';

import SelectionPanel from '@/shared/ui/selection-panel/SelectionPanel';
import ThemeToggle from '@/shared/ui/theme-toggle/ThemeToggle';
import { useSearchCardsQuery } from '@/api/scryfall-api';
import { getRtkQueryErrorMessage } from '@/api/utils/rtk-query-error';
import RefreshListButton from '@/shared/ui/refresh-list-button/RefreshListButton';
import MainPageContent from '@/shared/ui/main-page-content/MainPageContent';

const SLIDER_CHUNK_SIZE = 4;

function MainPage() {
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

  const { data, isLoading, isFetching, error, refetch } = useSearchCardsQuery(
    { query: currentQuery, page: currentPage },
    { skip: isInvalidPage }
  );

  const items = data?.items ?? [];
  const hasMore = data?.hasMore ?? false;
  const errorMessage = getRtkQueryErrorMessage(error);

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
        <div className={styles.topControlsWrapper}>
          <SearchForm
            key={currentQuery}
            defaultValue={currentQuery}
            onSearch={handleSearch}
          />
          <div className={styles.controls}>
            <Link to="/about" className={styles.aboutLink}>
              About
            </Link>
            <RefreshListButton onRefetch={refetch} />
            <ThemeToggle />
          </div>
        </div>
      </div>
      <div className={styles.contentArea}>
        <div className={styles.contentAreaWrapper}>
          <MainPageContent
            errorMessage={errorMessage}
            isLoading={isLoading}
            isFetching={isFetching}
            sliderRows={sliderRows}
            hasMore={hasMore}
          />
        </div>
        <Outlet context={{ onClose: handleCloseDetails }} />
      </div>
      <SelectionPanel className={styles.selectionPanel} />
    </main>
  );
}

export default MainPage;
