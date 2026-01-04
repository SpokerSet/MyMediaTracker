import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function MediaCard({ item, isSaved, onToggle, type }) {
  const title = item.title || item.name || (item.volumeInfo && item.volumeInfo.title);
  const subTitle = item.release_date || item.released || (item.volumeInfo && item.volumeInfo.publishedDate);
  
  let imageUri = 'https://via.placeholder.com/200x300';
  if (type === 'movie' && item.poster_path) imageUri = `https://image.tmdb.org/t/p/w200${item.poster_path}`;
  if (type === 'game' && item.background_image) imageUri = item.background_image;
  if (type === 'book' && item.volumeInfo?.imageLinks?.thumbnail) imageUri = item.volumeInfo.imageLinks.thumbnail;

  return (
    <View style={styles.card}>
      <Image source={{ uri: imageUri }} style={styles.poster} />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>{title}</Text>
        <Text style={styles.subTitle}>{subTitle?.split('-')[0] || '—'}</Text>
        
        <TouchableOpacity 
          style={[styles.button, isSaved && styles.removeButton]} 
          onPress={onToggle}
        >
          <Ionicons name={isSaved ? "trash" : "add-circle"} size={18} color="#fff" />
          <Text style={styles.buttonText}>{isSaved ? "Удалить" : "Добавить"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', marginBottom: 12, backgroundColor: '#fff', borderRadius: 12, overflow: 'hidden', elevation: 2 },
  poster: { width: 85, height: 125 },
  info: { flex: 1, padding: 12, justifyContent: 'space-between' },
  title: { fontSize: 16, fontWeight: 'bold' },
  subTitle: { color: '#888', fontSize: 14 },
  button: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#6200ee', padding: 8, borderRadius: 6, alignSelf: 'flex-start' },
  removeButton: { backgroundColor: '#ff4444' },
  buttonText: { color: '#fff', marginLeft: 5, fontSize: 13, fontWeight: '600' }
});