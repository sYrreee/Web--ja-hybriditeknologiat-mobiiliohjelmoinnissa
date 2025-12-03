import { useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";

export default function TodoInput({ addTodo }) {
  const [text, setText] = useState("");

  const handleAdd = () => {
    if (text.trim()) {
      addTodo(text);
      setText("");
    }
  };

  return (
    <View style={styles.row}>
     <TextInput
  style={styles.input}
  value={text}
  onChangeText={setText}
  placeholder="Add a new task"
  placeholderTextColor="#888"
  />
  <Button title="Add" onPress={handleAdd} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#bbb",
  }
});
