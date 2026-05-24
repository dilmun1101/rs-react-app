import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '@/store/store';

const getSelectedState = (state: RootState) => state.selected;

export const selectSelectedCards = createSelector(
  getSelectedState,
  (selected) => selected.selectedCards
);

export const selectSelectedCount = createSelector(
  selectSelectedCards,
  (selectedCards) => selectedCards.length
);

export const selectIsCardSelected = createSelector(
  [selectSelectedCards, (_state: RootState, cardId: string) => cardId],
  (selectedCards, cardId) => selectedCards.some((item) => item.id === cardId)
);
