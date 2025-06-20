import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

export default function DiaryScreen() {
  const [text, setText] = useState('');
  const [entries, setEntries] = useState([]);

  const fetchDiary = () => {
    axios.get('https://apoio-mental-app.onrender.com/diary/usuario1')
      .then(response => setEntries(response.data))
      .catch(error => {
        console.log('Erro ao buscar diário:', error);
        Alert.alert('Erro', 'Não foi possível carregar os registros do diário.');
      });
  };

  useEffect(() => {
    fetchDiary();
  }, []);

  const submitDiary = () => {
    if (!text) {
      alert('Escreva algo no diário.');
      return;
    }

    axios.post('https://apoio-mental-app.onrender.com/diary', {
      user_id: 'usuario1',
      text
    }).then(() => {
      alert('Diário salvo!');
      setText('');
      fetchDiary();
    }).catch(error => {
      console.log('Erro ao salvar no diário:', error);
      alert('Erro ao salvar no diário');
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Diário Pessoal</Text>

      <TextInput
        placeholder="Escreva como se sente hoje..."
        placeholderTextColor="#888"
        value={text}
        onChangeText={setText}
        style={styles.input}
        multiline
        numberOfLines={4}
      />
      <Button title="Salvar no Diário" onPress={submitDiary} />

      <Text style={styles.subtitle}>Registros Anteriores:</Text>
      {entries.map((entry, index) => (
        <View key={index} style={styles.item}>
          <Text style={styles.text}>{entry.text}</Text>
          <Text style={styles.date}>{new Date(entry.timestamp).toLocaleString()}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', padding: 20 },
  title: { color: '#fff', fontSize: 24, marginBottom: 10 },
  subtitle: { color: '#fff', fontSize: 18, marginVertical: 10 },
  input: {
    backgroundColor: '#1f1f1f',
    color: '#fff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    minHeight: 100,
    textAlignVertical: 'top'
  },
  item: {
    backgroundColor: '#1f1f1f',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10
  },
  text: { color: '#fff' },
  date: { color: '#aaa', fontSize: 12, marginTop: 5 }
});
