import { StyleSheet, View } from "react-native";
import TodoItem from "./TodoItem";

export default function TodoList({ todos, toggleTodo, removeTodo }) {
  return (
    <View style={styles.box}>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleTodo={toggleTodo}
          removeTodo={removeTodo}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 2,
    overflow: "hidden",
  }
});
