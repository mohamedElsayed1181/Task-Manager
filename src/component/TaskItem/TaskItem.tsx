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
    <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 p-3 rounded">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={toggleComplete}
        />
        <div>
          <div
            className={`font-medium ${
              task.completed ? "line-through text-gray-400" : ""
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
        <button onClick={() => setEditing(true)} aria-label="edit">
          <FiEdit />
        </button>
        <button onClick={remove} aria-label="delete" className="text-red-500">
          <FiTrash2 />
        </button>
      </div>

      <Modal isOpen={editing} onClose={() => setEditing(false)}>
        <form onSubmit={handleSubmit(onSave)} className="space-y-3">
          <input
            className="w-full p-2 border rounded"
            {...register("todo", { required: true })}
          />
          <select
            {...register("categoryId")}
            className="w-full p-2 border rounded"
          >
            <option value="">Without category </option>
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
              className="px-3 py-1 border rounded cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-1 bg-primary text-white rounded cursor-pointer"
            >
              Save
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
