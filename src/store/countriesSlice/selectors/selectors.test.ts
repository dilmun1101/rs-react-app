import { describe, it, expect } from 'vitest';

import { selectCountries } from './selectors';
import type { RootState } from '@/store/store';

describe('countries selectors', () => {
  it('selectCountries returns countries items', () => {
    const state = {
      records: {
        items: [],
      },
      countries: {
        items: ['Kazakhstan', 'Canada', 'Armenia'],
      },
    } as RootState;

    expect(selectCountries(state)).toEqual(['Kazakhstan', 'Canada', 'Armenia']);
  });

  it('selectCountries returns empty array when there are no countries', () => {
    const state = {
      records: {
        items: [],
      },
      countries: {
        items: [],
      },
    } as RootState;

    expect(selectCountries(state)).toEqual([]);
  });
});
