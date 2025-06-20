import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import HumorScreen from './screens/HumorScreen';
import HistoryScreen from './screens/HistoryScreen';
import SupportScreen from './screens/SupportScreen';
import EmergencyScreen from './screens/EmergencyScreen';
import DiaryScreen from './screens/DiaryScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#121212' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen name="Apoio Mental" component={HomeScreen} />
        <Stack.Screen name="Registrar Humor" component={HumorScreen} />
        <Stack.Screen name="Histórico" component={HistoryScreen} />
        <Stack.Screen name="Locais de Apoio" component={SupportScreen} />
        <Stack.Screen name="Emergência" component={EmergencyScreen} />
        <Stack.Screen name="Diário" component={DiaryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}