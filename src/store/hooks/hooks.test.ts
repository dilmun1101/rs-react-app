import { describe, it, expect } from 'vitest';
import { useAppDispatch, useAppSelector } from './hooks';

describe('store hooks', () => {
  it('exports typed hooks', () => {
    expect(useAppDispatch).toBeTypeOf('function');
    expect(useAppSelector).toBeTypeOf('function');
  });
});
