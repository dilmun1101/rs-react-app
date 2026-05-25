import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '@/store/store';

const getCardsState = (state: RootState) => state.cards;

export const selectCards = createSelector(
  getCardsState,
  (cards) => cards.items
);

export const selectIsLoading = createSelector(
  getCardsState,
  (cards) => cards.isLoading
);

export const selectError = createSelector(
  getCardsState,
  (cards) => cards.error
);

export const selectHasMore = createSelector(
  getCardsState,
  (cards) => cards.hasMore
);
