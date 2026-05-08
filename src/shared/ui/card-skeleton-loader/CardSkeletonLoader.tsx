import { Component } from 'react';
import CardSkeleton from '../card-skeleton/CardSkeleton';

interface ICardsSkeletonLoaderProps {
  count?: number;
}

class CardsSkeletonLoader extends Component<ICardsSkeletonLoaderProps> {
  static defaultProps = {
    count: 10,
  };

  render() {
    const { count = 10 } = this.props;

    const skeletonItems = Array.from({ length: count }, (_, number) => {
      return `skeleton-card-${String(number)}`;
    });

    return (
      <>
        {skeletonItems.map((skeletonId) => (
          <CardSkeleton key={skeletonId} />
        ))}
      </>
    );
  }
}

export default CardsSkeletonLoader;
