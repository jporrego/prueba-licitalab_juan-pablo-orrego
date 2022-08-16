import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import { Filters } from "../../types";

interface filterState {
  filters: Filters;
}
const initialState = {
  filters: {},
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    updateFilters: (state, action: PayloadAction<number>) => {},
  },
});

export const { updateFilters } = filtersSlice.actions;

export default filtersSlice.reducer;
