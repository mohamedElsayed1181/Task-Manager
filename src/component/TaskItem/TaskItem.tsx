import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { useState } from "react";
import type { Todo, Category } from "../../types";

import { useAppDispatch } from "../../store/hooks";
import Modal from "../../common/Modal/Modal";
import {
  deleteTodo,
  updateTodo,
} from "../../store/tasks/act/actTasksOperation";

export default function TaskItem({
  task,
  categories,
}: {
  task: Todo;
  categories: Category[];
}) {
  const dispatch = useAppDispatch();
  const [editing, setEditing] = useState(false);
  const { register, handleSubmit } = useForm<{
    todo: string;
    categoryId?: string;
  }>({ defaultValues: { todo: task.todo, categoryId: task.categoryId || "" } });

  function toggleComplete() {
    dispatch(updateTodo({ id: task.id, data: { completed: !task.completed } }));
  }
  function remove() {
    if (confirm("Are you sure you want to delete?"))
      dispatch(deleteTodo(task.id));
  }
  function onSave(data: any) {
    dispatch(updateTodo({ id: task.id, data }));
    setEditing(false);
  }

  const cat = categories.find((c) => c.id === task.categoryId);

  return (
    <div
      className="flex items-center justify-between 
  
      p-3 rounded shadow-sm transition-colors duration-300"
    >
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={toggleComplete}
          className="accent-primary"
        />
        <div>
          <div
            className={`font-medium ${
              task.completed
                ? "line-through text-gray-400 dark:text-gray-500"
                : ""
            }`}
          >
            {task.todo}
          </div>
          {cat && (
            <div className="text-sm" style={{ color: cat.color }}>
              {cat.name}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => setEditing(true)}
          aria-label="edit"
          className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <FiEdit />
        </button>
        <button
          onClick={remove}
          aria-label="delete"
          className="p-1 text-red-500 rounded hover:bg-red-100 dark:hover:bg-red-800"
        >
          <FiTrash2 />
        </button>
      </div>

      <Modal isOpen={editing} onClose={() => setEditing(false)}>
        <form onSubmit={handleSubmit(onSave)} className="space-y-3">
          <input
            className="w-full p-2 border rounded 
              border-gray-300 dark:border-gray-600 
             "
            {...register("todo", { required: true })}
          />
          <select
            {...register("categoryId")}
            className="w-full p-2 border rounded 
              border-gray-300 dark:border-gray-600 
             "
          >
            <option value="">Without category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="px-3 py-1 border rounded cursor-pointer
                border-gray-300 dark:border-gray-600 
                bg-gray-100 dark:bg-gray-800 
                text-gray-800 dark:text-gray-200
                hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-1 rounded cursor-pointer
                bg-primary text-white 
                dark:bg-gray-700 dark:text-gray-100
                hover:opacity-90"
            >
              Save
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
