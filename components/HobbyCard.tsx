import { SAMPLE_HOBBIES } from "@/app/(tabs)";
import { Pressable, View, Text, StyleSheet, Dimensions } from "react-native";

interface HobbyCardProps {
  hobby: typeof SAMPLE_HOBBIES[0];
  onPress: () => void;
}

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 60) / 2; // Account for padding and gap

// Color palette matching the attached image style
const CARD_COLORS = [
  '#7BA0E4', // Primary Vista Blue
  '#6B8FD3', // Darker Vista Blue
  '#8CB1F5', // Lighter Vista Blue
  '#A14DA0', // Purpureus Purple
  '#915090', // Darker Purple
  '#B15EB0', // Lighter Purple
  '#FBAF00', // Accent Orange
  '#E29E00', // Darker Orange
];

function HobbyCard({ hobby, onPress }: HobbyCardProps) {
  // Use hobby name to consistently assign colors
  const colorIndex = hobby.name.length % CARD_COLORS.length;
  const backgroundColor = CARD_COLORS[colorIndex];

  return (
    <Pressable 
      style={[styles.hobbyCard, { backgroundColor }]} 
      onPress={onPress}
      android_ripple={{ color: 'rgba(255,255,255,0.2)' }}
    >
      <View style={styles.hobbyCardContent}>
        <Text style={styles.hobbyName}>{hobby.name}</Text>
        <Text style={styles.hobbyDescription}>{hobby.description}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({  
  hobbyCard: {
    width: CARD_WIDTH,
    height: 180,
    marginBottom: 16,
    borderRadius: 48,
    // Material Design elevation
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  hobbyCardContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  hobbyName: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
    textAlign: 'center',
    color: '#FFFFFF',
    fontFamily: 'Inter',
  },
  hobbyDescription: {
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
    color: '#FFFFFF',
    opacity: 0.8,
    fontFamily: 'Inter',
  },
});

export default HobbyCard;