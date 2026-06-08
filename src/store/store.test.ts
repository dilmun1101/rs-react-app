import { describe, it, expect } from 'vitest';
import { store } from './store';

describe('store', () => {
  it('has expected state shape', () => {
    const state = store.getState();

    expect(state.records).toBeDefined();
    expect(state.countries).toBeDefined();
  });
});
