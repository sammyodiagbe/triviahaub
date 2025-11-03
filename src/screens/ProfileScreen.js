import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { getColors, SIZES, FONTS, SHADOWS, RADIUS } from '../constants/theme';

// Dummy achievements data
const ACHIEVEMENTS = [
  { id: 1, name: 'First Win', icon: '🏆', points: 50, color: '#FFD700' },
  { id: 2, name: 'Speed Demon', icon: '⚡', points: 100, color: '#6C63FF' },
  { id: 3, name: 'Perfect Score', icon: '💯', points: 100, color: '#10b981' },
  { id: 4, name: 'Champion', icon: '👑', points: 200, color: '#f59e0b' },
  { id: 5, name: 'Quiz Master', icon: '🎓', points: 150, color: '#ec4899' },
  { id: 6, name: 'Streak King', icon: '🔥', points: 100, color: '#ef4444' },
];

export default function ProfileScreen() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
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
    } finally {
      setLoading(false);
    }
  };

  const winRate = profile?.total_games > 0
    ? Math.round((profile.total_wins / profile.total_games) * 100)
    : 0;

  // Calculate level based on points (100 points per level)
  const level = Math.floor((profile?.total_points || 0) / 100) + 1;
  const currentLevelPoints = (profile?.total_points || 0) % 100;
  const nextLevelPoints = 100;
  const levelProgress = (currentLevelPoints / nextLevelPoints) * 100;

  return (
    <View style={[styles.container, { backgroundColor: COLORS.background }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      <LinearGradient
        colors={[COLORS.background, COLORS.backgroundSecondary]}
        style={styles.gradient}
      >
        <SafeAreaView style={styles.safeArea}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {/* Greeting Header */}
            <View style={styles.greetingSection}>
              <Text style={[styles.greeting, { color: COLORS.textSecondary }]}>
                Hello,
              </Text>
              <Text style={[styles.name, { color: COLORS.text }]}>
                {profile?.username || 'User'}
              </Text>
            </View>

            {/* Level Card */}
            <View style={[styles.levelCard, { backgroundColor: COLORS.card }, SHADOWS.medium]}>
              <View style={styles.levelLeft}>
                <Text style={[styles.levelTitle, { color: COLORS.text }]}>
                  My level
                </Text>
                <Text style={[styles.levelXP, { color: COLORS.textSecondary }]}>
                  {currentLevelPoints}/{nextLevelPoints} XP
                </Text>
              </View>
              <View style={styles.levelRight}>
                <View style={styles.levelCircleContainer}>
                  {/* Progress Circle */}
                  <View style={[styles.levelCircleBackground, { borderColor: COLORS.border }]} />
                  <LinearGradient
                    colors={[COLORS.warning, '#d97706']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={[
                      styles.levelCircleProgress,
                      {
                        transform: [{ rotate: `${-90 + (levelProgress * 3.6)}deg` }],
                      },
                    ]}
                  >
                    <View style={[styles.levelCircleProgressMask, { backgroundColor: COLORS.card }]} />
                  </LinearGradient>
                  <View style={styles.levelNumber}>
                    <Text style={[styles.levelText, { color: COLORS.text }]}>
                      {level}
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Stats Row */}
            <View style={styles.statsRow}>
              <View style={styles.statBox}>
                <Text style={[styles.statValue, { color: COLORS.text }]}>
                  {profile?.total_wins || 0}
                </Text>
                <Text style={[styles.statLabel, { color: COLORS.textSecondary }]}>
                  Wins
                </Text>
              </View>

              <View style={[styles.statDivider, { backgroundColor: COLORS.border }]} />

              <View style={styles.statBox}>
                <Text style={[styles.statValue, { color: COLORS.text }]}>
                  {profile?.total_games || 0}
                </Text>
                <Text style={[styles.statLabel, { color: COLORS.textSecondary }]}>
                  Total games
                </Text>
              </View>

              <View style={[styles.statDivider, { backgroundColor: COLORS.border }]} />

              <View style={styles.statBox}>
                <Text style={[styles.statValue, { color: COLORS.text }]}>
                  {winRate}%
                </Text>
                <Text style={[styles.statLabel, { color: COLORS.textSecondary }]}>
                  Win Rate
                </Text>
              </View>
            </View>

            {/* Achievements Section */}
            <View style={styles.achievementsSection}>
              <View style={styles.achievementsHeader}>
                <Text style={[styles.sectionTitle, { color: COLORS.text }]}>
                  Achievements
                </Text>
                <TouchableOpacity>
                  <Text style={[styles.seeAllText, { color: COLORS.primary }]}>
                    See all
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.achievementsGrid}>
                {ACHIEVEMENTS.map((achievement, index) => (
                  <View
                    key={achievement.id}
                    style={[
                      styles.achievementCard,
                      { backgroundColor: COLORS.card },
                      SHADOWS.small,
                    ]}
                  >
                    <View
                      style={[
                        styles.achievementIconContainer,
                        { backgroundColor: achievement.color + '20' },
                      ]}
                    >
                      <Text style={styles.achievementIcon}>{achievement.icon}</Text>
                    </View>
                    <Text
                      style={[styles.achievementName, { color: COLORS.text }]}
                      numberOfLines={1}
                    >
                      {achievement.name}
                    </Text>
                    <Text style={[styles.achievementPoints, { color: COLORS.primary }]}>
                      +{achievement.points}
                    </Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Account Info Section */}
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: COLORS.text }]}>
                Account Information
              </Text>

              <View style={[styles.infoCard, { backgroundColor: COLORS.card }, SHADOWS.small]}>
                <View style={styles.infoRow}>
                  <View style={styles.infoLeft}>
                    <View style={[styles.infoIconContainer, { backgroundColor: COLORS.primary + '15' }]}>
                      <Ionicons name="mail-outline" size={20} color={COLORS.primary} />
                    </View>
                    <View style={styles.infoTextContainer}>
                      <Text style={[styles.infoLabel, { color: COLORS.textSecondary }]}>
                        Email
                      </Text>
                      <Text style={[styles.infoValue, { color: COLORS.text }]}>
                        {user?.email}
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={[styles.divider, { backgroundColor: COLORS.border }]} />

                <View style={styles.infoRow}>
                  <View style={styles.infoLeft}>
                    <View style={[styles.infoIconContainer, { backgroundColor: COLORS.secondary + '15' }]}>
                      <Ionicons name="calendar-outline" size={20} color={COLORS.secondary} />
                    </View>
                    <View style={styles.infoTextContainer}>
                      <Text style={[styles.infoLabel, { color: COLORS.textSecondary }]}>
                        Member Since
                      </Text>
                      <Text style={[styles.infoValue, { color: COLORS.text }]}>
                        {profile?.created_at
                          ? new Date(profile.created_at).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })
                          : 'N/A'
                        }
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={[styles.divider, { backgroundColor: COLORS.border }]} />

                <View style={styles.infoRow}>
                  <View style={styles.infoLeft}>
                    <View style={[styles.infoIconContainer, { backgroundColor: COLORS.success + '15' }]}>
                      <Ionicons
                        name={user?.email_confirmed_at ? 'checkmark-circle' : 'alert-circle-outline'}
                        size={20}
                        color={user?.email_confirmed_at ? COLORS.success : COLORS.warning}
                      />
                    </View>
                    <View style={styles.infoTextContainer}>
                      <Text style={[styles.infoLabel, { color: COLORS.textSecondary }]}>
                        Verification Status
                      </Text>
                      <Text
                        style={[
                          styles.infoValue,
                          { color: user?.email_confirmed_at ? COLORS.success : COLORS.warning }
                        ]}
                      >
                        {user?.email_confirmed_at ? 'Verified' : 'Not Verified'}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            {/* Quick Actions */}
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: COLORS.text }]}>
                Quick Actions
              </Text>

              <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: COLORS.card }, SHADOWS.small]}
              >
                <View style={[styles.actionIconContainer, { backgroundColor: COLORS.primary + '15' }]}>
                  <Ionicons name="pencil-outline" size={22} color={COLORS.primary} />
                </View>
                <Text style={[styles.actionText, { color: COLORS.text }]}>
                  Edit Profile
                </Text>
                <Ionicons name="chevron-forward" size={20} color={COLORS.textLight} />
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: COLORS.card }, SHADOWS.small]}
              >
                <View style={[styles.actionIconContainer, { backgroundColor: COLORS.secondary + '15' }]}>
                  <Ionicons name="time-outline" size={22} color={COLORS.secondary} />
                </View>
                <Text style={[styles.actionText, { color: COLORS.text }]}>
                  Game History
                </Text>
                <Ionicons name="chevron-forward" size={20} color={COLORS.textLight} />
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: COLORS.card }, SHADOWS.small]}
              >
                <View style={[styles.actionIconContainer, { backgroundColor: COLORS.warning + '15' }]}>
                  <Ionicons name="trophy-outline" size={22} color={COLORS.warning} />
                </View>
                <Text style={[styles.actionText, { color: COLORS.text }]}>
                  View All Achievements
                </Text>
                <Ionicons name="chevron-forward" size={20} color={COLORS.textLight} />
              </TouchableOpacity>
            </View>
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
  scrollContent: {
    paddingBottom: SIZES.xxl + 60,
  },
  greetingSection: {
    paddingHorizontal: SIZES.lg,
    paddingTop: SIZES.xl,
    marginBottom: SIZES.lg,
  },
  greeting: {
    fontSize: FONTS.large,
    fontWeight: '400',
    marginBottom: SIZES.xxs,
  },
  name: {
    fontSize: FONTS.xxlarge + 8,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  levelCard: {
    marginHorizontal: SIZES.lg,
    borderRadius: RADIUS.xl,
    padding: SIZES.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.lg,
  },
  levelLeft: {
    flex: 1,
  },
  levelTitle: {
    fontSize: FONTS.large,
    fontWeight: '600',
    marginBottom: SIZES.xxs,
  },
  levelXP: {
    fontSize: FONTS.medium,
    fontWeight: '500',
  },
  levelRight: {
    marginLeft: SIZES.md,
  },
  levelCircleContainer: {
    width: 70,
    height: 70,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  levelCircleBackground: {
    position: 'absolute',
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 6,
  },
  levelCircleSvg: {
    position: 'absolute',
  },
  levelNumber: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  levelText: {
    fontSize: FONTS.xlarge,
    fontWeight: '800',
  },
  statsRow: {
    marginHorizontal: SIZES.lg,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: SIZES.xl,
  },
  statBox: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: FONTS.xxlarge + 4,
    fontWeight: '800',
    marginBottom: SIZES.xxs,
  },
  statLabel: {
    fontSize: FONTS.small,
    fontWeight: '500',
  },
  statDivider: {
    width: 1,
    height: 40,
  },
  achievementsSection: {
    paddingHorizontal: SIZES.lg,
    marginBottom: SIZES.xl,
  },
  achievementsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.md,
  },
  sectionTitle: {
    fontSize: FONTS.large,
    fontWeight: '700',
  },
  seeAllText: {
    fontSize: FONTS.medium,
    fontWeight: '600',
  },
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SIZES.sm,
  },
  achievementCard: {
    width: '31%',
    borderRadius: RADIUS.lg,
    padding: SIZES.md,
    alignItems: 'center',
  },
  achievementIconContainer: {
    width: 50,
    height: 50,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SIZES.sm,
  },
  achievementIcon: {
    fontSize: 28,
  },
  achievementName: {
    fontSize: FONTS.small,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: SIZES.xxs,
  },
  achievementPoints: {
    fontSize: FONTS.small,
    fontWeight: '700',
  },
  section: {
    paddingHorizontal: SIZES.lg,
    marginBottom: SIZES.xl,
  },
  infoCard: {
    borderRadius: RADIUS.lg,
    padding: SIZES.md,
  },
  infoRow: {
    paddingVertical: SIZES.sm,
  },
  infoLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZES.md,
  },
  infoIconContainer: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoTextContainer: {
    flex: 1,
  },
  infoLabel: {
    fontSize: FONTS.small,
    fontWeight: '500',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: FONTS.medium,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    marginVertical: SIZES.xs,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: RADIUS.lg,
    padding: SIZES.md,
    marginBottom: SIZES.sm,
  },
  actionIconContainer: {
    width: 44,
    height: 44,
    borderRadius: RADIUS.sm,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SIZES.md,
  },
  actionText: {
    flex: 1,
    fontSize: FONTS.medium,
    fontWeight: '600',
  },
});
