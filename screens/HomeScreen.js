import React from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Como você está hoje?</Text>
      <Button title="Registrar Humor" onPress={() => navigation.navigate('Registrar Humor')} />
      <Button title="Histórico de Humor" onPress={() => navigation.navigate('Histórico')} />
      <Button title="Locais de Apoio" onPress={() => navigation.navigate('Locais de Apoio')} />
      <Button title="Contatos de Emergência" onPress={() => navigation.navigate('Emergência')} />
      <Button title="Diário Pessoal" onPress={() => navigation.navigate('Diário')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',
    gap: 20,
    padding: 20
  },
  title: {
    color: '#fff',
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center'
  }
});