import { Droppable, Draggable } from "@hello-pangea/dnd";

import TaskItem from "../TaskItem/TaskItem";
import type { Todo, Category } from "../../types";


type Props = { items: Todo[]; categories: Category[] };

export default function TaskList({ items, categories }: Props) {
  return (
    <Droppable droppableId="tasks">
      {(provided) => (
        <ul
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="space-y-2"
        >
          {items.map((task, idx) => (
            <Draggable key={task.id} draggableId={String(task.id)} index={idx}>
              {(prov) => (
                <li
                  ref={prov.innerRef}
                  {...prov.draggableProps}
                  {...prov.dragHandleProps}
                >
                  <TaskItem task={task} categories={categories} />
                </li>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </ul>
      )}
    </Droppable>
  );
}
