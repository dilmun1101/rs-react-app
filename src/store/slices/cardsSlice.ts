import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { CardItem } from '../../shared/constants/types';

interface CardsState {
  items: CardItem[];
  isLoading: boolean;
  error: string | null;
  hasMore: boolean;
}

const initialState: CardsState = {
  items: [],
  isLoading: false,
  error: null,
  hasMore: false,
};

const cardSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<CardItem[]>) {
      state.items = action.payload;
    },
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    setHasMore(state, action: PayloadAction<boolean>) {
      state.hasMore = action.payload;
    },
  },
});

export const { setItems, setIsLoading, setError, setHasMore } =
  cardSlice.actions;
export default cardSlice.reducer;
