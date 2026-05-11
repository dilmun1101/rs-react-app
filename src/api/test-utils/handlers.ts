import { http, HttpResponse } from 'msw';
import type { ScryfallListResponseDTO } from '../api-types';

export const handlers = [
  http.get('https://api.scryfall.com/cards/search', () => {
    const mockResponse: ScryfallListResponseDTO = {
      data: [
        {
          id: 'abc-123',
          name: 'Avatar',
          oracle_text: 'Avatar deals 3 damage to any target.',
          image_uris: {
            art_crop: 'https://example.com/avatar.jpg',
          },
        },
      ],
      has_more: false,
      total_cards: 1,
    };

    return HttpResponse.json(mockResponse);
  }),
];
