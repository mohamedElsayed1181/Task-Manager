import { createAsyncThunk } from "@reduxjs/toolkit";
import { todosApi } from "../../../api/api";
import type { Todo } from "../../../types";

export const fetchTodos = createAsyncThunk(
  "tasks/fetchTodos",
  async (_, { rejectWithValue }) => {
    try {
      const todos = await todosApi.fetchTodos();
      return todos;
    } catch (err: any) {
      return rejectWithValue(err.message || "Failed to fetch todos");
    }
  }
);

export const createTodo = createAsyncThunk(
  "tasks/createTodo",
  async (payload: Partial<Todo>, { rejectWithValue }) => {
    try {
      const todo = await todosApi.createTodo({
        ...payload,
        userId: 1, 
      });
      return todo;
    } catch (err: any) {
      return rejectWithValue(err.message || "Failed to create todo");
    }
  }
);


export const updateTodo = createAsyncThunk(
  "tasks/updateTodo",
  async (
    { id, data }: { id: number; data: Partial<Todo> },
    { rejectWithValue }
  ) => {
    try {
      const todo = await todosApi.updateTodo(id, data);
      return todo;
    } catch (err: any) {
      return rejectWithValue(err.message || "Failed to update todo");
    }
  }
);

export const deleteTodo = createAsyncThunk(
  "tasks/deleteTodo",
  async (id: number, { rejectWithValue }) => {
    try {
      await todosApi.deleteTodo(id);
      return id;
    } catch (err: any) {
      return rejectWithValue(err.message || "Failed to delete todo");
    }
  }
);
