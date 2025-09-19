import { v4 as uuid } from "uuid";
import { useState } from "react";
import type { Category } from "../../types";
import Button from "../../common/Button/Button";

export default function CategoryManager({ categories, setCategories }: any) {
  const [name, setName] = useState("");
  const [color, setColor] = useState("#f97316");

  function addCategory() {
    if (!name.trim()) return;
    const cat: Category = { id: uuid(), name: name.trim(), color };
    setCategories([cat, ...categories]);
    setName("");
  }

  function removeCategory(id: string) {
    setCategories(categories.filter((c: Category) => c.id !== id));
  }

  return (
    <div className="card">
      <h3 className="font-semibold mb-3">Categories</h3>
      <div className="flex gap-2">
        <input
          className="input flex-1"
          placeholder="Category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="h-10 w-10 "
        />
        <Button className="cursor-pointer" onClick={addCategory}>Add</Button>
      </div>
      <ul className="mt-3 space-y-2">
        {categories.map((c: Category) => (
          <li key={c.id} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span
                style={{ background: c.color }}
                className="w-4 h-4 rounded-full inline-block"
              />
              <span>{c.name}</span>
            </div>
            <button
              onClick={() => removeCategory(c.id)}
              className="text-sm text-red-500 hover:underline"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
