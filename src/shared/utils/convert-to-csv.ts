import type { CardItem } from '../constants/types';

const CSV_HEADERS = [
  'id',
  'name',
  'description',
  'artist',
  'imageUrl',
] as const;

export function convertToCSV(cards: CardItem[]): string {
  const header = CSV_HEADERS.join(',');

  const rows = cards.map((card) => {
    return CSV_HEADERS.map((key) => {
      const str = card[key] ?? '';
      const shouldBeQuoted = str.includes(',') || str.includes('"');
      return shouldBeQuoted ? `"${str.replace(/"/g, '""')}"` : str;
    }).join(',');
  });
  return [header, ...rows].join('\n');
}
