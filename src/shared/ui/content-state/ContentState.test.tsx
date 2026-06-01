import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ContentState from './ContentState';

vi.mock('../card-skeleton-loader/CardSkeletonLoader', () => ({
  default: ({ count }: { count?: number }) => (
    <div>CardsSkeletonLoader count:{String(count)}</div>
  ),
}));

describe('ContentState', () => {
  it('renders error message when errorMessage is provided', () => {
    render(
      <ContentState errorMessage="Test error" isLoadingState={false}>
        <div>Content</div>
      </ContentState>
    );

    expect(screen.getByText('Test error')).toBeInTheDocument();
    expect(screen.queryByText('Content')).not.toBeInTheDocument();
  });

  it('renders skeleton loader when isLoadingState is true', () => {
    render(
      <ContentState errorMessage={null} isLoadingState skeletonCount={4}>
        <div>Content</div>
      </ContentState>
    );

    expect(screen.getByText('CardsSkeletonLoader count:4')).toBeInTheDocument();
    expect(screen.queryByText('Content')).not.toBeInTheDocument();
  });

  it('renders children when there is no error and loading is false', () => {
    render(
      <ContentState errorMessage={null} isLoadingState={false}>
        <div>Content</div>
      </ContentState>
    );

    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('renders error message instead of loader when both error and loading are present', () => {
    render(
      <ContentState errorMessage="Test error" isLoadingState skeletonCount={4}>
        <div>Content</div>
      </ContentState>
    );

    expect(screen.getByText('Test error')).toBeInTheDocument();
    expect(
      screen.queryByText('CardsSkeletonLoader count:4')
    ).not.toBeInTheDocument();
    expect(screen.queryByText('Content')).not.toBeInTheDocument();
  });

  it('passes undefined count to skeleton loader when skeletonCount is not provided', () => {
    render(
      <ContentState errorMessage={null} isLoadingState>
        <div>Content</div>
      </ContentState>
    );

    expect(
      screen.getByText('CardsSkeletonLoader count:undefined')
    ).toBeInTheDocument();
  });
});
