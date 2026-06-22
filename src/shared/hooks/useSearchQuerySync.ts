import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter, usePathname } from '@/i18n/navigation';
import { getSavedSearchQuery } from '../utils/storage/storage';

export const useSearchQuerySync = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (searchParams?.get('q')) return;

    const savedQuery = getSavedSearchQuery();
    if (!savedQuery) return;

    const nextParams = new URLSearchParams(searchParams?.toString() ?? '');
    nextParams.set('q', savedQuery);
    router.replace(`${pathname}?${nextParams.toString()}`);
  }, [searchParams, router, pathname]);
};
