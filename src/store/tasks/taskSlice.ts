import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import {
  createTodo,
  deleteTodo,
  fetchTodos,
  updateTodo,
} from "../tasks/act/actTasksOperation";
import type { Todo } from "../../types";

interface TasksState {
  items: Todo[];
  loading: boolean;
  error?: string | null;
}

const initialState: TasksState = {
  items: [],
  loading: false,
  error: null,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    reorderLocal(state, action: PayloadAction<Todo[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(fetchTodos.fulfilled, (s, a) => {
        s.loading = false;
        s.items = a.payload.map((t, idx) => ({ ...t, order: idx }));
      })
      .addCase(fetchTodos.rejected, (s, a) => {
        s.loading = false;
        s.error = String(a.payload || a.error?.message);
      })

      .addCase(createTodo.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(createTodo.fulfilled, (s, a) => {
        s.loading = false;
        s.items.unshift(a.payload);
      })
      .addCase(createTodo.rejected, (s, a) => {
        s.loading = false;
        s.error = String(a.payload || a.error?.message);
      })

      .addCase(updateTodo.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(updateTodo.fulfilled, (s, a) => {
        s.loading = false;
        s.items = s.items.map((it) =>
          it.id === a.payload.id ? a.payload : it
        );
      })
      .addCase(updateTodo.rejected, (s, a) => {
        s.loading = false;
        s.error = String(a.payload || a.error?.message);
      })

      .addCase(deleteTodo.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(deleteTodo.fulfilled, (s, a) => {
        s.loading = false;
        s.items = s.items.filter((it) => it.id !== a.payload);
      })
      .addCase(deleteTodo.rejected, (s, a) => {
        s.loading = false;
        s.error = String(a.payload || a.error?.message);
      });
  },
});

export const { reorderLocal } = tasksSlice.actions;
export default tasksSlice.reducer;
