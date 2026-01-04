import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useStore } from '../store/useStore';
import MediaCard from '../components/MediaCard';

const API_KEY = '54b3c5b386030268e11e866ea34e27fb'; 

export default function MoviesScreen() {
  const [tab, setTab] = useState('search');
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const { myMovies, toggleItem } = useStore();

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
        console.error("Ошибка поиска:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* Переключатель Поиск / Мои */}
      <View style={styles.tabContainer}>
        {['search', 'myList'].map((t) => (
          <TouchableOpacity 
            key={t}
            style={[styles.tab, tab === t && styles.activeTab]} 
            onPress={() => setTab(t)}
          >
            <Text style={tab === t ? styles.activeTabText : styles.tabText}>
              {t === 'search' ? 'Поиск' : `Мои (${myMovies.length})`}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {tab === 'search' ? (
        <>
          <TextInput
            style={styles.searchInput}
            placeholder="Название фильма..."
            value={query}
            onChangeText={searchMovies}
          />
          {loading ? (
            <ActivityIndicator size="large" color="#6200ee" style={{ marginTop: 20 }} />
          ) : (
            <FlatList 
              data={searchResults} 
              keyExtractor={(item) => `search-${item.id}`} 
              renderItem={({ item }) => (
                <MediaCard 
                  item={item} 
                  type="movie"
                  isSaved={myMovies.some(m => m.id === item.id)}
                  onToggle={() => toggleItem(item, 'movie')}
                />
              )}
            />
          )}
        </>
      ) : (
        <FlatList 
          data={myMovies} 
          keyExtractor={(item) => `my-${item.id}`} 
          renderItem={({ item }) => (
            <MediaCard 
              item={item} 
              type="movie"
              isSaved={true}
              onToggle={() => toggleItem(item, 'movie')}
            />
          )}
          ListEmptyComponent={<Text style={styles.emptyText}>Вы еще ничего не добавили</Text>}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: '#f5f5f5' },
  tabContainer: { flexDirection: 'row', marginBottom: 20, backgroundColor: '#eee', borderRadius: 12, padding: 4 },
  tab: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 10 },
  activeTab: { backgroundColor: '#fff', elevation: 3 },
  tabText: { color: '#888', fontWeight: '500' },
  activeTabText: { color: '#6200ee', fontWeight: 'bold' },
  searchInput: { backgroundColor: '#fff', padding: 12, borderRadius: 12, marginBottom: 15, borderWidth: 1, borderColor: '#ddd' },
  emptyText: { textAlign: 'center', color: '#aaa', marginTop: 40 }
});