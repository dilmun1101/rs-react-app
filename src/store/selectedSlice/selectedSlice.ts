import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CardItem } from '../../shared/constants/types';

interface SelectedState {
  selectedCards: CardItem[];
}

const initialState: SelectedState = {
  selectedCards: [],
};

const selectedSlice = createSlice({
  name: 'selected',
  initialState,
  reducers: {
    selectItem(state, action: PayloadAction<CardItem>) {
      const exists = state.selectedCards.some(
        (item) => item.id === action.payload.id
      );
      if (!exists) {
        state.selectedCards.push(action.payload);
      }
    },
    unselectItem(state, action: PayloadAction<string>) {
      state.selectedCards = state.selectedCards.filter(
        (item) => item.id !== action.payload
      );
    },
    unselectAll(state) {
      state.selectedCards = [];
    },
  },
});

export const { selectItem, unselectItem, unselectAll } = selectedSlice.actions;
export default selectedSlice.reducer;
