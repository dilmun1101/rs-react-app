import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import RecordsList from './RecordsList';
import { useAppSelector } from '@/store/hooks/hooks';

vi.mock('@/store/hooks/hooks', () => ({
  useAppSelector: vi.fn(),
}));

vi.mock('../record-card/RecordCard', () => ({
  default: ({ record }: { record: { id: string; name: string } }) => (
    <div>RecordCard: {record.name}</div>
  ),
}));

describe('RecordsList', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders empty state when there are no records', () => {
    vi.mocked(useAppSelector).mockReturnValue([]);

    render(<RecordsList />);

    expect(screen.getByText('No submissions yet.')).toBeInTheDocument();
  });

  it('renders list of record cards when records exist', () => {
    vi.mocked(useAppSelector).mockReturnValue([
      {
        id: 'test',
        name: 'test',
        age: 30,
        email: 'test',
        gender: 'male',
        country: 'Kazakhstan',
        imageBase64: 'test',
        source: 'rhf',
        isNew: true,
      },
      {
        id: 'test-2',
        name: 'test 2',
        age: 31,
        email: 'test-2',
        gender: 'female',
        country: 'Canada',
        imageBase64: 'test',
        source: 'uncontrolled',
        isNew: false,
      },
    ]);

    render(<RecordsList />);

    expect(screen.queryByText('No submissions yet.')).not.toBeInTheDocument();
    expect(screen.getByText('RecordCard: test')).toBeInTheDocument();
    expect(screen.getByText('RecordCard: test 2')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });
});
