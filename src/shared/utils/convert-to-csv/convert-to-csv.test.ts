import { describe, it, expect } from 'vitest';
import { convertToCSV } from './convert-to-csv';
import type { CardItem } from '../../constants/types';

describe('convertToCSV', () => {
  it('returns only headers when cards array is empty', () => {
    expect(convertToCSV([])).toBe('id,name,description,artist,imageUrl');
  });

  it('returns csv with one card', () => {
    const cards: CardItem[] = [
      {
        id: '1',
        name: 'Test name',
        description: 'Test description',
        artist: 'Test artist',
        imageUrl: 'test.jpg',
      },
    ];

    expect(convertToCSV(cards)).toBe(
      'id,name,description,artist,imageUrl\n' +
        '1,Test name,Test description,Test artist,test.jpg'
    );
  });

  it('returns csv with multiple cards', () => {
    const cards: CardItem[] = [
      {
        id: '1',
        name: 'Test name 1',
        description: 'Test description 1',
        artist: 'Test artist 1',
        imageUrl: 'test-1.jpg',
      },
      {
        id: '2',
        name: 'Test name 2',
        description: 'Test description 2',
        artist: 'Test artist 2',
        imageUrl: 'test-2.jpg',
      },
    ];

    expect(convertToCSV(cards)).toBe(
      'id,name,description,artist,imageUrl\n' +
        '1,Test name 1,Test description 1,Test artist 1,test-1.jpg\n' +
        '2,Test name 2,Test description 2,Test artist 2,test-2.jpg'
    );
  });

  it('returns empty string for missing optional fields', () => {
    const cards: CardItem[] = [
      {
        id: '1',
        name: 'Test name',
        description: 'Test description',
      },
    ];

    expect(convertToCSV(cards)).toBe(
      'id,name,description,artist,imageUrl\n' + '1,Test name,Test description,,'
    );
  });
});
