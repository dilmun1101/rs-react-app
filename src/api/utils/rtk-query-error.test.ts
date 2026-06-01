import { describe, expect, it } from 'vitest';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type { SerializedError } from '@reduxjs/toolkit';

import { getRtkQueryErrorMessage } from './rtk-query-error';
import { UI_MESSAGES } from '@/shared/constants/messages';

describe('getRtkQueryErrorMessage', () => {
  it('returns null when error is undefined', () => {
    expect(getRtkQueryErrorMessage(undefined)).toBeNull();
  });

  it('returns string data for FetchBaseQueryError when data is a string', () => {
    const error: FetchBaseQueryError = {
      status: 400,
      data: 'Custom API error',
    };

    expect(getRtkQueryErrorMessage(error)).toBe('Custom API error');
  });

  it('returns message from FetchBaseQueryError when data has message field', () => {
    const error: FetchBaseQueryError = {
      status: 500,
      data: { message: 'Server failed' },
    };

    expect(getRtkQueryErrorMessage(error)).toBe('Server failed');
  });

  it('returns unknown error message for FetchBaseQueryError when data has no supported shape', () => {
    const error: FetchBaseQueryError = {
      status: 404,
      data: { error: 'Not found' },
    };

    expect(getRtkQueryErrorMessage(error)).toBe(UI_MESSAGES.UNKNOWN_ERROR);
  });

  it('returns message for SerializedError', () => {
    const error: SerializedError = {
      message: 'Serialized error message',
    };

    expect(getRtkQueryErrorMessage(error)).toBe('Serialized error message');
  });

  it('returns unknown error message for SerializedError without message', () => {
    const error: SerializedError = {};

    expect(getRtkQueryErrorMessage(error)).toBe(UI_MESSAGES.UNKNOWN_ERROR);
  });
});
