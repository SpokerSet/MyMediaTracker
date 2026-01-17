// App.js
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator'; 
import { useStore } from './src/store/useStore';

export default function App() {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const initStore = async () => {
      await useStore.persist.rehydrate();
      setIsHydrated(true);
    };
    initStore();
  }, []);

  if (!isHydrated) {
    return null;
  }

  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}