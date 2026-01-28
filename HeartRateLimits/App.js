import { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

export default function App() {
  const [age, setAge] = useState('');
  const parsedAge = parseInt(age);

  const lower = isNaN(parsedAge) ? 0 : (220 - parsedAge) * 0.65;
  const upper = isNaN(parsedAge) ? 0 : (220 - parsedAge) * 0.85;

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

      <Text style={styles.resultText}>Lower limit: {lower.toFixed(2)} bpm</Text>
      <Text style={styles.resultText}>Upper limit: {upper.toFixed(2)} bpm</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginVertical: 10,
    borderRadius: 4,
  },
  resultText: {
    fontSize: 16,
    marginTop: 5,
  }
});