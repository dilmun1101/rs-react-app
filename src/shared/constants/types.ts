export interface ScryfallCardDTO {
  id: string;
  name: string;
  oracle_text?: string;
  image_uris?: {
    small?: string;
    normal?: string;
  };
}

export interface ScryfallListResponseDTO {
  data: ScryfallCardDTO[];
  has_more: boolean;
  total_cards: number;
}

export interface CardItem {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
}

export interface SearchCardsResult {
  items: CardItem[];
  hasMore: boolean;
  totalCards: number;
}
