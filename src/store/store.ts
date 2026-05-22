import { configureStore } from '@reduxjs/toolkit';
import cardReducer from './slices/cardsSlice';
import selectedReducer from './slices/selectedSlice';

export const store = configureStore({
  reducer: {
    cards: cardReducer,
    selected: selectedReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
