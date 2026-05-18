import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import CardsSkeletonLoader from './CardSkeletonLoader';

describe('CardsSkeletonLoader', () => {
  it('renders 4 skeleton cards by default', () => {
    render(<CardsSkeletonLoader />);

    const skeletons = screen.getAllByTestId('skeleton-card');
    expect(skeletons).toHaveLength(4);
  });

  it('renders correct number of skeleton cards when count is provided', () => {
    render(<CardsSkeletonLoader count={5} />);

    const skeletons = screen.getAllByTestId('skeleton-card');
    expect(skeletons).toHaveLength(5);
  });

  it('renders nothing when count is 0', () => {
    render(<CardsSkeletonLoader count={0} />);

    const skeletons = screen.queryByTestId('skeleton-card');
    expect(skeletons).toBeNull();
  });

  it('renders nothing when count is negative', () => {
    render(<CardsSkeletonLoader count={-1} />);

    const skeletons = screen.queryByTestId('skeleton-card');
    expect(skeletons).toBeNull();
  });
});
