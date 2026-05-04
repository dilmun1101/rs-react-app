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

    return (
      <>
        {Array.from({ length: count }).map((_, index) => (
          <CardSkeleton key={index} />
        ))}
      </>
    );
  }
}

export default CardsSkeletonLoader;
