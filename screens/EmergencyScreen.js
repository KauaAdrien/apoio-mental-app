import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function EmergencyScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contatos de Emergência</Text>
      <View style={styles.item}>
        <Text style={styles.text}>CVV - 188</Text>
        <Text style={styles.text}>SAMU - 192</Text>
        <Text style={styles.text}>Polícia - 190</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', padding: 20 },
  title: { color: '#fff', fontSize: 24, marginBottom: 10 },
  item: {
    backgroundColor: '#1f1f1f',
    padding: 15,
    borderRadius: 8
  },
  text: { color: '#fff', marginBottom: 5 }
});