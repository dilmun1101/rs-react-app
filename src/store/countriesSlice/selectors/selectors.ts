import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '@/store/store';

const getCountriesState = (state: RootState) => state.countries;

export const selectCountries = createSelector(
  getCountriesState,
  (countries) => countries.items
);
