import { StyleSheet, Text, View } from "react-native";
import TodoInput from "../../components/TodoInput";
import TodoList from "../../components/TodoList";
import useTodos from "../../hooks/useTodos";

export default function HomeScreen() {
  const { todos, addTodo, removeTodo, toggleTodo } = useTodos();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Simple Todo</Text>

      <TodoInput addTodo={addTodo} />
      <TodoList
        todos={todos}
        removeTodo={removeTodo}
        toggleTodo={toggleTodo}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 80,
    padding: 20
  },
  title: {
    textAlign: "center",
    fontSize: 28,
    marginBottom: 20,
    fontWeight: "bold",
    color: "#6c47ff"
  }
});
