export const UI_MESSAGES = {
  NO_RESULTS: 'No results found',
  LOADING: 'Loading...',
  UNKNOWN_ERROR: 'Unknown error occurred',
  BUTTON_NEXT: 'Next',
  BUTTON_PREV: 'Previous',
  BUTTON_SEARCH: 'Search',
  BUTTON_GO_BACK: 'Go back',
  BUTTON_RELOAD_APP: 'Reload the application',
  NO_DESCRIPTION: 'No description available',
  ERROR_BOUNDARY_FALLBACK: 'Something went wrong',
} as const;

export const HTTPS_ERROR_MESSAGES: Record<number, string> = {
  400: 'Bad request. Please check the search query.',
  401: 'Unauthorized request.',
  403: 'Access forbidden.',
  404: 'Cards were not found.',
  408: 'The request timed out. Please try again.',
  429: 'Too many requests. Please wait a moment and try again.',
  500: 'Internal server error. Please try again later.',
  502: 'Bad gateway. The server is temporarily unavailable.',
  503: 'Service unavailable. Please try again later.',
  504: 'Gateway timeout. Please try again later.',
};

export const DEFAULT_ERROR_MESSAGE = 'Something went wrong. Please try again.';
