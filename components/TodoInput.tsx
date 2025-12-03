import React, { useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";

type Props = {
  onAdd: (text: string) => void;
};

export default function TodoInput({ onAdd }: Props): JSX.Element {
  const [text, setText] = useState<string>("");

  return (
    <View style={styles.row}>
      <TextInput
        style={styles.input}
        placeholder="Add a new task"
        value={text}
        onChangeText={setText}
      />

      <Button
        title="Add"
        onPress={() => {
          if (text.trim().length > 0) {
            onAdd(text);
            setText("");
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 10,
    marginVertical: 10,
  },
  input: {
    flex: 1,
    borderColor: "#888",
    borderWidth: 1,
    padding: 10,
    borderRadius: 6,
  },
});

