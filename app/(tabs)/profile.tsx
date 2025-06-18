import React, { useState } from 'react';
import { StyleSheet, ScrollView, Pressable, Image, FlatList } from 'react-native';
import { Text, View } from '@/components/Themed';

// Sample user data - in a real app this would come from state management
const USER_DATA = {
  name: 'Jerry Thompson',
  avatar: null, // In a real app, this would be an image URI
  interests: ['Music', 'Outdoors', 'DIY', 'History', 'Cooking'],
};

// Sample interests that can be selected
const AVAILABLE_INTERESTS = [
  'Music', 'Outdoors', 'DIY', 'History', 'Cooking', 'Art', 'Sports', 
  'Technology', 'Reading', 'Gaming', 'Travel', 'Photography', 'Fitness'
];

// Sample photos from hobby milestones - in a real app these would be actual user photos
const SAMPLE_PHOTOS = [
  { id: 1, uri: null, hobby: 'Guitar', milestone: 'First chord learned', date: '2024-01-15' },
  { id: 2, uri: null, hobby: 'Gardening', milestone: 'First tomato planted', date: '2024-01-20' },
  { id: 3, uri: null, hobby: 'Photography', milestone: 'First nature shot', date: '2024-02-01' },
  { id: 4, uri: null, hobby: 'Guitar', milestone: 'First song played', date: '2024-02-10' },
];

interface InterestChipProps {
  interest: string;
  isSelected: boolean;
  onPress: () => void;
}

function InterestChip({ interest, isSelected, onPress }: InterestChipProps) {
  return (
    <Pressable
      style={[
        styles.interestChip,
        isSelected && styles.interestChipSelected
      ]}
      onPress={onPress}
    >
      <Text style={[
        styles.interestChipText,
        isSelected && styles.interestChipTextSelected
      ]}>
        {interest}
      </Text>
    </Pressable>
  );
}

interface PhotoGridItemProps {
  photo: typeof SAMPLE_PHOTOS[0];
}

function PhotoGridItem({ photo }: PhotoGridItemProps) {
  return (
    <View style={styles.photoGridItem}>
      <View style={styles.photoPlaceholder}>
        <Text style={styles.photoPlaceholderText}>📸</Text>
      </View>
      <Text style={styles.photoHobby}>{photo.hobby}</Text>
      <Text style={styles.photoMilestone}>{photo.milestone}</Text>
    </View>
  );
}

export default function ProfileScreen() {
  const [isEditingInterests, setIsEditingInterests] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState(USER_DATA.interests);

  const handleInterestToggle = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(i => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleSaveInterests = () => {
    // TODO: Save interests to state management/API
    console.log('Saving interests:', selectedInterests);
    setIsEditingInterests(false);
  };

  const handleCancelEdit = () => {
    setSelectedInterests(USER_DATA.interests);
    setIsEditingInterests(false);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>👤</Text>
        </View>
        <Text style={styles.userName}>{USER_DATA.name}</Text>
      </View>

      {/* Interests Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>My Interests</Text>
          {!isEditingInterests ? (
            <Pressable 
              style={styles.editButton}
              onPress={() => setIsEditingInterests(true)}
            >
              <Text style={styles.editButtonText}>Edit</Text>
            </Pressable>
          ) : (
            <View style={styles.editActions}>
              <Pressable 
                style={styles.cancelButton}
                onPress={handleCancelEdit}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </Pressable>
              <Pressable 
                style={styles.saveButton}
                onPress={handleSaveInterests}
              >
                <Text style={styles.saveButtonText}>Save</Text>
              </Pressable>
            </View>
          )}
        </View>

        <View style={styles.interestsContainer}>
          {(isEditingInterests ? AVAILABLE_INTERESTS : selectedInterests).map(interest => (
            <InterestChip
              key={interest}
              interest={interest}
              isSelected={selectedInterests.includes(interest)}
              onPress={() => isEditingInterests && handleInterestToggle(interest)}
            />
          ))}
        </View>
      </View>

      {/* Photo Gallery Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>My Journey</Text>
        <Text style={styles.sectionSubtitle}>
          {SAMPLE_PHOTOS.length} milestone photos captured
        </Text>

        {SAMPLE_PHOTOS.length === 0 ? (
          <View style={styles.emptyGallery}>
            <Text style={styles.emptyGalleryEmoji}>📷</Text>
            <Text style={styles.emptyGalleryText}>
              Complete hobby milestones to start building your photo gallery!
            </Text>
          </View>
        ) : (
          <View style={styles.photoGrid}>
            {SAMPLE_PHOTOS.map(photo => (
              <PhotoGridItem key={photo.id} photo={photo} />
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  profileHeader: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 32,
    backgroundColor: 'transparent',
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(47, 149, 220, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 32,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 32,
    backgroundColor: 'transparent',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: 'transparent',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  sectionSubtitle: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 16,
  },
  editButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#2f95dc',
  },
  editButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  editActions: {
    flexDirection: 'row',
    gap: 12,
    backgroundColor: 'transparent',
  },
  cancelButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(47, 149, 220, 0.1)',
  },
  cancelButtonText: {
    color: '#2f95dc',
    fontWeight: '600',
    fontSize: 14,
  },
  saveButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#2f95dc',
  },
  saveButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    backgroundColor: 'transparent',
  },
  interestChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(47, 149, 220, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(47, 149, 220, 0.2)',
  },
  interestChipSelected: {
    backgroundColor: '#2f95dc',
    borderColor: '#2f95dc',
  },
  interestChipText: {
    fontSize: 14,
    color: '#2f95dc',
    fontWeight: '500',
  },
  interestChipTextSelected: {
    color: 'white',
  },
  photoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    backgroundColor: 'transparent',
  },
  photoGridItem: {
    width: '47%',
    backgroundColor: 'transparent',
  },
  photoPlaceholder: {
    aspectRatio: 1,
    backgroundColor: 'rgba(47, 149, 220, 0.1)',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  photoPlaceholderText: {
    fontSize: 24,
  },
  photoHobby: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 2,
  },
  photoMilestone: {
    fontSize: 11,
    opacity: 0.7,
  },
  emptyGallery: {
    alignItems: 'center',
    paddingVertical: 32,
    backgroundColor: 'transparent',
  },
  emptyGalleryEmoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyGalleryText: {
    fontSize: 16,
    opacity: 0.7,
    textAlign: 'center',
    paddingHorizontal: 24,
  },
}); 