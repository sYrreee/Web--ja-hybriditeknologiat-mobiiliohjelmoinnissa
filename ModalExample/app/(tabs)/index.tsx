import React, { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

export default function Page() {
  const [visible, setVisible] = useState(false);

  return (
    <View style={styles.screen}>
      <Pressable onPress={() => setVisible(true)}>
        <Text style={styles.showText}>Show modal message</Text>
      </Pressable>

      
      <Modal
        visible={visible}
        transparent
        animationType="slide"
        onRequestClose={() => setVisible(false)} 
      >
        <View style={styles.backdrop}>
          <View style={styles.card}>
            <Text style={styles.modalText}>This is modal...</Text>

            <Pressable onPress={() => setVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  showText: {
    fontSize: 16,
    color: '#333',
  },

  backdrop: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.08)',
  },
  card: {
    width: 280,
    backgroundColor: '#fff',
    borderRadius: 6,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#d9d9d9',
    paddingVertical: 18,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 14,
  },
  closeButton: {
    alignSelf: 'stretch',
    paddingVertical: 10,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#e6e6e6',
  },
  closeText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600',
  },
});



