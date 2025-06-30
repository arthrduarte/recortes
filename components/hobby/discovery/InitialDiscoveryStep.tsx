import { View, Text, StyleSheet, Pressable, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native';
import React from 'react';

interface InitialDiscoveryStepProps {
  hobbyName: string;
  hobbyEmoji: string;
  onContinue: () => void;
  onSkip: () => void;
}

export default function InitialDiscoveryStep({ 
  hobbyName, 
  hobbyEmoji, 
  onContinue, 
  onSkip 
}: InitialDiscoveryStepProps) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#242424" />
      
      {/* Main Content */}
      <View style={styles.contentContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>
            Hi and welcome to your <Text style={styles.titleHighlight}>{hobbyName}</Text> planning!
          </Text>
          
          <Text style={styles.subtitle}>
            Let's take a few minutes to get you setup. Make sure you're in a quiet space and ready for a few simple steps.
          </Text>
        </View>

        {/* Illustration Container */}
        <View style={styles.illustrationContainer}>
          <View style={styles.illustration}>
            {/* Camera emojis */}
            <Text style={[styles.emoji, styles.cameraEmoji]}>{hobbyEmoji}</Text>
            <Text style={[styles.emoji, styles.videoEmoji]}>{hobbyEmoji}</Text>
            <Text style={[styles.emoji, styles.filmEmoji]}>{hobbyEmoji}</Text>
          </View>
        </View>
      </View>

      {/* Footer with buttons */}
      <View style={styles.footerContainer}>
        <TouchableOpacity style={styles.continueButton} onPress={onContinue}>
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#242424',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  textContainer: {
    marginBottom: 60,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 36,
    marginBottom: 24,
    fontFamily: 'Inter',
  },
  titleHighlight: {
    color: '#7BA0E4',
    fontStyle: 'italic',
  },
  subtitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    opacity: 0.8,
    fontFamily: 'Inter',
  },
  illustrationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  illustration: {
    width: 280,
    height: 220,
    position: 'relative',
  },
  emoji: {
    position: 'absolute',
    fontSize: 120,
    color: '#FFFFFF',
  },
  cameraEmoji: {
    left: -10,
    top: 10,
    transform: [{ rotate: '-15deg' }],
  },
  videoEmoji: {
    right: -20,
    top: 30,
    transform: [{ rotate: '10deg' }],
  },
  filmEmoji: {
    left: 40,
    bottom: 20,
    transform: [{ rotate: '5deg' }],
  },
  footerContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    gap: 16,
  },
  continueButton: {
    backgroundColor: '#7BA0E4',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#7BA0E4',
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 1,
    fontFamily: 'Inter',
  },
  skipButton: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  skipButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '400',
    opacity: 0.7,
    fontFamily: 'Inter',
  },
});
