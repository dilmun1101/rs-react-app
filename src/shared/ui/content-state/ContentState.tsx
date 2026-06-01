import CardsSkeletonLoader from '../card-skeleton-loader/CardSkeletonLoader';
import type { ReactNode } from 'react';

interface Props {
  errorMessage: string | null;
  isLoadingState: boolean;
  skeletonCount?: number;
  children?: ReactNode;
}

function ContentState({
  errorMessage,
  isLoadingState,
  skeletonCount,
  children,
}: Props) {
  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }

  if (isLoadingState) {
    return <CardsSkeletonLoader count={skeletonCount} />;
  }

  return <>{children}</>;
}

export default ContentState;
