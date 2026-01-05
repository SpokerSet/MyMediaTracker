// import React, { useState } from 'react';
// import { View, TextInput, FlatList, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
// import { useStore } from '../store/useStore';
// import MediaCard from '../components/MediaCard';

// const API_KEY = ''; 

// export default function BooksScreen() {
//   const [tab, setTab] = useState('search');
//   const [query, setQuery] = useState('');
//   const [searchResults, setSearchResults] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const { myBooks, toggleItem } = useStore();

//   const searchBooks = async (text) => {
//     setQuery(text);
//     if (text.length > 2) {
//       setLoading(true);
//       try {
//         const response = await fetch(
//           `https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(text)}`
//         );
//         const data = await response.json();
//         setSearchResults(data.items || []);
//       } catch (error) {
//         console.error("Ошибка поиска:", error);
//       } finally {
//         setLoading(false);
//       }
//     }
//   };

//   return (
//     <View style={styles.container}>
//       {/* Переключатель Поиск / Мои */}
//       <View style={styles.tabContainer}>
//         {['search', 'myList'].map((t) => (
//           <TouchableOpacity 
//             key={t}
//             style={[styles.tab, tab === t && styles.activeTab]} 
//             onPress={() => setTab(t)}
//           >
//             <Text style={tab === t ? styles.activeTabText : styles.tabText}>
//               {t === 'search' ? 'Поиск' : `Мои (${myBooks.length})`}
//             </Text>
//           </TouchableOpacity>
//         ))}
//       </View>

//       {tab === 'search' ? (
//         <>
//           <TextInput
//             style={styles.searchInput}
//             placeholder="Название книги..."
//             value={query}
//             onChangeText={searchBooks}
//           />
//           {loading ? (
//             <ActivityIndicator size="large" color="#6200ee" style={{ marginTop: 20 }} />
//           ) : (
//             <FlatList 
//               data={searchResults} 
//               keyExtractor={(item) => `search-${item.id}`} 
//               renderItem={({ item }) => (
//                 <MediaCard 
//                   item={item} 
//                   type="book"
//                   isSaved={myBooks.some(m => m.id === item.id)}
//                   onToggle={() => toggleItem(item, 'books')}
//                 />
//               )}
//             />
//           )}
//         </>
//       ) : (
//         <FlatList 
//           data={myBooks} 
//           keyExtractor={(item) => `my-${item.id}`} 
//           renderItem={({ item }) => (
//             <MediaCard 
//               item={item} 
//               type="book"
//               isSaved={true}
//               onToggle={() => toggleItem(item, 'books')}
//             />
//           )}
//           ListEmptyComponent={<Text style={styles.emptyText}>Вы еще ничего не добавили</Text>}
//         />
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 15, backgroundColor: '#f5f5f5' },
//   tabContainer: { flexDirection: 'row', marginBottom: 20, backgroundColor: '#eee', borderRadius: 12, padding: 4 },
//   tab: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 10 },
//   activeTab: { backgroundColor: '#fff', elevation: 3 },
//   tabText: { color: '#888', fontWeight: '500' },
//   activeTabText: { color: '#6200ee', fontWeight: 'bold' },
//   searchInput: { backgroundColor: '#fff', padding: 12, borderRadius: 12, marginBottom: 15, borderWidth: 1, borderColor: '#ddd' },
//   emptyText: { textAlign: 'center', color: '#aaa', marginTop: 40 }
// });
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function BooksScreen() {
  return (
    <View style={styles.container}>
      <Text>Экран книг (в разработке)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});