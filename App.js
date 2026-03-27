import React, { useState, useEffect } from 'react';
import HomeScreen from './src/screens/HomeScreen';
import { useStore } from './src/store/useStore';

export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const hydrate = async () => {
      await useStore.persist.rehydrate();
      setIsReady(true);
    };
    hydrate();
  }, []);

  if (!isReady) return null;

  return <HomeScreen />;
}