// Importing React and styles for the input field component
import React, { useRef } from "react";
import "./styles.css";

// Interface defining the props for the InputField component
interface props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent) => void;
}

// InputField component for entering new todos
const InputField: React.FC<props> = ({ todo, setTodo, handleAdd }) => {
  // Ref to access the input element for focusing/blurring
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    // Form that handles submission and blurs the input after adding
    <form
      className="input"
      onSubmit={(e) => {
        handleAdd(e);
        inputRef.current?.blur();
      }}
    >
      {/* Input field for typing the todo text */}
      <input
        type="text"
        placeholder="Enter a Task 💕"
        value={todo}
        ref={inputRef}
        onChange={(e) => setTodo(e.target.value)}
        className="input__box"
      />
      {/* Submit button to add the todo */}
      <button type="submit" className="input_submit">
        ✨ GO ✨
      </button>
    </form>
  );
};

export default InputField;