import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { cardStyles as styles } from '../styles/cardStyles'; // Импорт стилей

export default function MediaCard({ item, type, isSaved, onToggle }) {
  const title = item.title || item.volumeInfo?.title || item.name;
  const image = item.poster_path 
    ? `https://image.tmdb.org/t/p/w200${item.poster_path}`
    : item.volumeInfo?.imageLinks?.thumbnail || item.background_image;

  return (
    <View style={styles.card}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.info}>
        <View>
          <Text numberOfLines={2} style={styles.title}>{title}</Text>
          <Text style={styles.typeTag}>{type.toUpperCase()}</Text>
        </View>
        
        <TouchableOpacity 
          style={[styles.button, isSaved ? styles.removeBtn : styles.addBtn]} 
          onPress={onToggle}
        >
          <Text style={styles.buttonText}>{isSaved ? 'Удалить' : 'Добавить'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}