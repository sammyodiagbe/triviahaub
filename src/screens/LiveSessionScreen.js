import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../context/ThemeContext';
import { getColors, SIZES, FONTS, SHADOWS, RADIUS } from '../constants/theme';

export default function LiveSessionScreen() {
  const [timeUntilNext, setTimeUntilNext] = useState(null);
  const { isDark } = useTheme();
  const COLORS = getColors(isDark);

  useEffect(() => {
    // Calculate time until next session (every 25 minutes)
    const calculateTimeUntilNext = () => {
      const now = new Date();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();

      // Find next 25-minute mark (0, 25, 50)
      const nextMark = Math.ceil((minutes + 1) / 25) * 25;
      const minutesUntil = (nextMark - minutes - 1 + 25) % 25;
      const secondsUntil = 60 - seconds;

      setTimeUntilNext({
        minutes: minutesUntil,
        seconds: secondsUntil
      });
    };

    calculateTimeUntilNext();
    const interval = setInterval(calculateTimeUntilNext, 1000);

    return () => clearInterval(interval);
  }, []);

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
            {/* Header */}
            <View style={styles.header}>
              <Text style={[styles.headerTitle, { color: COLORS.text }]}>Live Batu</Text>
              <Text style={[styles.headerSubtitle, { color: COLORS.textSecondary }]}>
                Join the community battle every 25 minutes
              </Text>
            </View>

            {/* Live Badge */}
            <View style={styles.liveBadgeContainer}>
              <LinearGradient
                colors={['#ef4444', '#dc2626']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.liveBadge}
              >
                <View style={styles.liveDot} />
                <Text style={styles.liveBadgeText}>LIVE EVERY 25 MIN</Text>
              </LinearGradient>
            </View>

            {/* Countdown Card */}
            <View style={[styles.countdownCard, { backgroundColor: COLORS.card }, SHADOWS.large]}>
              <LinearGradient
                colors={[COLORS.primary, COLORS.primaryDark]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.countdownGradient}
              >
                <Text style={styles.countdownLabel}>Next Session In</Text>
                <View style={styles.timeDisplay}>
                  <View style={styles.timeUnit}>
                    <Text style={styles.timeValue}>
                      {timeUntilNext?.minutes?.toString().padStart(2, '0') || '00'}
                    </Text>
                    <Text style={styles.timeLabel}>MIN</Text>
                  </View>
                  <Text style={styles.timeSeparator}>:</Text>
                  <View style={styles.timeUnit}>
                    <Text style={styles.timeValue}>
                      {timeUntilNext?.seconds?.toString().padStart(2, '0') || '00'}
                    </Text>
                    <Text style={styles.timeLabel}>SEC</Text>
                  </View>
                </View>
                <Text style={styles.countdownSubtext}>
                  Get ready to compete with players worldwide!
                </Text>
              </LinearGradient>
            </View>

            {/* Info Cards */}
            <View style={styles.infoGrid}>
              <View style={[styles.infoCard, { backgroundColor: COLORS.card }, SHADOWS.medium]}>
                <View style={[styles.infoIconContainer, { backgroundColor: '#10b981' + '20' }]}>
                  <Text style={styles.infoIcon}>👥</Text>
                </View>
                <Text style={[styles.infoValue, { color: COLORS.text }]}>
                  1,234
                </Text>
                <Text style={[styles.infoLabel, { color: COLORS.textSecondary }]}>
                  Online Players
                </Text>
              </View>

              <View style={[styles.infoCard, { backgroundColor: COLORS.card }, SHADOWS.medium]}>
                <View style={[styles.infoIconContainer, { backgroundColor: '#f59e0b' + '20' }]}>
                  <Text style={styles.infoIcon}>🏆</Text>
                </View>
                <Text style={[styles.infoValue, { color: COLORS.text }]}>
                  50
                </Text>
                <Text style={[styles.infoLabel, { color: COLORS.textSecondary }]}>
                  Points to Win
                </Text>
              </View>
            </View>

            {/* What is Live Batu Section */}
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: COLORS.text }]}>
                What is Live Batu?
              </Text>
              <View style={[styles.descriptionCard, { backgroundColor: COLORS.card }, SHADOWS.small]}>
                <Text style={[styles.descriptionText, { color: COLORS.textSecondary }]}>
                  Live Batu is a synchronized multiplayer trivia session where players from around
                  the world compete simultaneously. Sessions start every 25 minutes and last for
                  5 minutes. Answer questions quickly and accurately to earn points and climb the
                  leaderboard!
                </Text>
              </View>
            </View>

            {/* How to Play Section */}
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: COLORS.text }]}>
                How to Play
              </Text>

              <View style={[styles.howToCard, { backgroundColor: COLORS.card }, SHADOWS.small]}>
                <View style={styles.stepRow}>
                  <LinearGradient
                    colors={[COLORS.primary, COLORS.primaryDark]}
                    style={styles.stepNumber}
                  >
                    <Text style={styles.stepNumberText}>1</Text>
                  </LinearGradient>
                  <View style={styles.stepContent}>
                    <Text style={[styles.stepTitle, { color: COLORS.text }]}>
                      Wait for Session
                    </Text>
                    <Text style={[styles.stepDescription, { color: COLORS.textSecondary }]}>
                      Sessions start every 25 minutes
                    </Text>
                  </View>
                </View>

                <View style={[styles.stepDivider, { backgroundColor: COLORS.border }]} />

                <View style={styles.stepRow}>
                  <LinearGradient
                    colors={[COLORS.secondary, COLORS.secondaryDark]}
                    style={styles.stepNumber}
                  >
                    <Text style={styles.stepNumberText}>2</Text>
                  </LinearGradient>
                  <View style={styles.stepContent}>
                    <Text style={[styles.stepTitle, { color: COLORS.text }]}>
                      Join the Room
                    </Text>
                    <Text style={[styles.stepDescription, { color: COLORS.textSecondary }]}>
                      Tap "Join Now" when session starts
                    </Text>
                  </View>
                </View>

                <View style={[styles.stepDivider, { backgroundColor: COLORS.border }]} />

                <View style={styles.stepRow}>
                  <LinearGradient
                    colors={['#10b981', '#059669']}
                    style={styles.stepNumber}
                  >
                    <Text style={styles.stepNumberText}>3</Text>
                  </LinearGradient>
                  <View style={styles.stepContent}>
                    <Text style={[styles.stepTitle, { color: COLORS.text }]}>
                      Answer Questions
                    </Text>
                    <Text style={[styles.stepDescription, { color: COLORS.textSecondary }]}>
                      Be fast and accurate to score points
                    </Text>
                  </View>
                </View>

                <View style={[styles.stepDivider, { backgroundColor: COLORS.border }]} />

                <View style={styles.stepRow}>
                  <LinearGradient
                    colors={['#f59e0b', '#d97706']}
                    style={styles.stepNumber}
                  >
                    <Text style={styles.stepNumberText}>4</Text>
                  </LinearGradient>
                  <View style={styles.stepContent}>
                    <Text style={[styles.stepTitle, { color: COLORS.text }]}>
                      Win Prizes
                    </Text>
                    <Text style={[styles.stepDescription, { color: COLORS.textSecondary }]}>
                      Top players earn rewards and badges
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Coming Soon Badge */}
            <View style={styles.comingSoonContainer}>
              <LinearGradient
                colors={[COLORS.warning, '#d97706']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.comingSoonBadge}
              >
                <Text style={styles.comingSoonIcon}>🚀</Text>
                <Text style={styles.comingSoonText}>Coming Soon</Text>
              </LinearGradient>
              <Text style={[styles.comingSoonSubtext, { color: COLORS.textLight }]}>
                This feature is currently in development
              </Text>
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
    paddingBottom: SIZES.xxl,
  },
  header: {
    paddingHorizontal: SIZES.lg,
    paddingTop: SIZES.lg,
    paddingBottom: SIZES.md,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: FONTS.xxlarge + 4,
    fontWeight: '800',
    letterSpacing: 0.5,
    marginBottom: SIZES.xs,
  },
  headerSubtitle: {
    fontSize: FONTS.medium,
    fontWeight: '500',
    textAlign: 'center',
  },
  liveBadgeContainer: {
    alignItems: 'center',
    marginVertical: SIZES.md,
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SIZES.lg,
    paddingVertical: SIZES.sm,
    borderRadius: RADIUS.full,
    gap: SIZES.xs,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
  },
  liveBadgeText: {
    fontSize: FONTS.small,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  countdownCard: {
    marginHorizontal: SIZES.lg,
    borderRadius: RADIUS.xl,
    overflow: 'hidden',
    marginBottom: SIZES.lg,
  },
  countdownGradient: {
    padding: SIZES.xl,
    alignItems: 'center',
  },
  countdownLabel: {
    fontSize: FONTS.medium,
    fontWeight: '600',
    color: '#FFFFFF',
    opacity: 0.9,
    marginBottom: SIZES.md,
  },
  timeDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.md,
  },
  timeUnit: {
    alignItems: 'center',
  },
  timeValue: {
    fontSize: 56,
    fontWeight: '900',
    color: '#FFFFFF',
    lineHeight: 56,
  },
  timeLabel: {
    fontSize: FONTS.small,
    fontWeight: '700',
    color: '#FFFFFF',
    opacity: 0.8,
    marginTop: SIZES.xs,
  },
  timeSeparator: {
    fontSize: 48,
    fontWeight: '700',
    color: '#FFFFFF',
    marginHorizontal: SIZES.md,
    marginBottom: SIZES.lg,
  },
  countdownSubtext: {
    fontSize: FONTS.small,
    fontWeight: '500',
    color: '#FFFFFF',
    opacity: 0.85,
    textAlign: 'center',
  },
  infoGrid: {
    flexDirection: 'row',
    paddingHorizontal: SIZES.lg,
    gap: SIZES.md,
    marginBottom: SIZES.xl,
  },
  infoCard: {
    flex: 1,
    borderRadius: RADIUS.lg,
    padding: SIZES.lg,
    alignItems: 'center',
  },
  infoIconContainer: {
    width: 50,
    height: 50,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SIZES.sm,
  },
  infoIcon: {
    fontSize: 24,
  },
  infoValue: {
    fontSize: FONTS.xxlarge,
    fontWeight: '800',
    marginBottom: SIZES.xxs,
  },
  infoLabel: {
    fontSize: FONTS.small,
    fontWeight: '600',
    textAlign: 'center',
  },
  section: {
    paddingHorizontal: SIZES.lg,
    marginBottom: SIZES.xl,
  },
  sectionTitle: {
    fontSize: FONTS.large,
    fontWeight: '700',
    marginBottom: SIZES.md,
  },
  descriptionCard: {
    borderRadius: RADIUS.lg,
    padding: SIZES.lg,
  },
  descriptionText: {
    fontSize: FONTS.medium,
    fontWeight: '500',
    lineHeight: 24,
  },
  howToCard: {
    borderRadius: RADIUS.lg,
    padding: SIZES.lg,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepNumber: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.sm,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SIZES.md,
  },
  stepNumberText: {
    fontSize: FONTS.large,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: FONTS.medium,
    fontWeight: '700',
    marginBottom: 2,
  },
  stepDescription: {
    fontSize: FONTS.small,
    fontWeight: '500',
  },
  stepDivider: {
    height: 1,
    marginVertical: SIZES.md,
    marginLeft: 40 + SIZES.md,
  },
  comingSoonContainer: {
    alignItems: 'center',
    marginTop: SIZES.lg,
  },
  comingSoonBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SIZES.xl,
    paddingVertical: SIZES.md,
    borderRadius: RADIUS.full,
    gap: SIZES.sm,
    ...SHADOWS.medium,
  },
  comingSoonIcon: {
    fontSize: 24,
  },
  comingSoonText: {
    fontSize: FONTS.medium,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  comingSoonSubtext: {
    fontSize: FONTS.small,
    fontWeight: '500',
    marginTop: SIZES.sm,
  },
});
