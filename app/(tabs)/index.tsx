import React from 'react';
import { StyleSheet, ScrollView, Pressable } from 'react-native';
import { Text, View } from '@/components/Themed';

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
        <View style={styles.hobbyTextContainer}>
          <Text style={styles.hobbyName}>{hobby.name}</Text>
          <Text style={styles.hobbyDescription}>{hobby.description}</Text>
        </View>
      </View>
    </Pressable>
  );
}

export default function DiscoverScreen() {
  const handleHobbyPress = (hobby: typeof SAMPLE_HOBBIES[0]) => {
    console.log(`Tapped on ${hobby.name} - TODO: Navigate to onboarding flow`);
    // TODO: Navigate to hobby onboarding flow
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Discover New Hobbies</Text>
      <Text style={styles.subtitle}>Find something new that sparks your interest</Text>
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {SAMPLE_HOBBIES.map(hobby => (
          <HobbyCard
            key={hobby.id}
            hobby={hobby}
            onPress={() => handleHobbyPress(hobby)}
          />
        ))}
      </ScrollView>
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
  scrollView: {
    flex: 1,
  },
  hobbyCard: {
    marginBottom: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(47, 149, 220, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(47, 149, 220, 0.1)',
  },
  hobbyCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'transparent',
  },
  hobbyEmoji: {
    fontSize: 32,
    marginRight: 16,
  },
  hobbyTextContainer: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  hobbyName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  hobbyDescription: {
    fontSize: 14,
    opacity: 0.7,
  },
});
