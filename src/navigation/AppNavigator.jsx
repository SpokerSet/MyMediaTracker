import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import MoviesScreen from '../screens/MoviesScreen';
import BooksScreen from '../screens/BooksScreen';
import GamesScreen from '../screens/GamesScreen';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Кино') iconName = 'videocam';
          else if (route.name === 'Книги') iconName = 'book';
          else if (route.name === 'Игры') iconName = 'game-controller';

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#6200ee',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Кино" component={MoviesScreen} />
      <Tab.Screen name="Книги" component={BooksScreen} />
      <Tab.Screen name="Игры" component={GamesScreen} />
    </Tab.Navigator>
  );
}