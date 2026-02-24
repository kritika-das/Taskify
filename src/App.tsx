// Importing React hooks and components for the app
import React, { useState, useEffect } from "react";
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
  // State for the list of active todos, loaded from localStorage
  const [todos, setTodos] = useState<Array<Todo>>(() => {
    const savedTodos = localStorage.getItem("activeTodos");
    return savedTodos ? JSON.parse(savedTodos).map((todo: any) => ({
      ...todo,
      timestamp: new Date(todo.timestamp)
    })) : [];
  });
  // State for the list of completed todos, loaded from localStorage
  const [CompletedTodos, setCompletedTodos] = useState<Array<Todo>>(() => {
    const savedCompleted = localStorage.getItem("completedTodos");
    return savedCompleted ? JSON.parse(savedCompleted).map((todo: any) => ({
      ...todo,
      timestamp: new Date(todo.timestamp)
    })) : [];
  });

  // Effect to save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("activeTodos", JSON.stringify(todos));
  }, [todos]);

  // Effect to save completed todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("completedTodos", JSON.stringify(CompletedTodos));
  }, [CompletedTodos]);

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
        <span className="heading">My Tasks</span>
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
