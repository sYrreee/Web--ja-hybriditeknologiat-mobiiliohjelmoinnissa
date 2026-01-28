import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Task } from '../hooks/useTodos';

interface Props {
  task: Task;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
}

export default function TodoItem({ task, onToggle, onRemove }: Props): JSX.Element {
  // SUOJAUS: Estää "Cannot read properties of undefined (reading 'id')" virheen
  if (!task || !task.id) {
    return <></>;
  }

  return (
    <TouchableOpacity 
      onPress={() => onToggle(task.id)}
      onLongPress={() => onRemove(task.id)}
      style={[styles.itemContainer, task.done && styles.doneContainer]}
    >
      <Text style={[styles.taskText, task.done && styles.doneText]}>
        {task.text}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    marginVertical: 4,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  doneContainer: {
    backgroundColor: '#eeeeee',
  },
  taskText: {
    fontSize: 18,
    color: '#333',
  },
  doneText: {
    textDecorationLine: 'line-through',
    color: '#aaa',
  },
});




