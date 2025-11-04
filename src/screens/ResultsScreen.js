import React from 'react';
import { View, Text, StyleSheet, FlatList, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Button from '../components/Button';
import PlayerCard from '../components/PlayerCard';
import { useTheme } from '../context/ThemeContext';
import { getColors, SIZES, FONTS, SHADOWS, RADIUS } from '../constants/theme';

export default function ResultsScreen({ navigation, route }) {
  const { scores, players, category } = route.params;
  const { isDark } = useTheme();
  const COLORS = getColors(isDark);

  // Sort players by score
  const sortedPlayers = [...players].sort((a, b) => {
    const scoreA = scores[a.id] || 0;
    const scoreB = scores[b.id] || 0;
    return scoreB - scoreA;
  });

  const winner = sortedPlayers[0];
  const winnerScore = scores[winner.id] || 0;

  const handlePlayAgain = () => {
    navigation.navigate('Categories', { mode: 'quick' });
  };

  const handleBackHome = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={[styles.container, { backgroundColor: COLORS.background }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <View style={[styles.trophyContainer, { backgroundColor: COLORS.primary + '20' }]}>
            <Text style={[styles.trophy, { color: COLORS.primary }]}>★</Text>
          </View>
          <Text style={[styles.title, { color: COLORS.text }]}>Battle Complete</Text>
          <Text style={[styles.winnerText, { color: COLORS.primary }]}>
            {winner.username} wins
          </Text>
          <LinearGradient
            colors={[COLORS.primary, COLORS.primaryDark]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.categoryBadge}
          >
            <Text style={styles.categoryText}>{category}</Text>
          </LinearGradient>
        </View>

        <View style={styles.podiumContainer}>
          <LinearGradient
            colors={[COLORS.warning, '#FFD700']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.winnerCard, SHADOWS.large]}
          >
            <View style={[styles.winnerAvatar, { borderColor: '#FFFFFF' }]}>
              <Text style={styles.winnerAvatarText}>
                {winner.username.charAt(0).toUpperCase()}
              </Text>
            </View>
            <Text style={styles.winnerName}>{winner.username}</Text>
            <View style={styles.winnerBadge}>
              <Text style={styles.winnerBadgeText}>WINNER</Text>
            </View>
            <Text style={styles.winnerScore}>{winnerScore} pts</Text>
          </LinearGradient>
        </View>

        <View style={styles.rankingsSection}>
          <Text style={[styles.sectionTitle, { color: COLORS.text }]}>Final Rankings</Text>
          <FlatList
            data={sortedPlayers}
            keyExtractor={(item, index) => item.id}
            renderItem={({ item, index }) => {
              return (
                <View style={styles.rankingItem}>
                  <View style={[styles.rankBadge, { backgroundColor: index === 0 ? COLORS.warning : COLORS.primary }]}>
                    <Text style={styles.rankText}>#{index + 1}</Text>
                  </View>
                  <PlayerCard
                    username={item.username}
                    score={scores[item.id] || 0}
                    showScore={true}
                  />
                </View>
              );
            }}
            contentContainerStyle={styles.rankingsList}
          />
        </View>

        <View style={styles.footer}>
          <Button
            title="Play Again"
            onPress={handlePlayAgain}
          />
          <Button
            title="Back to Home"
            variant="outline"
            onPress={handleBackHome}
            style={styles.homeButton}
          />
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    paddingHorizontal: SIZES.lg,
    paddingVertical: SIZES.lg,
    alignItems: 'center',
  },
  trophyContainer: {
    width: 80,
    height: 80,
    borderRadius: RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SIZES.md,
  },
  trophy: {
    fontSize: 50,
    fontWeight: '800',
  },
  title: {
    fontSize: FONTS.xlarge + 4,
    fontWeight: '800',
    marginBottom: SIZES.xs,
  },
  winnerText: {
    fontSize: FONTS.large + 2,
    fontWeight: '700',
    marginBottom: SIZES.md,
  },
  categoryBadge: {
    paddingVertical: SIZES.sm,
    paddingHorizontal: SIZES.lg,
    borderRadius: RADIUS.full,
    ...SHADOWS.small,
  },
  categoryText: {
    color: '#FFFFFF',
    fontSize: FONTS.medium,
    fontWeight: '700',
  },
  podiumContainer: {
    paddingHorizontal: SIZES.lg,
    paddingVertical: SIZES.md,
    alignItems: 'center',
  },
  winnerCard: {
    borderRadius: RADIUS.xxl,
    padding: SIZES.xl,
    alignItems: 'center',
    width: '100%',
  },
  winnerAvatar: {
    width: 90,
    height: 90,
    borderRadius: RADIUS.full,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SIZES.md,
    borderWidth: 4,
  },
  winnerBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    paddingHorizontal: SIZES.lg,
    paddingVertical: SIZES.xs,
    borderRadius: RADIUS.full,
    marginBottom: SIZES.sm,
  },
  winnerBadgeText: {
    color: '#FFFFFF',
    fontSize: FONTS.small,
    fontWeight: '800',
    letterSpacing: 1,
  },
  winnerAvatarText: {
    color: '#FFC107',
    fontSize: FONTS.xxlarge + 8,
    fontWeight: '800',
  },
  winnerName: {
    fontSize: FONTS.large + 2,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: SIZES.xs,
  },
  winnerScore: {
    fontSize: FONTS.xlarge + 4,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  rankingsSection: {
    flex: 1,
    paddingHorizontal: SIZES.lg,
    paddingTop: SIZES.lg,
  },
  sectionTitle: {
    fontSize: FONTS.medium,
    fontWeight: '700',
    marginBottom: SIZES.md,
  },
  rankingsList: {
    paddingBottom: SIZES.md,
  },
  rankingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.md,
  },
  rankBadge: {
    width: 44,
    height: 44,
    borderRadius: RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SIZES.md,
  },
  rankText: {
    fontSize: FONTS.medium,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  footer: {
    paddingHorizontal: SIZES.lg,
    paddingBottom: SIZES.xl,
  },
  homeButton: {
    marginTop: SIZES.md,
  },
});
