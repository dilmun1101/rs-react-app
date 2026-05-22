import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../store';

const getCardsState = (state: RootState) => state.cards;
const getSelectedState = (state: RootState) => state.selected;

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

export const selectSelectedCards = createSelector(
  getSelectedState,
  (selected) => selected.selectedCards
);

export const selectSelectedCount = createSelector(
  getSelectedState,
  (selected) => selected.selectedCards.length
);
