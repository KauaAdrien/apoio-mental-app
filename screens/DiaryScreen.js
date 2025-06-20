import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';

export default function DiaryScreen() {
  const [entry, setEntry] = useState('');
  const [diary, setDiary] = useState([]);

  const user_id = 'usuario1'; // Pode depois ser dinâmico

  const fetchDiary = () => {
    axios.get(`https://apoio-mental-app.onrender.com/diary/${user_id}`)
      .then(response => {
        setDiary(response.data.reverse());
      })
      .catch(error => {
        console.log('Erro ao buscar diário:', error);
      });
  };

  const handleSave = () => {
    if (!entry) {
      alert('Escreva algo no diário.');
      return;
    }

    axios.post('https://apoio-mental-app.onrender.com/diary', {
      user_id: user_id,
      text: entry
    })
    .then(() => {
      setEntry('');
      fetchDiary();
    })
    .catch(error => {
      console.log('Erro ao salvar no diário:', error);
      alert('Erro ao salvar no diário');
    });
  };

  useEffect(() => {
    fetchDiary();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Diário</Text>

      <TextInput
        style={[styles.input, { height: 80 }]}
        placeholder="Escreva como foi seu dia..."
        placeholderTextColor="#aaa"
        value={entry}
        onChangeText={setEntry}
        multiline
      />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>

      <FlatList
        data={diary}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.entry}>
            <Text style={styles.entryDate}>{new Date(item.timestamp).toLocaleString()}</Text>
            <Text style={styles.entryText}>{item.text}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20
  },
  title: {
    color: '#00ffae',
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center'
  },
  input: {
    backgroundColor: '#1f1f1f',
    color: '#fff',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 10
  },
  button: {
    backgroundColor: '#00ffae',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20
  },
  buttonText: {
    color: '#121212',
    fontWeight: 'bold'
  },
  entry: {
    backgroundColor: '#1f1f1f',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10
  },
  entryDate: {
    color: '#aaa',
    fontSize: 12,
    marginBottom: 4
  },
  entryText: {
    color: '#fff',
    fontSize: 16
  }
});
