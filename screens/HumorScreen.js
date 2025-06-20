import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';

export default function RegisterHumorScreen() {
  const [mood, setMood] = useState('');
  const [note, setNote] = useState('');

  const handleRegisterHumor = () => {
    if (!mood) {
      alert('Selecione ou digite seu humor.');
      return;
    }

    axios.post('http://192.168.15.47:5000/register-humor', {
      user_id: 'usuario1',
      mood: mood,
      note: note
    })
    .then(() => {
      alert('Humor registrado com sucesso!');
      setMood('');
      setNote('');
    })
    .catch(error => {
      console.log('Erro ao registrar humor:', error);
      alert('Erro ao registrar humor.');
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrar Humor</Text>

      <Text style={styles.label}>Como você está se sentindo?</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex.: Feliz, Triste, Ansioso..."
        placeholderTextColor="#aaa"
        value={mood}
        onChangeText={setMood}
      />

      <Text style={styles.label}>Observação (opcional)</Text>
      <TextInput
        style={[styles.input, { height: 80 }]}
        placeholder="Escreva algo sobre seu dia..."
        placeholderTextColor="#aaa"
        value={note}
        onChangeText={setNote}
        multiline
      />

      <TouchableOpacity style={styles.button} onPress={handleRegisterHumor}>
        <Text style={styles.buttonText}>Registrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
    justifyContent: 'center'
  },
  title: {
    color: '#00ffae',
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center'
  },
  label: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 8
  },
  input: {
    backgroundColor: '#1f1f1f',
    color: '#fff',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 20
  },
  button: {
    backgroundColor: '#00ffae',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center'
  },
  buttonText: {
    color: '#121212',
    fontWeight: 'bold',
    fontSize: 16
  }
});
// This screen allows users to register their mood and an optional note.