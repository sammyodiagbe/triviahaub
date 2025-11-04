import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SIZES, FONTS, SHADOWS, RADIUS } from '../constants/theme';

export default function CategoryCard({ name, icon, gradient, onPress }) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <LinearGradient
        colors={gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.gradient, SHADOWS.medium]}
      >
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>{icon}</Text>
        </View>
        <Text style={styles.name}>{name}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '47%',
    aspectRatio: 1,
    marginBottom: SIZES.sm,
  },
  gradient: {
    flex: 1,
    borderRadius: RADIUS.xl,
    padding: SIZES.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    width: 70,
    height: 70,
    borderRadius: RADIUS.full,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SIZES.md,
  },
  icon: {
    fontSize: 24,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  name: {
    fontSize: FONTS.medium,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});
