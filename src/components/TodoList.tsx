// Importing React and necessary components for the todo list
import React from "react";
import { Todo } from "../models/models";
import SingleTodo from "./SingleTodo";
// Importing Droppable from react-beautiful-dnd for drag and drop
import { Droppable } from "react-beautiful-dnd";

// Interface for the props of TodoList component
interface props {
  todos: Array<Todo>;
  setTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>;
  setCompletedTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>;
  CompletedTodos: Array<Todo>;
}

// TodoList component that renders the active and completed todo sections
const TodoList: React.FC<props> = ({
  todos,
  setTodos,
  CompletedTodos,
  setCompletedTodos,
}) => {
  return (
    // Container div for the two todo columns
    <div className="container">
      {/* Droppable area for active todos */}
      <Droppable droppableId="TodosList">
        {(provided, snapshot) => (
          <div
            className={`todos ${snapshot.isDraggingOver ? "dragactive" : ""}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {/* Heading for active tasks with emoji */}
            <span className="todos__heading">🌸 Active Tasks 🌸</span>
            {/* Mapping over active todos to render SingleTodo components */}
            {todos?.map((todo, index) => (
              <SingleTodo
                index={index}
                todos={todos}
                todo={todo}
                key={todo.id}
                setTodos={setTodos}
              />
            ))}
            {/* Placeholder for drag and drop */}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      {/* Droppable area for completed todos */}
      <Droppable droppableId="TodosRemove">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`todos  ${
              snapshot.isDraggingOver ? "dragcomplete" : "remove"
            }`}
          >
            {/* Heading for completed tasks with emoji */}
            <span className="todos__heading">💖 Completed Tasks 💖</span>
            {/* Mapping over completed todos to render SingleTodo components */}
            {CompletedTodos?.map((todo, index) => (
              <SingleTodo
                index={index}
                todos={CompletedTodos}
                todo={todo}
                key={todo.id}
                setTodos={setCompletedTodos}
              />
            ))}
            {/* Placeholder for drag and drop */}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TodoList;