import { render } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import RecordCard from './RecordCard';
import { useAppDispatch } from '@/store/hooks/hooks';
import { clearNewFlag } from '@/store/formSlice/formSlice';
import type { FormProps } from '@/store/formSlice/types/types';

vi.mock('@/store/hooks/hooks', () => ({
  useAppDispatch: vi.fn(),
}));

vi.mock('@/store/formSlice/formSlice', () => ({
  clearNewFlag: vi.fn((id: string) => ({
    type: 'form/clearNewFlag',
    payload: id,
  })),
}));

describe('RecordCard', () => {
  const dispatch = vi.fn();

  const baseRecord: FormProps = {
    id: '1',
    name: 'test',
    email: 'test@test.com',
    age: 30,
    gender: 'male',
    country: 'Kazakhstan',
    source: 'rhf',
    isNew: false,
    imageBase64: '',
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useAppDispatch).mockReturnValue(dispatch);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders record data', () => {
    const { getByText } = render(<RecordCard record={baseRecord} />);

    ['test', 'test@test.com', '30', 'male', 'Kazakhstan', 'rhf'].forEach(
      (value) => {
        expect(getByText(value)).toBeTruthy();
      }
    );
  });

  it('renders image when imageBase64 is provided', () => {
    const record: FormProps = {
      ...baseRecord,
      imageBase64: 'data:image/png;base64,test-image',
    };

    const { container } = render(<RecordCard record={record} />);

    const image = container.querySelector('img');

    expect(image).toBeTruthy();

    if (!(image instanceof HTMLImageElement)) {
      throw new Error('Image was not rendered');
    }

    expect(image.getAttribute('src')).toBe('data:image/png;base64,test-image');
    expect(image.getAttribute('alt')).toBe('test');
  });

  it('does not render image when imageBase64 is empty', () => {
    const { container } = render(<RecordCard record={baseRecord} />);

    expect(container.querySelector('img')).toBe(null);
  });

  it('does not dispatch clearNewFlag when record is not new', () => {
    vi.useFakeTimers();

    render(<RecordCard record={baseRecord} />);

    vi.advanceTimersByTime(3000);

    expect(clearNewFlag).not.toHaveBeenCalled();
    expect(dispatch).not.toHaveBeenCalled();
  });

  it('dispatches clearNewFlag after 3 seconds when record is new', () => {
    vi.useFakeTimers();

    const record: FormProps = {
      ...baseRecord,
      isNew: true,
    };

    render(<RecordCard record={record} />);

    vi.advanceTimersByTime(3000);

    expect(clearNewFlag).toHaveBeenCalledWith('1');
    expect(dispatch).toHaveBeenCalledWith({
      type: 'form/clearNewFlag',
      payload: '1',
    });
  });

  it('clears timeout on unmount', () => {
    vi.useFakeTimers();

    const clearTimeoutSpy = vi.spyOn(window, 'clearTimeout');

    const record: FormProps = {
      ...baseRecord,
      isNew: true,
    };

    const { unmount } = render(<RecordCard record={record} />);

    unmount();

    expect(clearTimeoutSpy).toHaveBeenCalled();
  });
});
