import CardsContainer from '../cards-container/CardsContainer';
import CardsSkeletonLoader from '../card-skeleton-loader/CardSkeletonLoader';
import CardRowSlider from '../cards-row-slider/CardRowSlider';
import Pagination from '../pagination/PaginationControls';
import { UI_MESSAGES } from '@/shared/constants/messages';
import type { CardItem } from '@/shared/constants/types';

const SLIDER_CHUNK_SIZE = 4;

interface Props {
  errorMessage: string | null;
  isLoading: boolean;
  isFetching: boolean;
  sliderRows: CardItem[][];
  hasMore: boolean;
}

function MainPageContent({
  errorMessage,
  isLoading,
  isFetching,
  sliderRows,
  hasMore,
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

  return (
    <div>
      <CardsContainer>
        {sliderRows.map((rowCards, rowIndex) => (
          <CardRowSlider
            key={`row-${String(rowIndex)}`}
            cards={rowCards}
            rowIndex={rowIndex}
          />
        ))}
      </CardsContainer>

      <Pagination hasMore={hasMore} />
    </div>
  );
}

export default MainPageContent;
