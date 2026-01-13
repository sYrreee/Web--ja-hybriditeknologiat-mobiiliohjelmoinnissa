import React, { useState } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';

interface Props {
  onAddTask: (text: string) => void;
}

export default function TaskInput({ onAddTask }: Props): JSX.Element {
  const [text, setText] = useState<string>('');

  const handleSave = () => {
    onAddTask(text);
    setText('');
  };

  return (
    <View style={styles.row}>
      <TextInput
        placeholder="Enter task"
        value={text}
        onChangeText={setText}
        style={styles.input}
      />
      <Button title="Save" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#aaa',
    marginRight: 10,
    padding: 8,
    borderRadius: 4,
  },
});



