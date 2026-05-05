import type { CardItem } from '../../shared/constants/types';
import type { ScryfallCardDTO } from '../api-types';
import { UI_MESSAGES } from '../../shared/constants/messages';

export const mapCardToCardItem = (card: ScryfallCardDTO): CardItem => ({
  id: card.id,
  name: card.name,
  description: card.oracle_text ?? UI_MESSAGES.NO_DESCRIPTION,
  imageUrl: card.image_uris?.art_crop,
});
