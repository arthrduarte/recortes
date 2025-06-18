import React from 'react';
import { StyleSheet, ScrollView, Pressable } from 'react-native';
import { Text, View } from '@/components/Themed';

// Sample user hobbies data - in a real app this would come from state management
const USER_HOBBIES = [
  {
    id: 1,
    name: 'Guitar',
    emoji: '🎸',
    progress: 25,
    totalTasks: 12,
    completedTasks: 3,
  },
  {
    id: 2,
    name: 'Gardening',
    emoji: '🌱',
    progress: 60,
    totalTasks: 10,
    completedTasks: 6,
  },
  {
    id: 3,
    name: 'Photography',
    emoji: '📸',
    progress: 10,
    totalTasks: 15,
    completedTasks: 1,
  },
];

interface ProgressBarProps {
  progress: number;
}

function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <View style={styles.progressBarContainer}>
      <View style={styles.progressBarBg}>
        <View 
          style={[
            styles.progressBarFill, 
            { width: `${Math.min(progress, 100)}%` }
          ]} 
        />
      </View>
      <Text style={styles.progressText}>{progress}%</Text>
    </View>
  );
}

interface HobbySummaryCardProps {
  hobby: typeof USER_HOBBIES[0];
  onPress: () => void;
}

function HobbySummaryCard({ hobby, onPress }: HobbySummaryCardProps) {
  return (
    <Pressable style={styles.hobbyCard} onPress={onPress}>
      <View style={styles.hobbyCardContent}>
        <Text style={styles.hobbyEmoji}>{hobby.emoji}</Text>
        <View style={styles.hobbyDetails}>
          <Text style={styles.hobbyName}>{hobby.name}</Text>
          <Text style={styles.tasksText}>
            {hobby.completedTasks} of {hobby.totalTasks} tasks completed
          </Text>
          <ProgressBar progress={hobby.progress} />
        </View>
      </View>
    </Pressable>
  );
}

export default function MyHobbiesScreen() {
  const handleHobbyPress = (hobby: typeof USER_HOBBIES[0]) => {
    console.log(`Tapped on ${hobby.name} - TODO: Navigate to hobby detail screen`);
    // TODO: Navigate to hobby detail screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Hobbies</Text>
      <Text style={styles.subtitle}>Continue your journey</Text>

      {USER_HOBBIES.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateEmoji}>🌟</Text>
          <Text style={styles.emptyStateTitle}>No hobbies yet</Text>
          <Text style={styles.emptyStateText}>
            Discover new hobbies to get started on your journey!
          </Text>
        </View>
      ) : (
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {USER_HOBBIES.map(hobby => (
            <HobbySummaryCard
              key={hobby.id}
              hobby={hobby}
              onPress={() => handleHobbyPress(hobby)}
            />
          ))}
        </ScrollView>
      )}
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
  hobbyDetails: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  hobbyName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  tasksText: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 8,
  },
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  progressBarBg: {
    flex: 1,
    height: 8,
    backgroundColor: 'rgba(47, 149, 220, 0.1)',
    borderRadius: 4,
    marginRight: 12,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#2f95dc',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2f95dc',
    minWidth: 32,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  emptyStateEmoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 16,
    opacity: 0.7,
    textAlign: 'center',
    paddingHorizontal: 32,
  },
}); 