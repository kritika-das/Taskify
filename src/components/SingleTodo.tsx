// Importing React hooks and components
import React, { useEffect, useState } from "react";
import { useRef } from "react";
// Importing Todo interface and Draggable from react-beautiful-dnd
import { Todo } from "../models/models";
import { Draggable } from "react-beautiful-dnd";

// SingleTodo component for rendering individual todo items
const SingleTodo: React.FC<{
  index: number;
  todo: Todo;
  todos: Array<Todo>;
  setTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>;
}> = ({ index, todo, todos, setTodos }) => {
  // State for whether the todo is in edit mode
  const [edit, setEdit] = useState<boolean>(false);
  // State for the edited todo text
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  // Ref for the input field to focus when editing
  const inputRef = useRef<HTMLInputElement>(null);
  // Effect to focus the input when edit mode is enabled
  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  // Function to handle editing a todo
  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    // Updating the todo text in the todos array
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
    );
    // Exiting edit mode
    setEdit(false);
  };

  // Function to handle deleting a todo
  const handleDelete = (id: number) => {
    // Filtering out the todo with the given id
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Function to handle marking a todo as done or undone
  const handleDone = (id: number) => {
    // Toggling the isDone status of the todo
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  // Rendering the draggable todo item
  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided, snapshot) => (
        // Form for editing the todo
        <form
          onSubmit={(e) => handleEdit(e, todo.id)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={`todos__single ${snapshot.isDragging ? "drag" : ""}`}
        >
          {/* Conditional rendering: input for editing or span for displaying */}
          {edit ? (
            <input
              value={editTodo}
              onChange={(e) => setEditTodo(e.target.value)}
              className="todos__single--text"
              ref={inputRef}
            />
          ) : todo.isDone ? (
            // Strikethrough text for completed todos
            <s className="todos__single--text">{todo.todo}</s>
          ) : (
            // Normal text for active todos
            <span className="todos__single--text">{todo.todo}</span>
          )}
          {/* Display timestamp */}
          <div className="timestamp">
            {todo.timestamp.toLocaleString()}
          </div>
          {/* Action icons */}
          <div>
            <span
              className="icon"
              onClick={() => {
                if (!edit && !todo.isDone) {
                  setEdit(!edit);
                }
              }}
            >
              ✏️
            </span>
            {/* Delete icon */}
            <span className="icon" onClick={() => handleDelete(todo.id)}>
              🗑️
            </span>
            {/* Done icon */}
            <span className="icon" onClick={() => handleDone(todo.id)}>
              ✅
            </span>
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default SingleTodo;