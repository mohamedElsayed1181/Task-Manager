export interface Category {
  id: string;
  name: string;
  color: string; 
}

export interface Todo {
  id: number;
  todo: string;
  completed: boolean;
  userId?: number;
  order?: number; 
  categoryId?: string | null;
}
