import type { CardItem } from '../../constants/types';

const CSV_HEADERS = ['id', 'name', 'description', 'imageUrl'] as const;

function formatCSVValue(value: string): string {
  const shouldBeQuoted =
    value.includes(',') || value.includes('"') || value.includes('\n');

  return shouldBeQuoted ? `"${value.replace(/"/g, '""')}"` : value;
}

export function convertToCSV(cards: CardItem[]): string {
  const header = CSV_HEADERS.join(',');

  const rows = cards.map((card) => {
    return CSV_HEADERS.map((key) => {
      const str = card[key] ?? '';
      return formatCSVValue(str);
    }).join(',');
  });
  return [header, ...rows].join('\n');
}
