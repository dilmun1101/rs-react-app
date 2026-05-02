const SEARCH_QUERY_KEY = 'searchQuery';

export const getSavedSearchQuery = (): string => {
  return localStorage.getItem(SEARCH_QUERY_KEY) ?? '';
};

export const saveSearchQuery = (query: string): void => {
  localStorage.setItem(SEARCH_QUERY_KEY, query);
};
