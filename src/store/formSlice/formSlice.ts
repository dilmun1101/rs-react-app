import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FormProps, FormSubmitData } from '@/store/formSlice/types/types';

interface FormState {
  items: FormProps[];
}

const initialState: FormState = {
  items: [],
};

const formSlice = createSlice({
  name: 'records',
  initialState,
  reducers: {
    addRecord(state, action: PayloadAction<FormSubmitData>) {
      state.items.unshift({
        ...action.payload,
        id: crypto.randomUUID(),
        isNew: true,
      });
    },
    clearNewFlag(state, action: PayloadAction<string>) {
      const item = state.items.find((el) => el.id === action.payload);
      if (item) {
        item.isNew = false;
      }
    },
  },
});

export const { addRecord, clearNewFlag } = formSlice.actions;
export default formSlice.reducer;
