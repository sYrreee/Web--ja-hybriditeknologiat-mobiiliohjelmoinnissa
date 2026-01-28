import { useReducer } from 'react';

export interface Task {
  id: string;
  text: string;
  done: boolean;
}

type Action =
  | { type: 'ADD_TODO'; payload: string }
  | { type: 'TOGGLE_TODO'; payload: string }
  | { type: 'REMOVE_TODO'; payload: string };

function todoReducer(state: Task[], action: Action): Task[] {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, { id: Date.now().toString(), text: action.payload, done: false }];
    case 'TOGGLE_TODO':
      return state.map(todo =>
        todo.id === action.payload ? { ...todo, done: !todo.done } : todo
      );
    case 'REMOVE_TODO':
      return state.filter(todo => todo.id !== action.payload);
    default:
      return state;
  }
}

export function useTodos() {
  const initialState: Task[] = [
    { id: '1', text: 'Xvjjj', done: true },
    { id: '2', text: 'asd', done: false }
  ];

  const [todos, dispatch] = useReducer(todoReducer, initialState);

  const addTodo = (text: string) => dispatch({ type: 'ADD_TODO', payload: text });
  const toggleTodo = (id: string) => dispatch({ type: 'TOGGLE_TODO', payload: id });
  const removeTodo = (id: string) => dispatch({ type: 'REMOVE_TODO', payload: id });

  return { todos, addTodo, toggleTodo, removeTodo };
}

