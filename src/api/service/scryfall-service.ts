import { scryfallApi } from '../scryfall-api';
import type { SearchCardsResult } from '../../shared/constants/types';
import { mapSearchCardsResponse } from '../utils/map-search-card-response';

export const scryfallService = {
  async searchCards(query = '', page = 1): Promise<SearchCardsResult> {
    const searchQuery = query.trim() || '*';
    const endpoint = `/cards/search?q=${searchQuery}&page=${String(page)}`;

    const response = await scryfallApi.fetchData(endpoint);

    return mapSearchCardsResponse(response);
  },
};
