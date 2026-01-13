import { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

export default function App() {
  const [age, setAge] = useState('');
  const parsedAge = parseInt(age);

  const maxHr = isNaN(parsedAge) ? 0 : 220 - parsedAge;
  const lower = Math.round(maxHr * 0.65);
  const upper = Math.round(maxHr * 0.85);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Heart Rate Limits Calculator</Text>

      <Text>Enter your age:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={age}
        onChangeText={setAge}
      />

      <Text>Lower limit: {lower.toFixed(2)} bpm</Text>
      <Text>Upper limit: {upper.toFixed(2)} bpm</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    padding: 8,
    marginVertical: 10,
  },
});
