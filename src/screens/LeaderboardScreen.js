import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { getColors, SIZES, FONTS, SHADOWS, RADIUS } from '../constants/theme';

// Dummy data for leaderboard
const DUMMY_LEADERBOARD = [
  { id: 1, username: 'Courtney Henry', points: 168975, avatar: '👩‍💼' },
  { id: 2, username: 'Eleanor Pena', points: 162955, avatar: '👨' },
  { id: 3, username: 'Arlene McCoy', points: 156975, avatar: '👩' },
  { id: 4, username: 'Albert Flores', points: 148975, avatar: '👨‍💼' },
  { id: 5, username: 'Bessie Cooper', points: 141570, avatar: '👩‍🦰' },
  { id: 6, username: 'Arlene McCoy', points: 131275, avatar: '👩' },
  { id: 7, username: 'Wade Warren', points: 128450, avatar: '👨‍🦱' },
  { id: 8, username: 'Jenny Wilson', points: 125890, avatar: '👩‍🦳' },
  { id: 9, username: 'Robert Fox', points: 122340, avatar: '👨‍🦲' },
  { id: 10, username: 'Marvin McKinney', points: 119870, avatar: '👨‍💻' },
];

export default function LeaderboardScreen() {
  const [profile, setProfile] = useState(null);
  const { isDark } = useTheme();
  const { user } = useAuth();
  const COLORS = getColors(isDark);

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const isCurrentUser = (username) => {
    return profile?.username === username;
  };

  const topThree = DUMMY_LEADERBOARD.slice(0, 3);
  const restOfLeaderboard = DUMMY_LEADERBOARD.slice(3);

  return (
    <View style={[styles.container, { backgroundColor: COLORS.background }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      <LinearGradient
        colors={[COLORS.background, COLORS.backgroundSecondary]}
        style={styles.gradient}
      >
        <SafeAreaView style={styles.safeArea}>
          {/* Fixed Header and Podium */}
          <View style={styles.fixedSection}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={[styles.headerTitle, { color: COLORS.text }]}>Leaderboard</Text>
              <Text style={[styles.headerSubtitle, { color: COLORS.textSecondary }]}>
                Top players this week
              </Text>
            </View>

            {/* Podium - Top 3 */}
            <View style={styles.podiumContainer}>
              {/* 2nd Place */}
              <View style={styles.podiumItem}>
                <View style={[styles.medalContainer, { backgroundColor: '#C0C0C0' + '30' }]}>
                  <Text style={styles.medalNumber}>2</Text>
                </View>
                <View style={[styles.avatar, styles.avatarSecond, { backgroundColor: COLORS.secondary }]}>
                  <Text style={styles.avatarText}>{topThree[1]?.avatar}</Text>
                </View>
                <Text style={[styles.podiumName, { color: COLORS.text }]} numberOfLines={1}>
                  {topThree[1]?.username}
                </Text>
                <View style={[styles.podiumPlatform, styles.platformSecond, { backgroundColor: COLORS.card }]}>
                  <Text style={[styles.platformRank, { color: '#C0C0C0' }]}>2nd</Text>
                  <Text style={[styles.platformPoints, { color: COLORS.textSecondary }]}>
                    {topThree[1]?.points.toLocaleString()}
                  </Text>
                </View>
              </View>

              {/* 1st Place */}
              <View style={[styles.podiumItem, styles.podiumFirst]}>
                <View style={styles.crownContainer}>
                  <Text style={styles.crown}>👑</Text>
                </View>
                <View style={[styles.medalContainer, { backgroundColor: '#FFD700' + '30' }]}>
                  <Text style={styles.medalNumber}>1</Text>
                </View>
                <View style={[styles.avatar, styles.avatarFirst, { backgroundColor: COLORS.primary }]}>
                  <Text style={styles.avatarText}>{topThree[0]?.avatar}</Text>
                </View>
                <Text style={[styles.podiumName, { color: COLORS.text }]} numberOfLines={1}>
                  {topThree[0]?.username}
                </Text>
                <View style={[styles.podiumPlatform, styles.platformFirst]}>
                  <LinearGradient
                    colors={[COLORS.primary, COLORS.primaryDark]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.platformGradient}
                  >
                    <Text style={styles.platformRankFirst}>1st</Text>
                    <Text style={styles.platformPointsFirst}>
                      {topThree[0]?.points.toLocaleString()}
                    </Text>
                  </LinearGradient>
                </View>
              </View>

              {/* 3rd Place */}
              <View style={styles.podiumItem}>
                <View style={[styles.medalContainer, { backgroundColor: '#CD7F32' + '30' }]}>
                  <Text style={styles.medalNumber}>3</Text>
                </View>
                <View style={[styles.avatar, styles.avatarThird, { backgroundColor: '#10b981' }]}>
                  <Text style={styles.avatarText}>{topThree[2]?.avatar}</Text>
                </View>
                <Text style={[styles.podiumName, { color: COLORS.text }]} numberOfLines={1}>
                  {topThree[2]?.username}
                </Text>
                <View style={[styles.podiumPlatform, styles.platformThird, { backgroundColor: COLORS.card }]}>
                  <Text style={[styles.platformRank, { color: '#CD7F32' }]}>3rd</Text>
                  <Text style={[styles.platformPoints, { color: COLORS.textSecondary }]}>
                    {topThree[2]?.points.toLocaleString()}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Scrollable Section */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {/* Rest of Leaderboard */}
            <View style={styles.listContainer}>
              {restOfLeaderboard.map((player, index) => {
                const rank = index + 4;
                const isCurrent = isCurrentUser(player.username);

                return (
                  <View
                    key={player.id}
                    style={[
                      styles.listItem,
                      isCurrent && styles.listItemCurrent,
                      {
                        backgroundColor: isCurrent ? COLORS.success + '20' : COLORS.card,
                        borderColor: isCurrent ? COLORS.success : 'transparent',
                      },
                      SHADOWS.small,
                    ]}
                  >
                    <View style={styles.listLeft}>
                      <Text
                        style={[
                          styles.rank,
                          {
                            color: isCurrent ? COLORS.success : COLORS.textSecondary,
                          },
                        ]}
                      >
                        {rank}
                      </Text>
                      <View
                        style={[
                          styles.listAvatar,
                          {
                            backgroundColor: isCurrent ? COLORS.success : COLORS.primary,
                          },
                        ]}
                      >
                        <Text style={styles.listAvatarText}>{player.avatar}</Text>
                      </View>
                      <Text
                        style={[
                          styles.listName,
                          {
                            color: isCurrent ? COLORS.success : COLORS.text,
                            fontWeight: isCurrent ? '700' : '600',
                          },
                        ]}
                      >
                        {player.username}
                      </Text>
                    </View>
                    <Text
                      style={[
                        styles.listPoints,
                        {
                          color: isCurrent ? COLORS.success : COLORS.textSecondary,
                        },
                      ]}
                    >
                      {player.points.toLocaleString()}
                    </Text>
                  </View>
                );
              })}
            </View>

            {/* Your Rank Card */}
            {profile && (
              <View style={[styles.yourRankCard, { backgroundColor: COLORS.card }, SHADOWS.medium]}>
                <View style={styles.yourRankHeader}>
                  <Text style={[styles.yourRankTitle, { color: COLORS.text }]}>Your Rank</Text>
                </View>
                <View style={styles.yourRankContent}>
                  <View style={styles.yourRankStat}>
                    <Text style={[styles.yourRankValue, { color: COLORS.primary }]}>
                      {profile.total_points || 0}
                    </Text>
                    <Text style={[styles.yourRankLabel, { color: COLORS.textSecondary }]}>
                      Points
                    </Text>
                  </View>
                  <View style={[styles.yourRankDivider, { backgroundColor: COLORS.border }]} />
                  <View style={styles.yourRankStat}>
                    <Text style={[styles.yourRankValue, { color: COLORS.secondary }]}>
                      N/A
                    </Text>
                    <Text style={[styles.yourRankLabel, { color: COLORS.textSecondary }]}>
                      Global Rank
                    </Text>
                  </View>
                </View>
              </View>
            )}
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  fixedSection: {
    backgroundColor: 'transparent',
  },
  scrollContent: {
    paddingBottom: SIZES.xxl + 60,
    paddingTop: SIZES.md,
  },
  header: {
    alignItems: 'center',
    paddingTop: SIZES.lg,
    paddingBottom: SIZES.md,
    marginBottom: 35,
  },
  headerTitle: {
    fontSize: FONTS.xxlarge,
    fontWeight: '800',
    letterSpacing: 0.5,
    marginBottom: SIZES.xxs,
  },
  headerSubtitle: {
    fontSize: FONTS.medium,
    fontWeight: '500',
  },
  podiumContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingHorizontal: SIZES.lg,
    paddingBottom: SIZES.lg,
    gap: SIZES.sm,
  },
  podiumItem: {
    flex: 1,
    alignItems: 'center',
  },
  podiumFirst: {
    marginTop: -SIZES.xl,
  },
  crownContainer: {
    marginBottom: SIZES.xs,
  },
  crown: {
    fontSize: 32,
  },
  medalContainer: {
    width: 32,
    height: 32,
    borderRadius: RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SIZES.sm,
  },
  medalNumber: {
    fontSize: FONTS.large,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SIZES.xs,
    ...SHADOWS.medium,
  },
  avatarFirst: {
    width: 80,
    height: 80,
    borderWidth: 3,
    borderColor: '#FFD700',
  },
  avatarSecond: {
    width: 70,
    height: 70,
  },
  avatarThird: {
    width: 70,
    height: 70,
  },
  avatarText: {
    fontSize: 36,
  },
  podiumName: {
    fontSize: FONTS.small,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: SIZES.xs,
  },
  podiumPlatform: {
    width: '100%',
    borderRadius: RADIUS.lg,
    padding: SIZES.sm,
    alignItems: 'center',
  },
  platformFirst: {
    overflow: 'hidden',
  },
  platformSecond: {
    paddingVertical: SIZES.md,
  },
  platformThird: {
    paddingVertical: SIZES.sm,
  },
  platformGradient: {
    width: '100%',
    padding: SIZES.sm,
    alignItems: 'center',
  },
  platformRank: {
    fontSize: FONTS.small,
    fontWeight: '700',
    marginBottom: 2,
  },
  platformRankFirst: {
    fontSize: FONTS.small,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  platformPoints: {
    fontSize: FONTS.small,
    fontWeight: '600',
  },
  platformPointsFirst: {
    fontSize: FONTS.small,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  listContainer: {
    paddingHorizontal: SIZES.lg,
    gap: SIZES.sm,
    marginBottom: SIZES.xl,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SIZES.md,
    borderRadius: RADIUS.lg,
    borderWidth: 2,
  },
  listItemCurrent: {
    borderWidth: 2,
  },
  listLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: SIZES.md,
  },
  rank: {
    fontSize: FONTS.large,
    fontWeight: '700',
    width: 24,
  },
  listAvatar: {
    width: 44,
    height: 44,
    borderRadius: RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listAvatarText: {
    fontSize: 24,
  },
  listName: {
    fontSize: FONTS.medium,
    flex: 1,
  },
  listPoints: {
    fontSize: FONTS.medium,
    fontWeight: '700',
  },
  yourRankCard: {
    marginHorizontal: SIZES.lg,
    borderRadius: RADIUS.lg,
    padding: SIZES.lg,
  },
  yourRankHeader: {
    marginBottom: SIZES.md,
  },
  yourRankTitle: {
    fontSize: FONTS.large,
    fontWeight: '700',
  },
  yourRankContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  yourRankStat: {
    alignItems: 'center',
    flex: 1,
  },
  yourRankValue: {
    fontSize: FONTS.xxlarge + 4,
    fontWeight: '800',
    marginBottom: SIZES.xxs,
  },
  yourRankLabel: {
    fontSize: FONTS.small,
    fontWeight: '600',
  },
  yourRankDivider: {
    width: 1,
    marginHorizontal: SIZES.md,
  },
});
