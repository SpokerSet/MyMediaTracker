import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

type Props = {
  rating: number | null;
  onRatingChange: (rating: number) => void;
};

export const StarRating: React.FC<Props> = ({ rating, onRatingChange }) => {
  return (
    <View style={styles.stars}>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
        <TouchableOpacity key={star} onPress={() => onRatingChange(star)}>
          <Text style={star <= (rating || 0) ? styles.starFilled : styles.starEmpty}>
            ★
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  stars: { flexDirection: 'row', marginVertical: 4 },
  starFilled: { fontSize: 22, color: '#ffd700' },
  starEmpty: { fontSize: 22, color: '#ddd' },
});