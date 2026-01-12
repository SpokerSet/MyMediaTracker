import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useStore } from '../store/useStore';
import MediaCard from '../components/MediaCard';

const RAWG_KEY = '6f422a0f61d14b269a696173d272d55d'; 

export default function GamesScreen() {
  const [tab, setTab] = useState('search');
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const { myGames, toggleItem } = useStore();

  const searchGames = async (text) => {
    setQuery(text);
    if (text.length > 2) {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.rawg.io/api/games?key=${RAWG_KEY}&search=${encodeURIComponent(text)}&page_size=20`
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
      <View style={styles.tabContainer}>
        {['search', 'myList'].map((t) => (
          <TouchableOpacity 
            key={t}
            style={[styles.tab, tab === t && styles.activeTab]} 
            onPress={() => setTab(t)}
          >
            <Text style={tab === t ? styles.activeTabText : styles.tabText}>
              {t === 'search' ? 'Поиск' : `Мои (${myGames?.length || 0})`}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {tab === 'search' ? (
        <>
          <TextInput
            style={styles.searchInput}
            placeholder="Название игры..."
            value={query}
            onChangeText={searchGames}
          />
          {loading ? <ActivityIndicator size="large" color="#6200ee" /> : (
            <FlatList 
              data={searchResults} 
              keyExtractor={(item) => item.id.toString()} 
              renderItem={({ item }) => (
                <MediaCard 
                  item={item} 
                  type="game"
                  isSaved={myGames?.some(g => g.id === item.id)}
                  onToggle={() => toggleItem(item, 'game')}
                />
              )}
            />
          )}
        </>
      ) : (
        <FlatList 
          data={myGames} 
          keyExtractor={(item) => item.id.toString()} 
          renderItem={({ item }) => (
            <MediaCard item={item} type="game" isSaved={true} onToggle={() => toggleItem(item, 'game')} />
          )}
          ListEmptyComponent={<Text style={styles.emptyText}>Список игр пуст</Text>}
        />
      )}
    </View>
  );
}