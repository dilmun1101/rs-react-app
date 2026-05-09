import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import CardsSkeletonLoader from './CardSkeletonLoader';

describe('CardsSkeletonLoader', () => {
  it('renders 10 skeleton cards by default', () => {
    render(<CardsSkeletonLoader />);

    const skeletons = screen.getAllByTestId('skeleton-card');
    expect(skeletons).toHaveLength(10);
  });

  it('renders correct number of skeleton cards when count is provided', () => {
    render(<CardsSkeletonLoader count={5} />);

    const skeletons = screen.getAllByTestId('skeleton-card');
    expect(skeletons).toHaveLength(5);
  });
});
