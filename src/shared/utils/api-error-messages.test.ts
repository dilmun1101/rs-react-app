import { describe, it, expect } from 'vitest';
import { getErrorMessageByStatus } from './api-error-messages';
import {
  HTTPS_ERROR_MESSAGES,
  DEFAULT_ERROR_MESSAGE,
} from '../constants/messages';

describe('getErrorMessageByStatus', () => {
  it('returns correct message for known HTTP status codes', () => {
    Object.entries(HTTPS_ERROR_MESSAGES).forEach(([status, message]) => {
      expect(getErrorMessageByStatus(Number(status))).toBe(message);
    });
  });

  it('returns default error message for unknown status code', () => {
    expect(getErrorMessageByStatus(999)).toBe(DEFAULT_ERROR_MESSAGE);
    expect(getErrorMessageByStatus(0)).toBe(DEFAULT_ERROR_MESSAGE);
  });
});
