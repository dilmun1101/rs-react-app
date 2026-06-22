import { NextResponse } from 'next/server';
import { convertToCSV } from '@/shared/utils/convert-to-csv/convert-to-csv';
import type { CardItem } from '@/shared/constants/types';

export async function POST(request: Request) {
  const body: unknown = await request.json();
  const cards = body as CardItem[];

  const csv = convertToCSV(cards);

  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': 'attachment; filename="cards.csv"',
      'Cache-Control': 'no-store',
    },
  });
}
