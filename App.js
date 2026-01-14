import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';
import { useStore } from './store/useStore';

export default function App() {
  const [rehydrated, setRehydrated] = useState(false);

  useEffect(() => {
    // Ждем, пока Zustand подгрузит данные из памяти
    const hydrate = async () => {
      await useStore.persist.rehydrate();
      setRehydrated(true);
    };
    hydrate();
  }, []);

  if (!rehydrated) {
    return null; 
  }

  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}