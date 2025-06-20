import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './screens/HomeScreen';
import RegisterHumorScreen from './screens/RegisterHumorScreen';
import HistoryScreen from './screens/HistoryScreen';
import DiaryScreen from './screens/DiaryScreen';
import SupportScreen from './screens/SupportScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: { backgroundColor: '#121212' },
          tabBarActiveTintColor: '#00ffae',
          tabBarInactiveTintColor: '#aaa',
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Início') iconName = 'home';
            else if (route.name === 'Registrar') iconName = 'happy';
            else if (route.name === 'Histórico') iconName = 'stats-chart';
            else if (route.name === 'Diário') iconName = 'book';
            else if (route.name === 'Apoio') iconName = 'help-circle';

            return <Ionicons name={iconName} size={size} color={color} />;
          }
        })}
      >
        <Tab.Screen name="Início" component={HomeScreen} />
        <Tab.Screen name="Registrar" component={RegisterHumorScreen} />
        <Tab.Screen name="Histórico" component={HistoryScreen} />
        <Tab.Screen name="Diário" component={DiaryScreen} />
        <Tab.Screen name="Apoio" component={SupportScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
