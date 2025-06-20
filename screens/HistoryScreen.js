import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

export default function HistoryScreen() {
  const [history, setHistory] = useState([]);

  const user_id = 'usuario1';

  useEffect(() => {
    axios.get(`https://apoio-mental-app.onrender.com/history-humor/${user_id}`)
      .then(response => {
        setHistory(response.data);
      })
      .catch(error => {
        console.log('Erro ao buscar histórico:', error);
      });
  }, []);

  // Função para mapear humor em valor numérico
  const moodToNumber = (mood) => {
    if (!mood) return 3; // neutro padrão
    switch (mood.toLowerCase()) {
      case 'feliz': return 5;
      case 'calmo': return 4;
      case 'neutro': return 3;
      case 'ansioso': return 2;
      case 'triste': return 1;
      default: return 3;
    }
  };

  // Prepara labels (datas) e dados numéricos para gráfico
  const labels = history.map(item => {
    const date = new Date(item.timestamp);
    return date.toLocaleDateString();
  });

  const data = history.map(item => moodToNumber(item.mood));

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Histórico de Humor</Text>

      {data.length > 0 ? (
        <LineChart
          data={{
            labels: labels,
            datasets: [
              {
                data: data
              }
            ]
          }}
          width={Dimensions.get('window').width - 40}
          height={220}
          yAxisInterval={1}
          chartConfig={{
            backgroundColor: '#121212',
            backgroundGradientFrom: '#121212',
            backgroundGradientTo: '#121212',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 255, 174, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            propsForDots: {
              r: '5',
              strokeWidth: '2',
              stroke: '#00ffae'
            }
          }}
          bezier
          style={{
            borderRadius: 16,
            marginBottom: 20
          }}
        />
      ) : (
        <Text style={{ color: '#aaa', textAlign: 'center', marginBottom: 20 }}>
          Nenhum dado para exibir no gráfico.
        </Text>
      )}

      {history.map((item, index) => (
        <View key={index} style={styles.entry}>
          <Text style={styles.entryDate}>{new Date(item.timestamp).toLocaleString()}</Text>
          <Text style={styles.entryMood}>Humor: {item.mood}</Text>
          <Text style={styles.entryNote}>Nota: {item.note}</Text>
        </View>
      ))}
    </ScrollView>
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
  entryMood: {
    color: '#fff',
    fontSize: 16
  },
  entryNote: {
    color: '#ccc',
    fontSize: 14
  }
});
