import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '@/store/store';

const getRecordsState = (state: RootState) => state.records;

export const selectAllRecords = createSelector(
  getRecordsState,
  (records) => records.items
);

export const selectRecordsCount = createSelector(
  selectAllRecords,
  (items) => items.length
);

export const selectLatestRecord = createSelector(
  selectAllRecords,
  (items) => items[0] ?? null
);
