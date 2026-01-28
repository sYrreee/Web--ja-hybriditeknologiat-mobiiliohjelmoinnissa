import "./App.css";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import useTodos from "./hooks/useTodos";

function App() {
  const { todos, addTodo, removeTodo, toggleTodo } = useTodos();

  return (
    <div style={{
      maxWidth: "400px",
      margin: "40px auto",
      fontFamily: "Arial, sans-serif"
    }}>
      <h2 style={{
        textAlign: "center",
        marginBottom: "20px",
        color: "#6c47ff"
      }}>
        Simple Todo
      </h2>

      <TodoInput addTodo={addTodo} />

      <TodoList
        todos={todos}
        removeTodo={removeTodo}
        toggleTodo={toggleTodo}
      />
    </div>
  );
}

export default App;

