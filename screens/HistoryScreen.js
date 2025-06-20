import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Dimensions, StyleSheet } from 'react-native';
import axios from 'axios';
import { LineChart } from 'react-native-chart-kit';

export default function HistoryScreen() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    axios.get('https://apoio-mental-app.onrender.com/history-humor/usuario1')
      .then(response => setHistory(response.data))
      .catch(error => {
        console.log('Erro ao buscar histórico:', error);
        alert('Erro ao buscar histórico');
      });
  }, []);

  // ✅ Agrupar registros por dia
  const groupedByDate = history.reduce((acc, item) => {
    const date = new Date(item.timestamp).toLocaleDateString();
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  const labels = Object.keys(groupedByDate);
  const dataPoints = Object.values(groupedByDate);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Histórico de Humor</Text>

      {labels.length > 0 ? (
        <LineChart
          data={{
            labels: labels,
            datasets: [{ data: dataPoints }],
          }}
          width={Dimensions.get('window').width - 40}
          height={220}
          yAxisLabel=""
          chartConfig={{
            backgroundColor: '#121212',
            backgroundGradientFrom: '#121212',
            backgroundGradientTo: '#121212',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 255, 174, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#00ffae',
            },
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      ) : (
        <Text style={styles.text}>Sem registros para exibir.</Text>
      )}

      {/* Lista dos registros */}
      {history.map((item, index) => (
        <View key={index} style={styles.item}>
          <Text style={styles.text}>Humor: {item.mood}</Text>
          <Text style={styles.text}>Nota: {item.note}</Text>
          <Text style={styles.text}>Data: {new Date(item.timestamp).toLocaleString()}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', padding: 20 },
  title: { color: '#fff', fontSize: 24, marginBottom: 10 },
  item: {
    backgroundColor: '#1f1f1f',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  text: { color: '#fff' },
});
