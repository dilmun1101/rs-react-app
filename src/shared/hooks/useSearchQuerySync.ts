import { useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { getSavedSearchQuery, saveSearchQuery } from '../utils/storage';

export const useSearchQuerySync = () => {
  const [, setSearchParams] = useSearchParams();

  useEffect(() => {
    setSearchParams(
      (prevParams) => {
        if (prevParams.get('q')) {
          return prevParams;
        }

        const savedQuery = getSavedSearchQuery();
        if (!savedQuery) {
          return prevParams;
        }

        const nextParams = new URLSearchParams(prevParams);
        nextParams.set('q', savedQuery);
        return nextParams;
      },
      { replace: true }
    );
  }, [setSearchParams]);

  return { saveSearchQuery };
};
