import CardsSkeletonLoader from '../card-skeleton-loader/CardSkeletonLoader';
import type { ReactNode } from 'react';

const SLIDER_CHUNK_SIZE = 4;

interface Props {
  errorMessage: string | null;
  isLoading: boolean;
  isFetching: boolean;
  loader?: ReactNode;
  children?: ReactNode;
}

function ContentState({
  errorMessage,
  isLoading,
  isFetching,
  loader,
  children,
}: Props) {
  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }

  if (isLoading || isFetching) {
    return loader ?? <CardsSkeletonLoader count={SLIDER_CHUNK_SIZE} />;
  }

  return <>{children}</>;
}

export default ContentState;
