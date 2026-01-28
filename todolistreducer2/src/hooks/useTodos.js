import { useReducer } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "ADD_TODO":
      return [
        ...state,
        { id: Date.now(), text: action.text, done: false }
      ];

    case "REMOVE_TODO":
      return state.filter(todo => todo.id !== action.id);

    case "TOGGLE_TODO":
      return state.map(todo =>
        todo.id === action.id
          ? { ...todo, done: !todo.done }
          : todo
      );

    default:
      return state;
  }
}

export default function useTodos() {
  const [todos, dispatch] = useReducer(reducer, []);

  const addTodo = (text) => {
    dispatch({ type: "ADD_TODO", text });
  };

  const removeTodo = (id) => {
    dispatch({ type: "REMOVE_TODO", id });
  };

  const toggleTodo = (id) => {
    dispatch({ type: "TOGGLE_TODO", id });
  };

  return { todos, addTodo, removeTodo, toggleTodo };
}
