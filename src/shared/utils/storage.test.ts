import { describe, it, expect, vi, afterEach } from 'vitest';
import { getSavedSearchQuery, saveSearchQuery } from './storage';
import { LOCAL_STORAGE_KEYS } from '../constants/local-storage-keys';

const getItemSpy = vi.spyOn(Storage.prototype, 'getItem');
const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');

afterEach(() => {
  localStorage.clear();
  getItemSpy.mockClear();
  setItemSpy.mockClear();
});

describe('getSavedSearchQuery', () => {
  it('returns saved query from localStorage', () => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.SEARCH_QUERY, 'avatar');

    const result = getSavedSearchQuery();

    expect(getItemSpy).toHaveBeenCalledWith(LOCAL_STORAGE_KEYS.SEARCH_QUERY);
    expect(result).toBe('avatar');
  });

  it('returns empty string when nothing is saved', () => {
    const result = getSavedSearchQuery();

    expect(result).toBe('');
  });
});

describe('saveSearchQuery', () => {
  it('saves query to localStorage', () => {
    saveSearchQuery('aang');

    expect(setItemSpy).toHaveBeenCalledWith(
      LOCAL_STORAGE_KEYS.SEARCH_QUERY,
      'aang'
    );
    expect(localStorage.getItem(LOCAL_STORAGE_KEYS.SEARCH_QUERY)).toBe('aang');
  });
});
