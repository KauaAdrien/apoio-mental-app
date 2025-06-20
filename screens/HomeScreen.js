import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao Apoio Mental</Text>
      <Text style={styles.subtitle}>Seu espaço seguro para monitorar seu humor e bem-estar.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  title: {
    color: '#00ffae',
    fontSize: 24,
    marginBottom: 10,
    textAlign: 'center'
  },
  subtitle: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center'
  }
});
