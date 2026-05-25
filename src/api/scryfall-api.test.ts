import { describe, it, expect } from 'vitest';
import { server } from './test-utils/server';
import { http, HttpResponse } from 'msw';
import { scryfallApi } from './scryfall-api';
import { getErrorMessageByStatus } from '../shared/utils/api-error-messages/api-error-messages';

describe('scryfallApi.fetchData', () => {
  it('throws an error with status message when response is not ok', async () => {
    server.use(
      http.get('https://api.scryfall.com/cards/search', () => {
        return new HttpResponse(null, { status: 404 });
      })
    );

    await expect(scryfallApi.fetchData('/cards/search?q=*')).rejects.toThrow(
      getErrorMessageByStatus(404)
    );
  });

  it('throws when response json is invalid', async () => {
    server.use(
      http.get('https://api.scryfall.com/cards/search', () => {
        return new HttpResponse('not json', {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      })
    );

    await expect(scryfallApi.fetchData('/cards/search?q=*')).rejects.toThrow();
  });
});
