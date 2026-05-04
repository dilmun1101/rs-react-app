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
