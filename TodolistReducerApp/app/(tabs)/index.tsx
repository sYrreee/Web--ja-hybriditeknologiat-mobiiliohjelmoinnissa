import React from 'react';
import { StyleSheet, FlatList, Text, SafeAreaView, View } from 'react-native';
import TodoInput from '../../components/TodoInput';
import TodoItem from '../../components/TodoItem';
import { useTodos } from '../../hooks/useTodos';

export default function HomeScreen() {
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
        ListEmptyComponent={<Text style={styles.empty}>No tasks yet.</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
    color: '#6200ee',
  },
  empty: {
    textAlign: 'center',
    marginTop: 20,
    color: '#888',
  }
});


