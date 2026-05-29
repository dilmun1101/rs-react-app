import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { SearchCardsResult, CardItem } from '@/shared/constants/types';
import type { ScryfallCardDTO, ScryfallListResponseDTO } from './api-types';
import { mapSearchCardsResponse } from './utils/map-search-card-response';
import { mapCardToCardItem } from './utils/map-card-to-card-item';

const SCRYFALL_API = 'https://api.scryfall.com';

export const scryfallApi = createApi({
  reducerPath: 'scryfallApi',

  baseQuery: fetchBaseQuery({
    baseUrl: SCRYFALL_API,
    prepareHeaders: (headers) => {
      headers.set('Accept', 'application/json');
      headers.set('User-Agent', 'rs-react-app/1.0');
      return headers;
    },
  }),

  keepUnusedDataFor: Number(import.meta.env.VITE_CACHE_TTL_SECONDS ?? 60),

  tagTypes: ['Cards', 'Card'],

  endpoints: (builder) => ({
    searchCards: builder.query<
      SearchCardsResult,
      { query: string; page: number }
    >({
      query: ({ query, page }) => {
        const searchQuery = query || '*';
        return `/cards/search?q=${searchQuery}&page=${String(page)}`;
      },
      transformResponse: (response: ScryfallListResponseDTO) =>
        mapSearchCardsResponse(response),
      providesTags: ['Cards'],
    }),

    getCardById: builder.query<CardItem, string>({
      query: (id) => `/cards/${id}`,
      transformResponse: (response: ScryfallCardDTO) =>
        mapCardToCardItem(response),
      providesTags: (_result, _error, id) => [{ type: 'Card', id }],
    }),
  }),
});

export const { useSearchCardsQuery, useGetCardByIdQuery } = scryfallApi;
