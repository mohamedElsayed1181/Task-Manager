import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../store/hooks";
import { createTodo } from "../../store/tasks/act/actTasksOperation";
import Button from "../../common/Button/Button";
import type { Category } from "../../types";

type Props = { categories: Category[] };

export default function TaskForm({ categories }: Props) {
  const { register, handleSubmit, reset } = useForm<{
    todo: string;
    categoryId?: string;
  }>();
  const dispatch = useAppDispatch();

  const onSubmit = (data: any) => {
    dispatch(
      createTodo({
        todo: data.todo,
        completed: false,
        categoryId: data.categoryId || null,
      })
    );
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col md:flex-row gap-2 w-full"
    >
      <input
        {...register("todo", { required: true })}
        placeholder="Add a task..."
        className="input flex-1"
      />

      <select
        {...register("categoryId")}
        className="p-2 border rounded-2xl
                 
                   focus:ring-2 focus:ring-blue-500 outline-none transition"
      >
        <option value="">Without category</option>
        {categories.map((c: Category) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      <Button type="submit" className="btn-primary w-full md:w-auto">
        Add
      </Button>
    </form>
  );
}
