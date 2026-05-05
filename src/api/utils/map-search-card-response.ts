import type { SearchCardsResult } from '../../shared/constants/types';
import type { ScryfallListResponseDTO } from '../api-types';
import { mapCardToCardItem } from './map-card-to-card-item';

export const mapSearchCardsResponse = (
  response: ScryfallListResponseDTO
): SearchCardsResult => ({
  items: response.data.map(mapCardToCardItem),
  hasMore: response.has_more,
  totalCards: response.total_cards,
});
