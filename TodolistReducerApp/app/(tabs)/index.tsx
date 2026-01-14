import { StyleSheet, Text, View } from "react-native";
import TodoInput from "../../components/TodoInput";
import TodoList from "../../components/TodoList";
import { useTodos } from "../../hooks/useTodos";

export default function HomeScreen() {
  const { todos, addTodo, toggleTodo, removeTodo } = useTodos();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Simple Todo</Text>

      <TodoInput onAdd={addTodo} />

      <TodoList
        items={todos}
        onToggle={toggleTodo}
        onDelete={removeTodo}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 26,
    textAlign: "center",
    fontWeight: "bold",
    color: "#6c47ff",
    marginBottom: 20,
  },
});


