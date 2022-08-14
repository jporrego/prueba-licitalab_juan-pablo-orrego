import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import { Task } from "../../types";
import { format, formatDistance, formatRelative, subDays } from "date-fns";
var add = require("date-fns/add");

interface taskState {
  tasks: Task[];
  status: "idle" | "loading" | "failed" | "succeeded";
  error: string | undefined;
}

const initialState: taskState = {
  tasks: [
    {
      _id: "1",
      description:
        "Buy groceries Buy groceries Buy groceries Buy groceries Buy groceries Buy groceries Buy groceries Buy groceries Buy groceries Buy groceries Buy groceries  Buy groceries Buy groceries Buy groceries Buy groceries",
      creationDate: new Date(),
      dueDate: new Date(),
    },
    {
      _id: "2",
      description: "Water plants",
      creationDate: new Date(),
      dueDate: new Date(),
    },
    {
      _id: "2",
      description: "Water plants",
      creationDate: new Date(),
      dueDate: new Date(),
    },
    {
      _id: "2",
      description: "Water plants",
      creationDate: new Date(),
      dueDate: new Date(),
    },
    {
      _id: "2",
      description: "Water plants",
      creationDate: new Date(),
      dueDate: new Date(),
    },
    {
      _id: "2",
      description: "Water plants",
      creationDate: new Date(),
      dueDate: new Date(),
    },
    {
      _id: "2",
      description: "Water plants",
      creationDate: new Date(),
      dueDate: new Date(),
    },
  ],
  status: "idle",
  error: "",
};

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  if (process.env.REACT_APP_API_URL !== undefined) {
    const response = await fetch(process.env.REACT_APP_API_URL + "api/tasks");
    const data = response.json();
    return data;
  }
});

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
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
        state.error = "action.error.message";
      });
  },
});

export const {} = tasksSlice.actions;

export const selectTasks = (state: RootState) => state.tasks.tasks;

export default tasksSlice.reducer;
