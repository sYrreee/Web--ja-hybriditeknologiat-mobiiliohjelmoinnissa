import React from "react";
import { View } from "react-native";
import { Todo } from "../hooks/useTodos";
import TodoItem from "./TodoItem";

type Props = {
  items: Todo[];
  onDelete: (id: number) => void;
};

export default function TodoList({ items, onDelete }: Props): JSX.Element {
  return (
    <View>
      {items.map((item) => (
        <TodoItem
          key={item.id}
          text={item.text}
          onDelete={() => onDelete(item.id)}
        />
      ))}
    </View>
  );
}

