import { scryfallApi } from '../api';

interface ScryfallCard {
  id: string;
  name: string;
}

interface ScryfallListResponse {
  data: ScryfallCard[];
  has_more: boolean;
  total_cards: number;
}

export const scryfallService = {
  async searchCards(
    query: string = '',
    page: number = 1
  ): Promise<ScryfallListResponse> {
    const searchQuery = query.trim() || '*';
    const endpoint = `/cards/search?q=${searchQuery}&page=${page}s`;

    return await scryfallApi.fetchData(endpoint);
  },
};
