import { useState } from "react";

export default function TodoInput({ addTodo }) {
  const [text, setText] = useState("");

  const handleAdd = () => {
    if (text.trim()) {
      addTodo(text);
      setText("");
    }
  };

  return (
    <div style={{
      display: "flex",
      gap: "8px",
      marginBottom: "10px"
    }}>
      <input
        style={{
          flex: 1,
          padding: "10px",
          borderRadius: "6px",
          border: "1px solid #ccc"
        }}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new task"
      />
      <button
        style={{
          padding: "10px 16px",
          border: "none",
          background: "#6c47ff",
          color: "white",
          borderRadius: "6px",
          cursor: "pointer"
        }}
        onClick={handleAdd}
      >
        Add
      </button>
    </div>
  );
}
