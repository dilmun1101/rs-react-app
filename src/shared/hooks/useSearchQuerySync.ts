import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { getSavedSearchQuery } from '../utils/storage/storage';

export const useSearchQuerySync = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (searchParams?.get('q')) return;

    const savedQuery = getSavedSearchQuery();

    const nextParams = new URLSearchParams(searchParams?.toString() ?? '');
    nextParams.set('q', savedQuery);
    router.replace(`/?${nextParams.toString()}`);
  }, []);
};
