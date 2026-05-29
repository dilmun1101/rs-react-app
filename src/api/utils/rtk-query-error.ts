import type { SerializedError } from '@reduxjs/toolkit';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { UI_MESSAGES } from '@/shared/constants/messages';

function isFetchBaseQueryError(
  error: FetchBaseQueryError | SerializedError | undefined
): error is FetchBaseQueryError {
  return !!error && 'status' in error;
}

function hasMessage(data: unknown): data is { message: string } {
  return (
    typeof data === 'object' &&
    data !== null &&
    'message' in data &&
    typeof data.message === 'string'
  );
}

export function getRtkQueryErrorMessage(
  error: FetchBaseQueryError | SerializedError | undefined
): string | null {
  if (!error) return null;

  if (isFetchBaseQueryError(error)) {
    if (typeof error.data === 'string') {
      return error.data;
    }

    if (hasMessage(error.data)) {
      return error.data.message;
    }

    return UI_MESSAGES.UNKNOWN_ERROR;
  }

  return error.message ?? UI_MESSAGES.UNKNOWN_ERROR;
}
