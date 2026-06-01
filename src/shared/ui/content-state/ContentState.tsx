import CardsSkeletonLoader from '../card-skeleton-loader/CardSkeletonLoader';
import { UI_MESSAGES } from '@/shared/constants/messages';
import type { CardItem } from '@/shared/constants/types';
import type { ReactNode } from 'react';

const SLIDER_CHUNK_SIZE = 4;

interface Props {
  errorMessage: string | null;
  isLoading: boolean;
  isFetching: boolean;
  sliderRows: CardItem[][];
  children?: ReactNode;
}

function ContentState({
  errorMessage,
  isLoading,
  isFetching,
  sliderRows,
  children,
}: Props) {
  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }

  if (isLoading || isFetching) {
    return <CardsSkeletonLoader count={SLIDER_CHUNK_SIZE} />;
  }

  if (sliderRows.length === 0) {
    return <p>{UI_MESSAGES.NO_RESULTS}</p>;
  }

  return <>{children}</>;
}

export default ContentState;
