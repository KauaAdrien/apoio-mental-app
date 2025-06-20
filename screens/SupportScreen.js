import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';

export default function SupportScreen() {
  const [centers, setCenters] = useState([]);

  useEffect(() => {
    axios.get('http://192.168.15.47:5000/support-centers')
      .then(response => {
        console.log('Centros recebidos:', response.data);
        setCenters(response.data);
      })
      .catch(error => {
        console.log('Erro ao carregar centros:', error);
      });
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Locais de Apoio</Text>

      {centers.length === 0 ? (
        <Text style={styles.emptyText}>Nenhum local encontrado.</Text>
      ) : (
        centers.map((center, index) => (
          <View key={index} style={styles.item}>
            <Text style={styles.text}>{center.name}</Text>
            <Text style={styles.text}>Fone: {center.phone}</Text>
            <Text style={styles.text}>Local: {center.location}</Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', padding: 20 },
  title: { color: '#00ffae', fontSize: 24, marginBottom: 10, textAlign: 'center' },
  item: {
    backgroundColor: '#1f1f1f',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10
  },
  text: { color: '#fff' },
  emptyText: { color: '#aaa', fontStyle: 'italic', textAlign: 'center', marginTop: 20 }
});
