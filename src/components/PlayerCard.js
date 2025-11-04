import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../context/ThemeContext';
import { getColors, SIZES, FONTS, SHADOWS, RADIUS } from '../constants/theme';

export default function PlayerCard({ username, score, avatar, isReady, showScore = true }) {
  const { isDark } = useTheme();
  const COLORS = getColors(isDark);

  return (
    <View style={[styles.container, { backgroundColor: COLORS.card }, SHADOWS.small]}>
      <View style={styles.avatarContainer}>
        <LinearGradient
          colors={[COLORS.primary, COLORS.primaryDark]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.avatar}
        >
          <Text style={styles.avatarText}>{avatar || username?.charAt(0).toUpperCase()}</Text>
        </LinearGradient>
        {isReady !== undefined && (
          <View style={[
            styles.statusBadge,
            { borderColor: COLORS.card },
            isReady ? { backgroundColor: COLORS.success } : { backgroundColor: COLORS.disabled }
          ]}>
            <Text style={styles.statusText}>{isReady ? '✓' : '○'}</Text>
          </View>
        )}
      </View>
      <View style={styles.infoContainer}>
        <Text style={[styles.username, { color: COLORS.text }]} numberOfLines={1}>{username}</Text>
        {showScore && (
          <Text style={[styles.score, { color: COLORS.textSecondary }]}>{score || 0} pts</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SIZES.md,
    borderRadius: RADIUS.lg,
    marginVertical: SIZES.xs,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: FONTS.large + 2,
    fontWeight: '800',
  },
  statusBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 22,
    height: 22,
    borderRadius: RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
  },
  infoContainer: {
    marginLeft: SIZES.md,
    flex: 1,
  },
  username: {
    fontSize: FONTS.medium,
    fontWeight: '700',
    marginBottom: 4,
  },
  score: {
    fontSize: FONTS.small,
    fontWeight: '600',
  },
});
