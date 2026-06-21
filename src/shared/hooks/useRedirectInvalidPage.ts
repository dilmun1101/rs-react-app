import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import type { ReadonlyURLSearchParams } from 'next/navigation';

interface Props {
  isInvalidPage: boolean;
  searchParams: ReadonlyURLSearchParams | null;
}

export function useRedirectInvalidPage({ isInvalidPage, searchParams }: Props) {
  const router = useRouter();

  useEffect(() => {
    if (!isInvalidPage) return;

    const newParams = new URLSearchParams(searchParams?.toString() ?? '');
    newParams.set('page', '1');
    router.replace(`/?${newParams.toString()}`);
  }, [isInvalidPage, searchParams, router]);
}
