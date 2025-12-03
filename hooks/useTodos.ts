import { useReducer } from "react";

export type Todo = {
  id: number;
  text: string;
};

type Action =
  | { type: "ADD"; text: string }
  | { type: "DELETE"; id: number };

function reducer(state: Todo[], action: Action): Todo[] {
  switch (action.type) {
    case "ADD":
      return [...state, { id: Date.now(), text: action.text }];
    case "DELETE":
      return state.filter((t) => t.id !== action.id);
    default:
      return state;
  }
}

export function useTodos() {
  const [todos, dispatch] = useReducer(reducer, []);

  const addTodo = (text: string) => dispatch({ type: "ADD", text });
  const deleteTodo = (id: number) => dispatch({ type: "DELETE", id });

  return { todos, addTodo, deleteTodo };
}

