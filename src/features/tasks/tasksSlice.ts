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
      description: "Comprar comida para el perro",
      creationDate: new Date(new Date().getTime() - 520000000),
      dueDate: new Date(new Date().getTime() + 1200000000),
    },
    {
      _id: "2",
      description: "LLamar a papá",
      creationDate: new Date(new Date().getTime() - 250000000),
      dueDate: new Date(new Date().getTime() - 120000000),
    },
    {
      _id: "3",
      description: "Juntarse en el bar con el grupo de la universidad",
      creationDate: new Date(new Date().getTime() - 200000000),
      dueDate: new Date(new Date()),
    },
    {
      _id: "4",
      description: "Pagar las cuentas de la casa",
      creationDate: new Date(new Date().getTime() - 10000000),
      dueDate: new Date(new Date().getTime() + 1200000000),
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
