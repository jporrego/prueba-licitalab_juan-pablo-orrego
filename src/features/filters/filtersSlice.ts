import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import { Filters as FiltersType } from "../../types";

interface filterState {
  filters: FiltersType;
}
const initialState: filterState = {
  filters: { content: null, dateRange: null, taskState: null },
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    updateFilters: (state, action: PayloadAction<FiltersType>) => {
      state.filters = action.payload;
    },
  },
});

export const { updateFilters } = filtersSlice.actions;

export default filtersSlice.reducer;
