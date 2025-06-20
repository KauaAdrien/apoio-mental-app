import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';

export default function SupportScreen() {
  const [centers, setCenters] = useState([]);

  useEffect(() => {
    axios.get('https://apoio-mental-app.onrender.com/support-centers')
      .then(response => setCenters(response.data));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Locais de Apoio</Text>
      {centers.map((center, index) => (
        <View key={index} style={styles.item}>
          <Text style={styles.text}>{center.name}</Text>
          <Text style={styles.text}>Fone: {center.phone}</Text>
          <Text style={styles.text}>Local: {center.location}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', padding: 20 },
  title: { color: '#fff', fontSize: 24, marginBottom: 10 },
  item: {
    backgroundColor: '#1f1f1f',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10
  },
  text: { color: '#fff' }
});