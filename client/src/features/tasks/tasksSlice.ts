import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter,
  PayloadAction,
} from "@reduxjs/toolkit";
import compareAsc from "date-fns/compareAsc";
import { RootState, AppThunk } from "../../app/store";
import { Task, Filters } from "../../types";

interface taskState {
  tasks: Task[];
  order: string;
  status: "idle" | "loading" | "failed" | "succeeded";
  error: string | undefined;
}

const initialState: taskState = {
  tasks: [],
  order: "creationDate",
  status: "idle",
  error: "",
};

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  try {
    const response = await fetch("http://localhost:4050/");
    const data = response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
});

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    sortByCreationDate: (state) => {
      state.tasks = state.tasks.sort(
        (task1, task2) =>
          Number(new Date(task2.creationDate)) -
          Number(new Date(task1.creationDate))
      );
      state.order = "creationDate";
    },
    sortByDueDate: (state) => {
      state.tasks = state.tasks.sort(
        (task1, task2) =>
          Number(new Date(task2.dueDate)) - Number(new Date(task1.dueDate))
      );
      state.order = "dueDate";
    },
    sortByState: (state) => {
      state.tasks = state.tasks.sort(
        (task1, task2) =>
          Number(new Date(task1.dueDate)) - Number(new Date(task2.dueDate))
      );
      state.order = "state";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTasks.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { sortByCreationDate, sortByDueDate, sortByState } =
  tasksSlice.actions;

export const selectTasks = (state: RootState) => state.tasks.tasks;

export const selectFilteredTasks = (state: RootState) => {
  const tasks = [...state.tasks.tasks];
  const filters = state.filters.filters;

  let filteredTasks: Task[] = [];

  // Filter the tasks that match the states and add them to the filtered array.
  if (filters.taskState.length > 0) {
    filters.taskState.forEach((state) => {
      if (state === "expired") {
        filteredTasks = filteredTasks.concat(
          tasks.filter((task) => compareAsc(new Date(), task.dueDate) === 1)
        );
      }
      if (state === "pending") {
        filteredTasks = filteredTasks.concat(
          tasks.filter((task) => compareAsc(new Date(), task.dueDate) !== 1)
        );
      }
    });
  } else {
    filteredTasks = tasks;
  }

  // Aplly text content filter
  filteredTasks = filteredTasks.filter((task) =>
    task.description.toLowerCase().includes(filters.content.toLowerCase())
  );

  return filteredTasks;
};

export const selectTasksStatus = (state: RootState) => state.tasks.status;
export const selectTasksOrder = (state: RootState) => state.tasks.order;

export default tasksSlice.reducer;
