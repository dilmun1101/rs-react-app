import { configureStore } from '@reduxjs/toolkit';
import selectedReducer from './selectedSlice/selectedSlice';
import { setupListeners } from '@reduxjs/toolkit/query';
import { scryfallApi } from '@/api/scryfall-api';

export const store = configureStore({
  reducer: {
    [scryfallApi.reducerPath]: scryfallApi.reducer,
    selected: selectedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(scryfallApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
