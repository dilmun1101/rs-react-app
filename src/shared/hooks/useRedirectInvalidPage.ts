import { useEffect } from 'react';
import { useNavigate } from 'react-router';

interface Props {
  isInvalidPage: boolean;
  searchParams: URLSearchParams;
}

export function useRedirectInvalidPage({ isInvalidPage, searchParams }: Props) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isInvalidPage) return;

    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', '1');
    void navigate(`/?${newParams.toString()}`, { replace: true });
  }, [isInvalidPage, searchParams, navigate]);
}
