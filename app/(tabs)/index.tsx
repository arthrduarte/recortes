import React from 'react';
import { StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useRouter } from 'expo-router';
import HobbyCard from '@/components/HobbyCard';

// Sample hobby data - in a real app this would come from API/state management
export const SAMPLE_HOBBIES = [
  { id: 1, name: 'Fishing', emoji: '🎣', description: 'Peaceful water adventures' },
  { id: 2, name: 'Gardening', emoji: '🌱', description: 'Grow your own green paradise' },
  { id: 3, name: 'Photography', emoji: '📸', description: 'Capture life\'s beautiful moments' },
  { id: 4, name: 'Cooking', emoji: '👨‍🍳', description: 'Master the art of delicious meals' },
  { id: 5, name: 'Guitar', emoji: '🎸', description: 'Create music with your hands' },
  { id: 6, name: 'Woodworking', emoji: '🪚', description: 'Craft beautiful things from wood' },
  { id: 7, name: 'Painting', emoji: '🎨', description: 'Express yourself through colors' },
  { id: 8, name: 'Reading', emoji: '📚', description: 'Explore new worlds and ideas' },
];

export default function DiscoverScreen() {
  const router = useRouter();

  const handleHobbyPress = (hobby: typeof SAMPLE_HOBBIES[0]) => {
    console.log(`Navigating to onboarding for ${hobby.name}`);
    router.push({
      pathname: '/hobby-onboarding',
      params: { hobbyId: hobby.id, hobbyName: hobby.name, hobbyEmoji: hobby.emoji }
    });
  };

  const renderHobbyCard = ({ item }: { item: typeof SAMPLE_HOBBIES[0] }) => (
    <HobbyCard
      hobby={item}
      onPress={() => handleHobbyPress(item)}
    />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Discover New Hobbies</Text>
      <Text style={styles.subtitle}>Find something new that sparks your interest</Text>
      
      <FlatList
        data={SAMPLE_HOBBIES}
        renderItem={renderHobbyCard}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.flatListContent}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
    marginBottom: 24,
  },
  flatListContent: {
    paddingBottom: 20,
  },
  row: {
    justifyContent: 'space-between',
  },
});
