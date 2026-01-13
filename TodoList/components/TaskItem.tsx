import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Task } from '../../types';

interface Props {
  task: Task;
  onToggle: (id: string) => void;
}

export default function TaskItem({ task, onToggle }: Props): JSX.Element {
  return (
    <TouchableOpacity onPress={() => onToggle(task.id)}>
      <Text style={[styles.task, task.done && styles.done]}>
        {task.text}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  task: {
    fontSize: 20,
    paddingVertical: 8,
  },
  done: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
});

