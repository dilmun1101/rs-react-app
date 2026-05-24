import { createSlice } from '@reduxjs/toolkit';
import type { CardItem } from '../../shared/constants/types';
import { fetchCards } from '../thunks/thunks';

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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCards.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCards.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload.items;
        state.hasMore = action.payload.hasMore;
      })
      .addCase(fetchCards.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? action.error.message ?? 'Unknown error';
        state.items = [];
        state.hasMore = false;
      });
  },
});

export default cardSlice.reducer;
