import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useStore } from '../store/useStore';
import MediaCard from '../components/MediaCard';
import { globalStyles as styles } from '../styles/globalStyles'; // Импорт общих стилей
import { Ionicons } from '@expo/vector-icons'; // Иконки

export default function MoviesScreen() {
  const [tab, setTab] = useState('search');
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const { myMovies, toggleItem } = useStore();

  const API_KEY = "54b3c5b386030268e11e866ea34e27fb";

  const searchMovies = async (text) => {
    setQuery(text);
    if (text.length > 2) {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(text)}&language=ru-RU`
        );
        const data = await response.json();
        setSearchResults(data.results || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* Переключатель табов */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, tab === 'search' && styles.activeTab]} 
          onPress={() => setTab('search')}
        >
          <Ionicons name="search" size={18} color={tab === 'search' ? '#6200ee' : '#6c757d'} />
          <Text style={tab === 'search' ? styles.activeTabText : styles.tabText}> Поиск</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.tab, tab === 'myList' && styles.activeTab]} 
          onPress={() => setTab('myList')}
        >
          <Ionicons name="film" size={18} color={tab === 'myList' ? '#6200ee' : '#6c757d'} />
          <Text style={tab === 'myList' ? styles.activeTabText : styles.tabText}> Мои ({myMovies?.length || 0})</Text>
        </TouchableOpacity>
      </View>

      {tab === 'search' ? (
        <>
          <View style={styles.searchSection}>
            <TextInput
              style={styles.searchInput}
              placeholder="Найти фильм..."
              value={query}
              onChangeText={searchMovies}
            />
          </View>
          {loading ? (
            <ActivityIndicator size="large" color="#6200ee" style={{ marginTop: 20 }} />
          ) : (
            <FlatList 
              data={searchResults} 
              keyExtractor={(item) => item.id.toString()} 
              renderItem={({ item }) => (
                <MediaCard 
                  item={item} 
                  type="movie"
                  isSaved={myMovies?.some(m => m.id === item.id)}
                  onToggle={() => toggleItem(item, 'movie')}
                />
              )}
            />
          )}
        </>
      ) : (
        <FlatList 
          data={myMovies} 
          keyExtractor={(item) => item.id.toString()} 
          renderItem={({ item }) => (
            <MediaCard item={item} type="movie" isSaved={true} onToggle={() => toggleItem(item, 'movie')} />
          )}
          ListEmptyComponent={<Text style={styles.emptyText}>Вы еще ничего не добавили</Text>}
        />
      )}
    </View>
  );
}