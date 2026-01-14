import { useReducer } from "react";

export type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

type Action =
  | { type: "ADD_TODO"; payload: string }
  | { type: "REMOVE_TODO"; payload: string }
  | { type: "TOGGLE_TODO"; payload: string };

function todosReducer(state: Todo[], action: Action): Todo[] {
  switch (action.type) {
    case "ADD_TODO":
      return [
        ...state,
        {
          id: Date.now().toString(),
          text: action.payload,
          completed: false,
        },
      ];

    case "REMOVE_TODO":
  return state.filter(
    (todo) => !(todo.id === action.payload && todo.completed)
  );

    case "TOGGLE_TODO":
      return state.map((todo) =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );

    default:
      return state;
  }
}

export function useTodos() {
  const [todos, dispatch] = useReducer(todosReducer, []);

  const addTodo = (text: string) =>
    dispatch({ type: "ADD_TODO", payload: text });

  const removeTodo = (id: string) =>
    dispatch({ type: "REMOVE_TODO", payload: id });

  const toggleTodo = (id: string) =>
    dispatch({ type: "TOGGLE_TODO", payload: id });

  return { todos, addTodo, removeTodo, toggleTodo };
}

