import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import recordsReducer from './formSlice/formSlice';
import countriesReducer from './countriesSlice/countriesSlice';

export const store = configureStore({
  reducer: {
    records: recordsReducer,
    countries: countriesReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
