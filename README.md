**Task Manager — React + TypeScript + Tailwind + Redux Toolkit**

This project is a simple Task Manager app built with modern frontend tools. It demonstrates React, TypeScript, TailwindCSS, Redux Toolkit, react-hook-form, and Axios for API integration. It also supports dark/light mode, drag & drop, and local categories.

**Features**

React + TypeScript (Vite)

TailwindCSS with dark/light theme

Redux Toolkit with createAsyncThunk

Axios for API requests

react-hook-form for form handling

Drag & Drop with @hello-pangea/dnd

Categories stored in localStorage

Dark/Light toggle stored in localStorage

**Clone the project and install dependencies**:
npm install
**Run in development mode**:
npm run dev

**API Notes (DummyJSON)**

Base URL: https://dummyjson.com

Fetch all todos → GET /todos

Fetch single todo → GET /todos/:id

Create todo → POST /todos/add
Requires { todo, completed, userId }

Update todo → PUT /todos/:id
Works only on existing todos from /todos

Delete todo → DELETE /todos/:id

DummyJSON does not persist new todos — POST /todos/add returns a fake record, but it’s not really saved for later updates. For real persistence, use json-server locally.
