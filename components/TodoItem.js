import { Pressable, StyleSheet, Text, View } from "react-native";

export default function TodoItem({ todo, toggleTodo, removeTodo }) {
  return (
    <View style={styles.container}>
      <Pressable onPress={() => toggleTodo(todo.id)} style={{ flex: 1 }}>
        <Text
          style={[
            styles.text,
            todo.done && { textDecorationLine: "line-through", color: "#aaa" }
          ]}
        >
          {todo.text}
        </Text>
      </Pressable>

      <Pressable onPress={() => removeTodo(todo.id)}>
        <Text style={styles.delete}>×</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 12,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  text: {
    fontSize: 18
  },
  delete: {
    fontSize: 26,
    color: "red",
    paddingHorizontal: 10
  }
});
