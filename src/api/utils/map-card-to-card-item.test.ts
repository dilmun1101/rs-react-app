import { describe, it, expect } from 'vitest';
import { mapCardToCardItem } from './map-card-to-card-item';
import { UI_MESSAGES } from '../../shared/constants/messages';

describe('mapCardToCardItem', () => {
  it('maps card with all fields correctly', () => {
    const result = mapCardToCardItem({
      id: 'abc-123',
      name: 'Avatar',
      oracle_text: 'Deals 3 damage.',
      image_uris: { art_crop: 'https://example.com/avatar.jpg' },
    });

    expect(result).toEqual({
      id: 'abc-123',
      name: 'Avatar',
      description: 'Deals 3 damage.',
      imageUrl: 'https://example.com/avatar.jpg',
    });
  });

  it('uses NO_DESCRIPTION when oracle_text is missing', () => {
    const result = mapCardToCardItem({
      id: '999',
      name: 'Test',
    });

    expect(result.description).toBe(UI_MESSAGES.NO_DESCRIPTION);
  });

  it('sets imageUrl to undefined when image_uris is missing', () => {
    const result = mapCardToCardItem({
      id: '999',
      name: 'Test',
    });

    expect(result.imageUrl).toBeUndefined();
  });
});
