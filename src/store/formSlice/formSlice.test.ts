import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import reducer, { addRecord, clearNewFlag } from './formSlice';

describe('formSlice', () => {
  const originalCrypto = globalThis.crypto;

  beforeEach(() => {
    Object.defineProperty(globalThis, 'crypto', {
      configurable: true,
      value: {
        randomUUID: vi.fn(() => 'test'),
      },
    });
  });

  afterEach(() => {
    Object.defineProperty(globalThis, 'crypto', {
      configurable: true,
      value: originalCrypto,
    });
    vi.restoreAllMocks();
  });

  it('returns initial state', () => {
    const state = reducer(undefined, { type: 'unknown' });

    expect(state).toEqual({
      items: [],
    });
  });

  it('adds record to the beginning of items with id and isNew flag', () => {
    const payload = {
      name: 'test',
      age: 30,
      email: 'test',
      gender: 'male',
      country: 'Kazakhstan',
      imageBase64: 'test',
      source: 'rhf' as const,
    };

    const state = reducer(undefined, addRecord(payload));

    expect(state.items).toHaveLength(1);
    expect(state.items[0]).toEqual({
      ...payload,
      id: 'test',
      isNew: true,
    });
  });

  it('adds new record to the beginning of existing items', () => {
    const previousState = {
      items: [
        {
          id: 'test',
          name: 'test',
          age: 22,
          email: 'test',
          gender: 'female',
          country: 'Canada',
          imageBase64: 'test',
          source: 'uncontrolled' as const,
          isNew: false,
        },
      ],
    };

    const payload = {
      name: 'test',
      age: 30,
      email: 'test',
      gender: 'male',
      country: 'Kazakhstan',
      imageBase64: 'test',
      source: 'rhf' as const,
    };

    const state = reducer(previousState, addRecord(payload));

    expect(state.items).toHaveLength(2);
    expect(state.items[0]).toEqual({
      ...payload,
      id: 'test',
      isNew: true,
    });
    expect(state.items[1]).toEqual(previousState.items[0]);
  });

  it('clears isNew flag for matching item', () => {
    const previousState = {
      items: [
        {
          id: 'test',
          name: 'test',
          age: 30,
          email: 'test',
          gender: 'male',
          country: 'Kazakhstan',
          imageBase64: 'test',
          source: 'rhf' as const,
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
          source: 'uncontrolled' as const,
          isNew: true,
        },
      ],
    };

    const state = reducer(previousState, clearNewFlag('test'));

    expect(state.items[0].isNew).toBe(false);
    expect(state.items[1].isNew).toBe(true);
  });

  it('does nothing when clearNewFlag id is not found', () => {
    const previousState = {
      items: [
        {
          id: 'test',
          name: 'test',
          age: 30,
          email: 'test',
          gender: 'male',
          country: 'Kazakhstan',
          imageBase64: 'test',
          source: 'rhf' as const,
          isNew: true,
        },
      ],
    };

    const state = reducer(previousState, clearNewFlag('missing-test'));

    expect(state).toEqual(previousState);
  });
});
