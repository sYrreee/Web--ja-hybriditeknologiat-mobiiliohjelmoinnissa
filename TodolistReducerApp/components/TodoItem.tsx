import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";

type Props = {
  text: string;
  completed: boolean;
  onToggle: () => void;
  onDelete: () => void;
};

export default function TodoItem({
  text,
  completed,
  onToggle,
  onDelete,
}: Props) {
  return (
    <Pressable onPress={onToggle} onLongPress={onDelete}>
      <Text style={[styles.text, completed && styles.completed]}>
        {text}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    paddingVertical: 8,
  },
  completed: {
    textDecorationLine: "line-through",
    color: "#999",
  },
});




