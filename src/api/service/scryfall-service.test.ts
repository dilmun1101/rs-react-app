import { describe, it, expect } from 'vitest';
import { scryfallService } from './scryfall-service';

describe('scryfallService.searchCards', () => {
  it('returns one item', async () => {
    const result = await scryfallService.searchCards();
    expect(result.items).toHaveLength(1);
  });

  it('returns correct card name', async () => {
    const result = await scryfallService.searchCards();
    expect(result.items[0].name).toBe('Avatar');
  });

  it('returns hasMore as false', async () => {
    const result = await scryfallService.searchCards();
    expect(result.hasMore).toBe(false);
  });

  it('returns correct totalCards', async () => {
    const result = await scryfallService.searchCards();
    expect(result.totalCards).toBe(1);
  });

  it('returns card with correct id for explicit query', async () => {
    const result = await scryfallService.searchCards('Avatar', 1);
    expect(result.items[0].id).toBe('abc-123');
  });
});
