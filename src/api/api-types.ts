export interface ScryfallCardDTO {
  id: string;
  name: string;
  oracle_text?: string;
  artist?: string;
  image_uris?: {
    art_crop?: string;
  };
}

export interface ScryfallListResponseDTO {
  data: ScryfallCardDTO[];
  has_more: boolean;
  total_cards: number;
}
