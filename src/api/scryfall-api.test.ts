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
      scryfallApi.endpoints.getAllCards.initiate({
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
      scryfallApi.endpoints.getAllCards.initiate({
        query: '*',
        page: 1,
      })
    );

    expect(result.isError).toBe(true);
    expect(result.error).toMatchObject({
      status: 'PARSING_ERROR',
    });
  });

  it('reuses cached search result for the same query and page', async () => {
    let requestCount = 0;

    server.use(
      http.get('https://api.scryfall.com/cards/search', () => {
        requestCount += 1;

        return HttpResponse.json({
          data: [
            {
              id: 'test-id-1',
              name: 'Test Card 1',
              oracle_text: 'Test description 1',
              artist: 'Test Artist 1',
              image_uris: {
                art_crop: 'test-image-1',
              },
            },
          ],
          has_more: false,
        });
      })
    );

    const store = createTestStore();

    const firstResult = await store.dispatch(
      scryfallApi.endpoints.getAllCards.initiate({
        query: 'test',
        page: 1,
      })
    );

    const secondResult = await store.dispatch(
      scryfallApi.endpoints.getAllCards.initiate({
        query: 'test',
        page: 1,
      })
    );

    expect(firstResult.isSuccess).toBe(true);
    expect(secondResult.isSuccess).toBe(true);
    expect(secondResult.data).toEqual(firstResult.data);
    expect(requestCount).toBe(1);
  });

  it('makes a new search request after invalidating Cards tag', async () => {
    let requestCount = 0;

    server.use(
      http.get('https://api.scryfall.com/cards/search', () => {
        requestCount += 1;

        return HttpResponse.json({
          data: [
            {
              id: 'test-id-1',
              name: 'Test Card 1',
              oracle_text: 'Test description 1',
              artist: 'Test Artist 1',
              image_uris: {
                art_crop: 'test-image-1',
              },
            },
          ],
          has_more: false,
        });
      })
    );

    const store = createTestStore();

    await store.dispatch(
      scryfallApi.endpoints.getAllCards.initiate({
        query: 'test',
        page: 1,
      })
    );

    store.dispatch(scryfallApi.util.invalidateTags(['Cards']));

    await store.dispatch(
      scryfallApi.endpoints.getAllCards.initiate({
        query: 'test',
        page: 1,
      })
    );

    expect(requestCount).toBe(2);
  });

  it('reuses cached card details for the same id', async () => {
    let requestCount = 0;

    server.use(
      http.get('https://api.scryfall.com/cards/:id', ({ params }) => {
        requestCount += 1;

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

    const firstResult = await store.dispatch(
      scryfallApi.endpoints.getCardById.initiate('test-id-3')
    );

    const secondResult = await store.dispatch(
      scryfallApi.endpoints.getCardById.initiate('test-id-3')
    );

    expect(firstResult.isSuccess).toBe(true);
    expect(secondResult.isSuccess).toBe(true);
    expect(secondResult.data).toEqual(firstResult.data);
    expect(requestCount).toBe(1);
  });

  it('makes a new card details request after invalidating Card tag', async () => {
    let requestCount = 0;

    server.use(
      http.get('https://api.scryfall.com/cards/:id', ({ params }) => {
        requestCount += 1;

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

    await store.dispatch(
      scryfallApi.endpoints.getCardById.initiate('test-id-4')
    );

    store.dispatch(
      scryfallApi.util.invalidateTags([{ type: 'Card', id: 'test-id-4' }])
    );

    await store.dispatch(
      scryfallApi.endpoints.getCardById.initiate('test-id-4')
    );

    expect(requestCount).toBe(2);
  });
});
