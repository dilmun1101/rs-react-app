import { describe, it, expect } from 'vitest';

import {
  selectAllRecords,
  selectRecordsCount,
  selectLatestRecord,
} from './selectors';
import type { RootState } from '@/store/store';

describe('records selectors', () => {
  const state = {
    records: {
      items: [
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
          name: 'test',
          age: 28,
          email: 'test',
          gender: 'female',
          country: 'Canada',
          imageBase64: 'test',
          source: 'uncontrolled',
          isNew: false,
        },
      ],
    },
    countries: {
      items: [],
      isLoading: false,
      error: null,
    },
  } as RootState;

  it('selectAllRecords returns all records', () => {
    expect(selectAllRecords(state)).toEqual(state.records.items);
  });

  it('selectRecordsCount returns records count', () => {
    expect(selectRecordsCount(state)).toBe(2);
  });

  it('selectLatestRecord returns first record', () => {
    expect(selectLatestRecord(state)).toEqual(state.records.items[0]);
  });

  it('selectLatestRecord returns null when records are empty', () => {
    const emptyState = {
      ...state,
      records: {
        items: [],
      },
    } as RootState;

    expect(selectLatestRecord(emptyState)).toBeNull();
  });

  it('selectRecordsCount returns 0 when records are empty', () => {
    const emptyState = {
      ...state,
      records: {
        items: [],
      },
    } as RootState;

    expect(selectRecordsCount(emptyState)).toBe(0);
  });
});
