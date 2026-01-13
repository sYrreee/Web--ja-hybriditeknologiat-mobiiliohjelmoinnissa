import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput } from 'react-native';

export default function App() {
  const [ageText, setAgeText] = useState('');

  const parseAge = (text: string) => {
    if (!/\d/.test(text)) return NaN;
    const normalized = text.replace(',', '.');
    const n = Number(normalized);
    return Number.isFinite(n) ? n : NaN;
  };

  const age = parseAge(ageText);
  const valid = Number.isFinite(age);

  const lower = valid ? Math.round((220 - age) * 0.65) : 0;
  const upper = valid ? Math.round((220 - age) * 0.85) : 0;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Heart Rate Limits Calculator</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter age"
        keyboardType="numeric"
        value={ageText}
        onChangeText={setAgeText}
      />

      <View style={styles.results}>
        <Text style={styles.label}>Lower limit:</Text>
        <Text style={styles.value}>{lower.toFixed(2)} bpm</Text>
      </View>

      <View style={styles.results}>
        <Text style={styles.label}>Upper limit:</Text>
        <Text style={styles.value}>{upper.toFixed(2)} bpm</Text>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    marginBottom: 12,
    fontWeight: '700',
    color: '#000',
  },
  input: {
    width: '60%',
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 8,
    borderRadius: 6,
    textAlign: 'center',
    marginBottom: 16,
  },
  results: {
    flexDirection: 'row',
    width: '60%',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  label: {
    fontSize: 16,
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
  },
});
