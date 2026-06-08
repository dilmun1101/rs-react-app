import { createSlice } from '@reduxjs/toolkit';
import { COUNTRIES } from '@/shared/ui/country-autocomplete/constants/countries';
import type { Country } from '@/shared/ui/country-autocomplete/constants/countries';

interface CountriesState {
  items: Country[];
}

const initialState: CountriesState = {
  items: [...COUNTRIES],
};

const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {},
});

export default countriesSlice.reducer;
