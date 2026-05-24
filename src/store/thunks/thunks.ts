import { createAsyncThunk } from '@reduxjs/toolkit';
import { scryfallService } from '../../api/service/scryfall-service';
import type { SearchCardsResult } from '../../shared/constants/types';
import { UI_MESSAGES } from '@/shared/constants/messages';

export const fetchCards = createAsyncThunk<
  SearchCardsResult,
  { query: string; page: number },
  { rejectValue: string }
>('cards/fetchCards', async ({ query, page }, { rejectWithValue }) => {
  try {
    return await scryfallService.searchCards(query, page);
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : UI_MESSAGES.UNKNOWN_ERROR
    );
  }
});
