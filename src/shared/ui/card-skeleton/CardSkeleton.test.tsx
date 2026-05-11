import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import CardSkeleton from './CardSkeleton';

describe('CardSkeleton', () => {
  it('renders in document', () => {
    render(<CardSkeleton />);

    const skeletonCard = screen.getByTestId('skeleton-card');
    expect(skeletonCard).toBeInTheDocument();
  });

  it('renders correct number of info lines', () => {
    render(<CardSkeleton />);

    const infoBlock = screen.getByTestId('skeleton-info');
    expect(infoBlock.children).toHaveLength(4);
  });
});
