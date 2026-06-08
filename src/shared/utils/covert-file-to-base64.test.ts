import { describe, it, expect, vi, afterEach } from 'vitest';
import { convertFileToBase64 } from './covert-file-to-base64';

describe('convertFileToBase64', () => {
  const originalFileReader = globalThis.FileReader;

  afterEach(() => {
    globalThis.FileReader = originalFileReader;
    vi.restoreAllMocks();
  });

  it('resolves with base64 string when FileReader returns string result', async () => {
    const readAsDataURL = vi.fn<(file: File) => void>();

    class MockFileReader {
      static readonly EMPTY = 0;
      static readonly LOADING = 1;
      static readonly DONE = 2;

      result: string | ArrayBuffer | null = 'data:image/png;base64,abc123';
      onload: null | (() => void) = null;
      onerror: null | (() => void) = null;

      readAsDataURL = readAsDataURL.mockImplementation(() => {
        this.onload?.();
      });
    }

    globalThis.FileReader = MockFileReader as unknown as typeof FileReader;

    const file = new File(['avatar'], 'avatar.png', { type: 'image/png' });

    await expect(convertFileToBase64(file)).resolves.toBe(
      'data:image/png;base64,abc123'
    );
    expect(readAsDataURL).toHaveBeenCalledWith(file);
  });

  it('rejects when FileReader result is not a string', async () => {
    const readAsDataURL = vi.fn<(file: File) => void>();

    class MockFileReader {
      static readonly EMPTY = 0;
      static readonly LOADING = 1;
      static readonly DONE = 2;

      result: string | ArrayBuffer | null = new ArrayBuffer(8);
      onload: null | (() => void) = null;
      onerror: null | (() => void) = null;

      readAsDataURL = readAsDataURL.mockImplementation(() => {
        this.onload?.();
      });
    }

    globalThis.FileReader = MockFileReader as unknown as typeof FileReader;

    const file = new File(['avatar'], 'avatar.png', { type: 'image/png' });

    await expect(convertFileToBase64(file)).rejects.toThrow(
      'Failed to convert file to base64'
    );
    expect(readAsDataURL).toHaveBeenCalledWith(file);
  });

  it('rejects when FileReader triggers error', async () => {
    const readAsDataURL = vi.fn<(file: File) => void>();

    class MockFileReader {
      static readonly EMPTY = 0;
      static readonly LOADING = 1;
      static readonly DONE = 2;

      result: string | ArrayBuffer | null = null;
      onload: null | (() => void) = null;
      onerror: null | (() => void) = null;

      readAsDataURL = readAsDataURL.mockImplementation(() => {
        this.onerror?.();
      });
    }

    globalThis.FileReader = MockFileReader as unknown as typeof FileReader;

    const file = new File(['avatar'], 'avatar.png', { type: 'image/png' });

    await expect(convertFileToBase64(file)).rejects.toThrow(
      'File reading error'
    );
    expect(readAsDataURL).toHaveBeenCalledWith(file);
  });
});
