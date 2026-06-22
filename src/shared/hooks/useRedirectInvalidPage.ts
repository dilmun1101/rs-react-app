import { useEffect } from 'react';
import { useRouter, usePathname } from '@/i18n/navigation';
import type { ReadonlyURLSearchParams } from 'next/navigation';

interface Props {
  isInvalidPage: boolean;
  searchParams: ReadonlyURLSearchParams | null;
}

export function useRedirectInvalidPage({ isInvalidPage, searchParams }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isInvalidPage) return;

    const newParams = new URLSearchParams(searchParams?.toString() ?? '');
    newParams.set('page', '1');
    router.replace(`${pathname}?${newParams.toString()}`);
  }, [isInvalidPage, searchParams, router, pathname]);
}
