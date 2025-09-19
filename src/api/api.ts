import axios from "axios";

import { BASE } from "../constants/config";
import type { Todo } from "../types";

const api = axios.create({
  baseURL: BASE,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

export const todosApi = {
  async fetchTodos() {
    const res = await api.get("/todos");
    return res.data.todos as Todo[];
  },
  async fetchTodo(id: number) {
    const res = await api.get(`/todos/${id}`);
    return res.data as Todo;
  },
  async createTodo(payload: Partial<Todo>) {
    const res = await api.post("/todos/add", payload);
    return res.data as Todo;
  },
  async updateTodo(id: number, payload: Partial<Todo>) {
    const res = await api.put(`/todos/${id}`, payload);
    return res.data as Todo;
  },
  async deleteTodo(id: number) {
    const res = await api.delete(`/todos/${id}`);
    return res.data;
  },
};

export default api;
