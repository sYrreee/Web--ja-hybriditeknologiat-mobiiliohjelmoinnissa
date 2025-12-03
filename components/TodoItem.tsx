import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  text: string;
  onDelete: () => void;
};

export default function TodoItem({ text, onDelete }: Props): JSX.Element {
  return (
    <Pressable onPress={onDelete}>
      <View style={styles.item}>
        <Text style={styles.text}>{text}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 15,
    backgroundColor: "#f4f4f4",
    marginVertical: 6,
    borderRadius: 8,
  },
  text: {
    fontSize: 16,
  },
});


