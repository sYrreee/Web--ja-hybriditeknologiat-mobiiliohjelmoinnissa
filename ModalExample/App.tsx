import React, { useState } from 'react';
import { StyleSheet, Text, View, Modal, Pressable } from 'react-native';

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      {/* 1. Modal-komponentti */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)} // Androidin hardware back-button
      >
        <View style={styles.modalView}>
          <Text style={styles.text}>This is modal...</Text>
          
          <Pressable onPress={() => setModalVisible(false)}>
            <Text style={styles.closeText}>Close</Text>
          </Pressable>
        </View>
      </Modal>

      {/* 2. Pressable-komponentti päänäkymässä */}
      <Pressable onPress={() => setModalVisible(true)}>
        <Text style={styles.triggerText}>Show modal message</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
  triggerText: {
    fontSize: 18,
  },
  closeText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
});