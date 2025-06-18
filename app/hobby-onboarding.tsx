import React, { useState } from 'react';
import { StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useLocalSearchParams, useRouter } from 'expo-router';

// Questions data structure based on PRD requirements
const ONBOARDING_QUESTIONS = [
  {
    id: 1,
    question: "What's your experience level?",
    options: [
      { id: 'never', label: 'Never tried this before', value: 'beginner' },
      { id: 'some', label: 'Tried it a few times', value: 'intermediate' },
      { id: 'experienced', label: 'I have some experience', value: 'advanced' },
    ]
  },
  {
    id: 2,
    question: "How much time can you dedicate per week?",
    options: [
      { id: 'minimal', label: '1-2 hours', value: 'minimal' },
      { id: 'moderate', label: '3-5 hours', value: 'moderate' },
      { id: 'dedicated', label: '6+ hours', value: 'dedicated' },
    ]
  },
  {
    id: 3,
    question: "What's your budget for getting started?",
    options: [
      { id: 'low', label: 'Under $50', value: 'low' },
      { id: 'medium', label: '$50 - $200', value: 'medium' },
      { id: 'high', label: '$200+', value: 'high' },
    ]
  },
  {
    id: 4,
    question: "What's your main goal?",
    options: [
      { id: 'fun', label: 'Just for fun and relaxation', value: 'recreational' },
      { id: 'skill', label: 'Learn a new skill', value: 'educational' },
      { id: 'social', label: 'Meet like-minded people', value: 'social' },
    ]
  }
];

interface OptionButtonProps {
  option: typeof ONBOARDING_QUESTIONS[0]['options'][0];
  isSelected: boolean;
  onPress: () => void;
}

function OptionButton({ option, isSelected, onPress }: OptionButtonProps) {
  return (
    <Pressable
      style={[
        styles.optionButton,
        isSelected && styles.optionButtonSelected
      ]}
      onPress={onPress}
    >
      <Text style={[
        styles.optionText,
        isSelected && styles.optionTextSelected
      ]}>
        {option.label}
      </Text>
    </Pressable>
  );
}

export default function HobbyOnboardingScreen() {
  const { hobbyId, hobbyName, hobbyEmoji } = useLocalSearchParams<{
    hobbyId: string;
    hobbyName: string;
    hobbyEmoji: string;
  }>();
  
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const currentQuestion = ONBOARDING_QUESTIONS[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === ONBOARDING_QUESTIONS.length - 1;

  const handleOptionSelect = (optionValue: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: optionValue
    }));

    // Auto-advance to next question or finish
    setTimeout(() => {
      if (isLastQuestion) {
        handleFinish();
      } else {
        setCurrentQuestionIndex(prev => prev + 1);
      }
    }, 300); // Small delay for visual feedback
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleFinish = async () => {
    setIsLoading(true);
    
    // Simulate API call to create personalized hobby plan
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Creating hobby plan with answers:', {
      hobbyId,
      hobbyName,
      answers
    });

    // TODO: Save the hobby to user's hobbies with personalized plan
    // For now, just navigate back to the hobbies tab
    router.replace('/(tabs)/hobbies');
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingEmoji}>{hobbyEmoji}</Text>
        <ActivityIndicator size="large" color="#2f95dc" style={styles.spinner} />
        <Text style={styles.loadingTitle}>Creating Your Journey!</Text>
        <Text style={styles.loadingText}>
          Sit tight while we create your personalized {hobbyName} plan...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.hobbyEmoji}>{hobbyEmoji}</Text>
        <Text style={styles.hobbyName}>{hobbyName}</Text>
        <Text style={styles.subtitle}>Let's personalize your journey</Text>
      </View>

      {/* Progress Indicator */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill,
              { width: `${((currentQuestionIndex + 1) / ONBOARDING_QUESTIONS.length) * 100}%` }
            ]}
          />
        </View>
        <Text style={styles.progressText}>
          {currentQuestionIndex + 1} of {ONBOARDING_QUESTIONS.length}
        </Text>
      </View>

      {/* Question */}
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>{currentQuestion.question}</Text>
        
        <View style={styles.optionsContainer}>
          {currentQuestion.options.map((option) => (
            <OptionButton
              key={option.id}
              option={option}
              isSelected={answers[currentQuestion.id] === option.value}
              onPress={() => handleOptionSelect(option.value)}
            />
          ))}
        </View>
      </View>

      {/* Navigation */}
      <View style={styles.navigationContainer}>
        {currentQuestionIndex > 0 && (
          <Pressable style={styles.backButton} onPress={handleBack}>
            <Text style={styles.backButtonText}>Back</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
    backgroundColor: 'transparent',
  },
  hobbyEmoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  hobbyName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
  },
  progressContainer: {
    marginBottom: 32,
    backgroundColor: 'transparent',
  },
  progressBar: {
    height: 6,
    backgroundColor: 'rgba(47, 149, 220, 0.1)',
    borderRadius: 3,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2f95dc',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    opacity: 0.7,
    textAlign: 'center',
  },
  questionContainer: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  questionText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  optionsContainer: {
    gap: 12,
    backgroundColor: 'transparent',
  },
  optionButton: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(47, 149, 220, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(47, 149, 220, 0.1)',
  },
  optionButtonSelected: {
    backgroundColor: '#2f95dc',
    borderColor: '#2f95dc',
  },
  optionText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#2f95dc',
  },
  optionTextSelected: {
    color: 'white',
    fontWeight: '600',
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 32,
    backgroundColor: 'transparent',
  },
  backButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: 'rgba(47, 149, 220, 0.1)',
  },
  backButtonText: {
    color: '#2f95dc',
    fontWeight: '600',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    backgroundColor: 'transparent',
  },
  loadingEmoji: {
    fontSize: 64,
    marginBottom: 24,
  },
  spinner: {
    marginBottom: 24,
  },
  loadingTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  loadingText: {
    fontSize: 16,
    opacity: 0.7,
    textAlign: 'center',
    lineHeight: 24,
  },
}); 