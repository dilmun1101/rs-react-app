import { scryfallApi } from '../scryfall-api';
import type { SearchCardsResult, CardItem } from '../../shared/constants/types';
import { mapSearchCardsResponse } from '../utils/map-search-card-response';
import { mapCardToCardItem } from '../utils/map-card-to-card-item';
import type { ScryfallCardDTO, ScryfallListResponseDTO } from '../api-types';

export const scryfallService = {
  async searchCards(query = '', page = 1): Promise<SearchCardsResult> {
    const searchQuery = query || '*';
    const endpoint = `/cards/search?q=${searchQuery}&page=${String(page)}`;

    const response =
      await scryfallApi.fetchData<ScryfallListResponseDTO>(endpoint);

    return mapSearchCardsResponse(response);
  },

  async getCardById(id: string): Promise<CardItem> {
    const response = await scryfallApi.fetchData<ScryfallCardDTO>(
      `/cards/${id}`
    );
    return mapCardToCardItem(response);
  },
};
