import { describe, it, expect } from 'vitest';
import { chunkArrayCards } from './chunk-array-cards';

describe('chunkArrayCards', () => {
  it('returns empty array when input is empty', () => {
    expect(chunkArrayCards([], 3)).toEqual([]);
  });

  it('returns single chunk when array length is <= 44', () => {
    const arr = Array.from({ length: 44 }, (_, index) => index);
    expect(chunkArrayCards(arr, 3)).toEqual([arr]);
  });

  it('returns single chunk when array length is less than 44', () => {
    const arr = [1, 2, 3];
    expect(chunkArrayCards(arr, 3)).toEqual([[1, 2, 3]]);
  });

  it('splits array into correct number of chunks when length > 44', () => {
    const arr = Array.from({ length: 90 }, (_, index) => index);
    const result = chunkArrayCards(arr, 3);

    expect(result).toHaveLength(3);
    expect(result.flat()).toEqual(arr);
  });

  it('filters out empty chunks', () => {
    const arr = Array.from({ length: 46 }, (_, index) => index);
    const result = chunkArrayCards(arr, 5);

    result.forEach((chunk) => {
      expect(chunk.length).toBeGreaterThan(0);
    });
  });
});
