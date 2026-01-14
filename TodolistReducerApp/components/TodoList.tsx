import React from "react";
import { View } from "react-native";
import { Todo } from "../hooks/useTodos";
import TodoItem from "./TodoItem";

type Props = {
  items: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function TodoList({ items, onToggle, onDelete }: Props) {
  return (
    <View>
      {items.map((item) => (
        <TodoItem
          key={item.id}
          text={item.text}
          completed={item.completed}
          onToggle={() => onToggle(item.id)}
          onDelete={() => onDelete(item.id)}
        />
      ))}
    </View>
  );
}



