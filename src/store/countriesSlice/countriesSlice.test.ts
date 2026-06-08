import { describe, it, expect } from 'vitest';

import reducer from './countriesSlice';
import { COUNTRIES } from '@/shared/ui/country-autocomplete/constants/countries';

describe('countriesSlice', () => {
  it('returns initial state with countries list', () => {
    const state = reducer(undefined, { type: 'unknown' });

    expect(state).toEqual({
      items: [...COUNTRIES],
    });
  });

  it('returns current state for unknown action', () => {
    const previousState = {
      items: [...COUNTRIES],
    };

    const state = reducer(previousState, { type: 'unknown' });

    expect(state).toEqual(previousState);
  });
});
