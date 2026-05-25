import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { downloadCsv } from './download-csv';

describe('downloadCsv', () => {
  const clickMock = vi.fn();
  const createObjectURLMock = vi.fn();
  const revokeObjectURLMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    createObjectURLMock.mockReturnValue('blob:test-url');

    vi.stubGlobal('URL', {
      ...URL,
      createObjectURL: createObjectURLMock,
      revokeObjectURL: revokeObjectURLMock,
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('creates anchor element', () => {
    const link = document.createElement('a');
    link.click = clickMock;

    const createElementSpy = vi
      .spyOn(document, 'createElement')
      .mockReturnValue(link);

    downloadCsv('id,name\n1,Test', 'cards');

    expect(createElementSpy).toHaveBeenCalledWith('a');
  });

  it('creates object url for blob', () => {
    const link = document.createElement('a');
    link.click = clickMock;

    vi.spyOn(document, 'createElement').mockReturnValue(link);

    downloadCsv('id,name\n1,Test', 'cards');

    expect(createObjectURLMock).toHaveBeenCalledTimes(1);
  });

  it('sets generated url to link href', () => {
    const link = document.createElement('a');
    link.click = clickMock;

    vi.spyOn(document, 'createElement').mockReturnValue(link);

    downloadCsv('id,name\n1,Test', 'cards');

    expect(link.href).toBe('blob:test-url');
  });

  it('adds csv extension when filename does not include it', () => {
    const link = document.createElement('a');
    link.click = clickMock;

    vi.spyOn(document, 'createElement').mockReturnValue(link);

    downloadCsv('id,name\n1,Test', 'cards');

    expect(link.download).toBe('cards.csv');
  });

  it('keeps csv extension when filename already includes it', () => {
    const link = document.createElement('a');
    link.click = clickMock;

    vi.spyOn(document, 'createElement').mockReturnValue(link);

    downloadCsv('id,name\n1,Test', 'cards.csv');

    expect(link.download).toBe('cards.csv');
  });

  it('appends link to document body', () => {
    const link = document.createElement('a');
    link.click = clickMock;

    vi.spyOn(document, 'createElement').mockReturnValue(link);
    const appendChildSpy = vi.spyOn(document.body, 'appendChild');

    downloadCsv('id,name\n1,Test', 'cards');

    expect(appendChildSpy).toHaveBeenCalledWith(link);
  });

  it('clicks generated link', () => {
    const link = document.createElement('a');
    link.click = clickMock;

    vi.spyOn(document, 'createElement').mockReturnValue(link);

    downloadCsv('id,name\n1,Test', 'cards');

    expect(clickMock).toHaveBeenCalledTimes(1);
  });

  it('removes link from document body after click', () => {
    const link = document.createElement('a');
    link.click = clickMock;

    vi.spyOn(document, 'createElement').mockReturnValue(link);
    const removeChildSpy = vi.spyOn(document.body, 'removeChild');

    downloadCsv('id,name\n1,Test', 'cards');

    expect(removeChildSpy).toHaveBeenCalledWith(link);
  });

  it('revokes created object url', () => {
    const link = document.createElement('a');
    link.click = clickMock;

    vi.spyOn(document, 'createElement').mockReturnValue(link);

    downloadCsv('id,name\n1,Test', 'cards');

    expect(revokeObjectURLMock).toHaveBeenCalledWith('blob:test-url');
  });
});
