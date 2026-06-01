import { describe, it, expect } from 'vitest';
import { server } from './test-utils/server';
import { http, HttpResponse } from 'msw';
import { scryfallApi } from './scryfall-api';
import { configureStore } from '@reduxjs/toolkit';
import { UI_MESSAGES } from '@/shared/constants/messages';

function createTestStore() {
  return configureStore({
    reducer: {
      [scryfallApi.reducerPath]: scryfallApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(scryfallApi.middleware),
  });
}

describe('scryfallApi', () => {
  it('returns transformed data for getCardById', async () => {
    server.use(
      http.get('https://api.scryfall.com/cards/:id', ({ params }) => {
        return HttpResponse.json({
          id: params.id,
          name: 'Test Card',
          oracle_text: 'Test rules text.',
          artist: 'Test Artist',
          image_uris: {
            art_crop: 'test-art-url',
          },
        });
      })
    );

    const store = createTestStore();

    const result = await store.dispatch(
      scryfallApi.endpoints.getCardById.initiate('test-id-1')
    );

    expect(result.isSuccess).toBe(true);
    expect(result.data).toEqual({
      id: 'test-id-1',
      name: 'Test Card',
      description: 'Test rules text.',
      artist: 'Test Artist',
      imageUrl: 'test-art-url',
    });
  });

  it('uses fallback description in getCardById when oracle_text is missing', async () => {
    server.use(
      http.get('https://api.scryfall.com/cards/:id', ({ params }) => {
        return HttpResponse.json({
          id: params.id,
          name: 'No Text Card',
          artist: 'Test Artist',
          image_uris: {
            art_crop: 'test-art-url',
          },
        });
      })
    );

    const store = createTestStore();

    const result = await store.dispatch(
      scryfallApi.endpoints.getCardById.initiate('test-id-2')
    );

    expect(result.isSuccess).toBe(true);
    expect(result.data).toEqual({
      id: 'test-id-2',
      name: 'No Text Card',
      description: UI_MESSAGES.NO_DESCRIPTION,
      artist: 'Test Artist',
      imageUrl: 'test-art-url',
    });
  });

  it('sets error for failed search request', async () => {
    server.use(
      http.get('https://api.scryfall.com/cards/search', () => {
        return new HttpResponse(null, { status: 404 });
      })
    );

    const store = createTestStore();

    const result = await store.dispatch(
      scryfallApi.endpoints.searchCards.initiate({
        query: '*',
        page: 1,
      })
    );

    expect(result.isError).toBe(true);
    expect(result.error).toMatchObject({
      status: 404,
    });
  });

  it('sets parsing error for invalid JSON response', async () => {
    server.use(
      http.get('https://api.scryfall.com/cards/search', () => {
        return new HttpResponse('not json', {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
          },
        });
      })
    );

    const store = createTestStore();

    const result = await store.dispatch(
      scryfallApi.endpoints.searchCards.initiate({
        query: '*',
        page: 1,
      })
    );

    expect(result.isError).toBe(true);
    expect(result.error).toMatchObject({
      status: 'PARSING_ERROR',
    });
  });
});
