// Importing React hooks and components for the app
import React, { useState } from "react";
import "./App.css";
import InputField from "./components/InputField";
import TodoList from "./components/TodoList";
// Importing drag and drop functionality from react-beautiful-dnd
import { DragDropContext, DropResult } from "react-beautiful-dnd";
// Importing the Todo interface
import { Todo } from "./models/models";

// Main App component that manages the entire todo application
const App: React.FC = () => {
  // State for the current todo input
  const [todo, setTodo] = useState<string>("");
  // State for the list of active todos
  const [todos, setTodos] = useState<Array<Todo>>([]);
  // State for the list of completed todos
  const [CompletedTodos, setCompletedTodos] = useState<Array<Todo>>([]);

  // Function to handle adding a new todo when form is submitted
  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if (todo) {
      // Adding a new todo with unique id, timestamp, and setting it as not done
      setTodos([...todos, { id: Date.now(), todo, isDone: false, timestamp: new Date() }]);
      // Clearing the input field after adding
      setTodo("");
    }
  };

  // Function to handle the end of a drag operation
  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    console.log(result);

    // If no destination, do nothing
    if (!destination) {
      return;
    }

    // If dropped in the same place, do nothing
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    let add;
    let active = todos;
    let complete = CompletedTodos;
    // Logic for the source of the drag
    if (source.droppableId === "TodosList") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    // Logic for the destination of the drag
    if (destination.droppableId === "TodosList") {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }

    // Updating the state with the new lists
    setCompletedTodos(complete);
    setTodos(active);
  };

  // Rendering the app with drag context, heading, input, and todo lists
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className="heading">Taskify</span>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <TodoList
          todos={todos}
          setTodos={setTodos}
          CompletedTodos={CompletedTodos}
          setCompletedTodos={setCompletedTodos}
        />
      </div>
    </DragDropContext>
  );
};

export default App;
