export default function TodoItem({ todo, toggleTodo, removeTodo }) {
  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      padding: "12px",
      borderBottom: "1px solid #eee"
    }}>
      <span
        onClick={() => toggleTodo(todo.id)}
        style={{
          textDecoration: todo.done ? "line-through" : "none",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        {todo.text}
      </span>

      <button
        onClick={() => removeTodo(todo.id)}
        style={{
          background: "transparent",
          border: "none",
          color: "#ff5555",
          fontWeight: "bold",
          cursor: "pointer",
          fontSize: "18px"
        }}
      >
        ×
      </button>
    </div>
  );
}
