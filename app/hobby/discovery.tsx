import { View, Text, StyleSheet, Pressable, SafeAreaView, StatusBar } from 'react-native';
import React, { useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import InitialDiscoveryStep from '@/components/hobby/discovery/InitialDiscoveryStep';

interface DiscoveryOption {
  id: string;
  text: string;
  icon: string;
}

const DISCOVERY_OPTIONS: DiscoveryOption[] = [
  {
    id: 'positive_feelings',
    text: 'I want to feel more positive around others',
    icon: '🟢'
  },
  {
    id: 'better_relationships', 
    text: 'I want to build better relationships',
    icon: '👥'
  },
  {
    id: 'stress_anxiety',
    text: 'I want to improve how I handle stress and anxiety',
    icon: '🔶'
  },
  {
    id: 'understand_emotions',
    text: 'I want to understand how emotions work',
    icon: '☁️'
  },
  {
    id: 'other_reason',
    text: 'Another reason not listed here',
    icon: '🧩'
  }
];

type DiscoveryStep = 'initial' | 'questions';

export default function HobbyDiscoveryScreen() {
  const { hobbyId, hobbyName, hobbyEmoji } = useLocalSearchParams();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<DiscoveryStep>('initial');
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleInitialContinue = () => {
    setCurrentStep('questions');
  };

  const handleInitialSkip = () => {
    // Skip the entire discovery flow and go back
    router.back();
  };

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);
  };

  const handleQuestionsContinue = () => {
    if (selectedOption) {
      // TODO: Save the selected reason and continue to next step
      console.log(`Selected reason: ${selectedOption} for hobby: ${hobbyName}`);
      // For now, go back - in a real app this would continue the onboarding flow
      router.back();
    }
  };

  // Render initial discovery step
  if (currentStep === 'initial') {
    return (
      <InitialDiscoveryStep
        hobbyName={hobbyName as string}
        hobbyEmoji={hobbyEmoji as string}
        onContinue={handleInitialContinue}
        onSkip={handleInitialSkip}
      />
    );
  }

  // Render questions step
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#242424" />
      
      {/* Progress Indicator */}
      <View style={styles.headerContainer}>
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>2 / 9</Text>
        </View>
      </View>

      {/* Main Content */}
      <View style={styles.contentContainer}>
        <Text style={styles.title}>
          Before creating your <Text style={{fontStyle: 'italic'}}>{hobbyName}</Text> plan, let's explore your goals.
        </Text>

        <View style={styles.optionsContainer}>
          {DISCOVERY_OPTIONS.map((option) => (
            <Pressable
              key={option.id}
              style={[
                styles.optionButton,
                selectedOption === option.id && styles.optionButtonSelected
              ]}
              onPress={() => handleOptionSelect(option.id)}
            >
              <View style={styles.radioButton}>
                {selectedOption === option.id && <View style={styles.radioButtonInner} />}
              </View>
              <Text style={styles.optionText}>{option.text}</Text>
              <Text style={styles.optionIcon}>{option.icon}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      {/* Continue Button */}
      <View style={styles.footerContainer}>
        <Pressable
          style={[
            styles.continueButton,
            !selectedOption && styles.continueButtonDisabled
          ]}
          onPress={handleQuestionsContinue}
          disabled={!selectedOption}
        >
          <Text style={[
            styles.continueButtonText,
            !selectedOption && styles.continueButtonTextDisabled
          ]}>
            Continue
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#242424',
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  progressContainer: {
    alignItems: 'center',
  },
  progressText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '400',
    fontFamily: 'Inter',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 36,
    marginBottom: 40,
    fontFamily: 'Inter',
  },
  optionsContainer: {
    gap: 16,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 4,
  },
  optionButtonSelected: {
    // Visual feedback for selection could be added here if needed
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    marginRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#7BA0E4',
  },
  optionText: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    fontFamily: 'Inter',
  },
  optionIcon: {
    fontSize: 24,
    marginLeft: 12,
  },
  footerContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    paddingTop: 20,
  },
  continueButton: {
    backgroundColor: '#7BA0E4',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#7BA0E4',
  },
  continueButtonDisabled: {
    backgroundColor: '#7BA0E4',
    borderColor: '#7BA0E4',
    opacity: 0.5,
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 1,
    fontFamily: 'Inter',
  },
  continueButtonTextDisabled: {
    opacity: 0.7,
  },
});