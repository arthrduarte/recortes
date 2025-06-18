import React from 'react';
import { StyleSheet, FlatList, Pressable, Dimensions } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 60) / 2; // Account for padding and gap

// Sample hobby data - in a real app this would come from API/state management
const SAMPLE_HOBBIES = [
  { id: 1, name: 'Fishing', emoji: '🎣', description: 'Peaceful water adventures' },
  { id: 2, name: 'Gardening', emoji: '🌱', description: 'Grow your own green paradise' },
  { id: 3, name: 'Photography', emoji: '📸', description: 'Capture life\'s beautiful moments' },
  { id: 4, name: 'Cooking', emoji: '👨‍🍳', description: 'Master the art of delicious meals' },
  { id: 5, name: 'Guitar', emoji: '🎸', description: 'Create music with your hands' },
  { id: 6, name: 'Woodworking', emoji: '🪚', description: 'Craft beautiful things from wood' },
  { id: 7, name: 'Painting', emoji: '🎨', description: 'Express yourself through colors' },
  { id: 8, name: 'Reading', emoji: '📚', description: 'Explore new worlds and ideas' },
];

interface HobbyCardProps {
  hobby: typeof SAMPLE_HOBBIES[0];
  onPress: () => void;
}

function HobbyCard({ hobby, onPress }: HobbyCardProps) {
  return (
    <Pressable style={styles.hobbyCard} onPress={onPress}>
      <View style={styles.hobbyCardContent}>
        <Text style={styles.hobbyEmoji}>{hobby.emoji}</Text>
        <Text style={styles.hobbyName}>{hobby.name}</Text>
        <Text style={styles.hobbyDescription}>{hobby.description}</Text>
      </View>
    </Pressable>
  );
}

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
  hobbyCard: {
    width: CARD_WIDTH,
    marginBottom: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(47, 149, 220, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(47, 149, 220, 0.1)',
  },
  hobbyCardContent: {
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'transparent',
  },
  hobbyEmoji: {
    fontSize: 32,
    marginBottom: 12,
  },
  hobbyName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  hobbyDescription: {
    fontSize: 12,
    opacity: 0.7,
    textAlign: 'center',
    lineHeight: 16,
  },
});
