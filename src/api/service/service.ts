import { scryfallApi } from '../api';
import type {
  CardItem,
  ScryfallCardDTO,
  SearchCardsResult,
} from '../../shared/constants/types';
import { UI_MESSAGES } from '../../shared/constants/messages';

const mapCardToCardItem = (card: ScryfallCardDTO): CardItem => ({
  id: card.id,
  name: card.name,
  description: card.oracle_text ?? UI_MESSAGES.NO_DESCRIPTION,
  imageUrl: card.image_uris?.art_crop,
});

export const scryfallService = {
  async searchCards(query = '', page = 1): Promise<SearchCardsResult> {
    const searchQuery = query.trim() || '*';
    const endpoint = `/cards/search?q=${searchQuery}&page=${String(page)}`;

    const response = await scryfallApi.fetchData(endpoint);

    return {
      items: response.data.map(mapCardToCardItem),
      hasMore: response.has_more,
      totalCards: response.total_cards,
    };
  },
};
