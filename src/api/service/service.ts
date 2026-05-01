import { scryfallApi } from '../api';
import type {
  CardItem,
  ScryfallCardDTO,
  ScryfallListResponseDTO,
  SearchCardsResult,
} from '../../shared/constants/types';
import { UI_MESSAGES } from '../../shared/constants/messages';

const CARDS_PER_PAGE = 20;

const mapCardToCardItem = (card: ScryfallCardDTO): CardItem => ({
  id: card.id,
  name: card.name,
  description: card.oracle_text || UI_MESSAGES.NO_DESCRIPTION,
  imageUrl: card.image_uris?.small,
});

export const scryfallService = {
  async searchCards(
    query: string = '',
    page: number = 1
  ): Promise<SearchCardsResult> {
    const searchQuery = query.trim() || '*';
    const endpoint = `/cards/search?q=${searchQuery}&page=${page}s`;

    const response =
      await scryfallApi.fetchData<ScryfallListResponseDTO>(endpoint);

    return {
      items: response.data.slice(0, CARDS_PER_PAGE).map(mapCardToCardItem),
      hasMore: response.has_more,
      totalCards: response.total_cards,
    };
  },
};
