import { LOCAL_STORAGE_KEYS } from '@/shared/constants/local-storage-keys';

export const getSavedSearchQuery = (): string => {
  return localStorage.getItem(LOCAL_STORAGE_KEYS.SEARCH_QUERY) ?? '';
};

export const saveSearchQuery = (query: string): void => {
  localStorage.setItem(LOCAL_STORAGE_KEYS.SEARCH_QUERY, query);
};
