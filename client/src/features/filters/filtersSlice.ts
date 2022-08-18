import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Filters as FiltersType } from "../../types";

interface filterState {
  filters: FiltersType;
}
const initialState: filterState = {
  filters: {
    content: "",
    dateRange: { startDate: "", endDate: "" },
    taskState: [],
  },
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    updateFilters: (state, action: PayloadAction<FiltersType>) => {
      state.filters = action.payload;
      /*
      state.filters = {
        content: action.payload.content,
        dateRange: [],
        taskState: action.payload.taskState,
      };*/
    },
  },
});

export const { updateFilters } = filtersSlice.actions;

export const selectFilters = (state: RootState) => state.filters.filters;

export default filtersSlice.reducer;
