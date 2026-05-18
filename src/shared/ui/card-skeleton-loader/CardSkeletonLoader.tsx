import CardSkeleton from '../card-skeleton/CardSkeleton';

interface ICardsSkeletonLoaderProps {
  count?: number;
}

function CardsSkeletonLoader({ count = 4 }: ICardsSkeletonLoaderProps) {
  const skeletonItems = Array.from(
    { length: count },
    (_, number) => `skeleton-card-${String(number)}`
  );

  return (
    <>
      {skeletonItems.map((skeletonId) => (
        <CardSkeleton key={skeletonId} />
      ))}
    </>
  );
}

export default CardsSkeletonLoader;
