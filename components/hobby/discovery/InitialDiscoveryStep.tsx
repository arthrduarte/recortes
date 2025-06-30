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
            {/* Left blue shape */}
            <View style={styles.leftShape}>
              <View style={[styles.shape, styles.blueShape]} />
              <View style={styles.whiteLine1} />
              <View style={styles.whiteLine2} />
            </View>
            
            {/* Right green shape */}
            <View style={styles.rightShape}>
              <View style={[styles.shape, styles.greenShape]} />
              <View style={styles.whiteLine3} />
              <View style={styles.whiteLine4} />
            </View>
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
  leftShape: {
    position: 'absolute',
    left: 0,
    top: 20,
  },
  rightShape: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
  shape: {
    width: 120,
    height: 140,
    borderRadius: 60,
  },
  blueShape: {
    backgroundColor: '#7BA0E4',
    transform: [{ rotate: '-15deg' }],
  },
  greenShape: {
    backgroundColor: '#4ADE80',
    transform: [{ rotate: '10deg' }],
  },
  whiteLine1: {
    position: 'absolute',
    bottom: -20,
    left: 30,
    width: 40,
    height: 2,
    backgroundColor: '#FFFFFF',
    transform: [{ rotate: '45deg' }],
  },
  whiteLine2: {
    position: 'absolute',
    bottom: -35,
    left: 45,
    width: 25,
    height: 2,
    backgroundColor: '#FFFFFF',
    transform: [{ rotate: '-30deg' }],
  },
  whiteLine3: {
    position: 'absolute',
    bottom: -15,
    right: 25,
    width: 35,
    height: 2,
    backgroundColor: '#FFFFFF',
    transform: [{ rotate: '-45deg' }],
  },
  whiteLine4: {
    position: 'absolute',
    bottom: -30,
    right: 40,
    width: 20,
    height: 2,
    backgroundColor: '#FFFFFF',
    transform: [{ rotate: '60deg' }],
  },
  footerContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    gap: 16,
  },
  continueButton: {
    backgroundColor: '#7BA0E4',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
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
