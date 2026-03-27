import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, Button } from 'react-native';
import { useStore } from '../store/useStore';
import { searchMovies } from '../api/tmdb';

export default function HomeScreen() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const { myMovies, toggleMovie } = useStore();

  const handleSearch = async () => {
    const results = await searchMovies(query);
    setMovies(results);
  };

  return (
    <View style={{ flex: 1, padding: 40 }}>
      <TextInput 
        placeholder="Поиск..." 
        value={query} 
        onChangeText={setQuery} 
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />
      <Button title="Найти" onPress={handleSearch} />
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ marginVertical: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ width: '60%' }}>{item.title}</Text>
            <Button 
              title={myMovies.some(m => m.id === item.id) ? "Удалить" : "Добавить"} 
              onPress={() => toggleMovie(item)} 
            />
          </View>
        )}
      />
    </View>
  );
}