import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Share } from 'react-native';
import axios from 'axios';

export default function HumorScreen() {
  const [mood, setMood] = useState('');
  const [note, setNote] = useState('');

  const submitHumor = () => {
    if (!mood) {
      alert('Por favor, informe seu humor.');
      return;
    }

    axios.post('https://apoio-mental-app.onrender.com/register-humor', {
      user_id: 'usuario1',
      mood,
      note
    }).then(() => {
      alert('Humor registrado com sucesso!');
      setMood('');
      setNote('');
    });
  };

  const shareHumor = async () => {
    try {
      const result = await Share.share({
        message: `Meu humor hoje está: ${mood}. Observação: ${note ? note : 'Sem observações.'}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('Compartilhado via:', result.activityType);
        } else {
          console.log('Compartilhado');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Compartilhamento cancelado');
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Como está seu humor?</Text>
      <TextInput
        placeholder="Ex: Feliz, Triste..."
        placeholderTextColor="#888"
        value={mood}
        onChangeText={setMood}
        style={styles.input}
      />
      <TextInput
        placeholder="Observações (opcional)"
        placeholderTextColor="#888"
        value={note}
        onChangeText={setNote}
        style={styles.input}
      />
      <Button title="Registrar Humor" onPress={submitHumor} />
      <View style={{ marginVertical: 10 }} />
      <Button title="Compartilhar Humor" onPress={shareHumor} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', padding: 20, gap: 10 },
  label: { color: '#fff', fontSize: 18 },
  input: {
    backgroundColor: '#1f1f1f',
    color: '#fff',
    padding: 10,
    borderRadius: 5
  }
});
