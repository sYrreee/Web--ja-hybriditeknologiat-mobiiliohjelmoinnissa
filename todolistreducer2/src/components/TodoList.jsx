import TodoItem from "./TodoItem";

export default function TodoList({ todos, toggleTodo, removeTodo }) {
  return (
    <div style={{
      background: "white",
      borderRadius: "10px",
      boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
    }}>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleTodo={toggleTodo}
          removeTodo={removeTodo}
        />
      ))}
    </div>
  );
}
