import { configureStore } from '@reduxjs/toolkit';
import selectedReducer from './selectedSlice/selectedSlice';
import { setupListeners } from '@reduxjs/toolkit/query';
import { scryfallApi } from '@/api/scryfall-api';

export const makeStore = () => {
  const store = configureStore({
    reducer: {
      [scryfallApi.reducerPath]: scryfallApi.reducer,
      selected: selectedReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(scryfallApi.middleware),
  });

  setupListeners(store.dispatch);
  return store;
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
