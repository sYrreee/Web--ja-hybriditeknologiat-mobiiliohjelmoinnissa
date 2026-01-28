import React from 'react';
import { View, StyleSheet, FlatList, Text, SafeAreaView } from 'react-native';
import TodoInput from './components/TodoInput'; 
import TodoItem from './components/TodoItem';   
import { useTodos } from './hooks/useTodos';

export default function App() {
  const { todos, addTodo, toggleTodo, removeTodo } = useTodos();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Simple Todo</Text>

      <TodoInput onAddTask={addTodo} />

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TodoItem 
            task={item} 
            onToggle={toggleTodo} 
            onRemove={removeTodo} 
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#6200ee', 
  }
});
