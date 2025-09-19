import { DragDropContext } from "@hello-pangea/dnd";
import type { DropResult } from "@hello-pangea/dnd";

import { useEffect, useMemo, useState } from "react";

import { reorderLocal } from "../../store/tasks/taskSlice";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import Filters from "../../features/Filters/Filters";
import type { Todo } from "../../types";
import Header from "../Header/Header";
import TaskList from "../TaskList/TaskList";
import TaskForm from "../TaskForm/TaskForm";
import CategoryManager from "../CategoryManager/CategoryManager";
import { fetchTodos } from "../../store/tasks/act/actTasksOperation";
import Loading from "../../common/Loading/Loading";

function Home() {
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector((s) => s.tasks);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [categories, setCategories] = useLocalStorage(
    "categories",
    [] as any[]
  );
  const [theme, setTheme] = useLocalStorage<"light" | "dark">("theme", "light");

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const visible = useMemo(() => {
    return items
      .filter((t) =>
        filter === "all"
          ? true
          : filter === "active"
          ? !t.completed
          : t.completed
      )
      .filter((t) => t.todo.toLowerCase().includes(query.toLowerCase()));
  }, [items, filter, query]);

  function onDragEnd(result: DropResult) {
    if (!result.destination) return;
    const src = result.source.index;
    const dest = result.destination.index;
    const copy = Array.from(visible);
    const [moved] = copy.splice(src, 1);
    copy.splice(dest, 0, moved);
    const newAll = items
      .map((it) => {
        const found = copy.find((c) => c.id === it.id);
        return found ? { ...it, order: copy.indexOf(found) } : it;
      })
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    dispatch(reorderLocal(newAll as Todo[]));
  }

  return (
    <div className="min-h-screen p-4 max-w-6xl mx-auto">
      <Header theme={theme} setTheme={setTheme} />

      <main className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <section className="md:col-span-2 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 w-full">
            <TaskForm categories={categories} />
            <Filters
              query={query}
              setQuery={setQuery}
              filter={filter}
              setFilter={setFilter}
            />
          </div>

          <div className="card">
            {loading && <div><Loading /></div>}

            {error && (
              <div className="text-red-500 dark:text-red-400">
                Error: {error}
              </div>
            )}

            {!loading && visible.length === 0 && (
              <div className="text-gray-500 dark:text-gray-400 p-4">
                There are no tasks
              </div>
            )}

            <DragDropContext onDragEnd={onDragEnd}>
              <TaskList items={visible} categories={categories} />
            </DragDropContext>
          </div>
        </section>

        <aside className="space-y-4 mt-15">
          <CategoryManager
            categories={categories}
            setCategories={setCategories}
          />

          <div className="card">
            <h3 className="font-semibold mb-3">Statistics</h3>
            <div className="space-y-1 text-sm">
              <p>Total tasks: {items.length}</p>
              <p>Completed: {items.filter((t) => t.completed).length}</p>
              <p>Incomplete: {items.filter((t) => !t.completed).length}</p>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}

export default Home;
