// Interface defining the structure of a Todo item
export interface Todo {
  id: number; // Unique identifier for the todo
  todo: string; // The text content of the todo
  isDone: boolean; // Flag indicating if the todo is completed
  timestamp: Date; // Timestamp when the todo was created
}