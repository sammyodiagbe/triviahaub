import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { getColors, SIZES, FONTS, SHADOWS, RADIUS } from '../constants/theme';

export default function HomeScreen({ navigation }) {
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
      const { data, error} = await supabase
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

  const handleQuickBattle = () => {
    navigation.navigate('Categories', { mode: 'quick', username: profile?.username });
  };

  const handleCreateRoom = () => {
    navigation.navigate('Categories', { mode: 'create', username: profile?.username });
  };

  const handleJoinRoom = () => {
    navigation.navigate('JoinRoom', { username: profile?.username });
  };

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
              <LinearGradient
                colors={[COLORS.primary, COLORS.primaryDark]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.logoContainer}
              >
                <Text style={styles.logoText}>TB</Text>
              </LinearGradient>
              <Text style={[styles.title, { color: COLORS.text }]}>
                {profile ? `Welcome back, ${profile.username}!` : 'Trivia Batu'}
              </Text>
              <Text style={[styles.subtitle, { color: COLORS.textSecondary }]}>
                Choose your battle mode
              </Text>
            </View>

            {/* Game Modes */}
            <View style={styles.modesContainer}>
              {/* Quick Battle */}
              <TouchableOpacity
                style={[styles.modeCard, SHADOWS.large]}
                onPress={handleQuickBattle}
              >
                <LinearGradient
                  colors={[COLORS.primary, COLORS.primaryDark]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.modeGradient}
                >
                  <View style={styles.modeIconContainer}>
                    <Text style={styles.modeIcon}>⚡</Text>
                  </View>
                  <Text style={styles.modeTitle}>Quick Battle</Text>
                  <Text style={styles.modeDescription}>
                    Jump into a fast-paced trivia match
                  </Text>
                </LinearGradient>
              </TouchableOpacity>

              {/* Create Room */}
              <TouchableOpacity
                style={[styles.modeCard, SHADOWS.large]}
                onPress={handleCreateRoom}
              >
                <LinearGradient
                  colors={[COLORS.secondary, COLORS.secondaryDark]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.modeGradient}
                >
                  <View style={styles.modeIconContainer}>
                    <Text style={styles.modeIcon}>➕</Text>
                  </View>
                  <Text style={styles.modeTitle}>Create Room</Text>
                  <Text style={styles.modeDescription}>
                    Start your own private game
                  </Text>
                </LinearGradient>
              </TouchableOpacity>

              {/* Join Room */}
              <TouchableOpacity
                style={[styles.modeCard, SHADOWS.large]}
                onPress={handleJoinRoom}
              >
                <LinearGradient
                  colors={['#10b981', '#059669']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.modeGradient}
                >
                  <View style={styles.modeIconContainer}>
                    <Text style={styles.modeIcon}>🚪</Text>
                  </View>
                  <Text style={styles.modeTitle}>Join Room</Text>
                  <Text style={styles.modeDescription}>
                    Enter a room with a code
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>

            {/* Your Stats */}
            {profile && (
              <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: COLORS.text }]}>
                  Your Stats
                </Text>
                <View style={[styles.statsCard, { backgroundColor: COLORS.card }, SHADOWS.medium]}>
                  <View style={styles.statItem}>
                    <Text style={[styles.statValue, { color: COLORS.primary }]}>
                      {profile.total_games || 0}
                    </Text>
                    <Text style={[styles.statLabel, { color: COLORS.textSecondary }]}>
                      Games Played
                    </Text>
                  </View>
                  <View style={[styles.statDivider, { backgroundColor: COLORS.border }]} />
                  <View style={styles.statItem}>
                    <Text style={[styles.statValue, { color: COLORS.success }]}>
                      {profile.total_wins || 0}
                    </Text>
                    <Text style={[styles.statLabel, { color: COLORS.textSecondary }]}>
                      Wins
                    </Text>
                  </View>
                  <View style={[styles.statDivider, { backgroundColor: COLORS.border }]} />
                  <View style={styles.statItem}>
                    <Text style={[styles.statValue, { color: COLORS.secondary }]}>
                      {profile.total_points || 0}
                    </Text>
                    <Text style={[styles.statLabel, { color: COLORS.textSecondary }]}>
                      Points
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
  scrollContent: {
    paddingBottom: SIZES.xxl + 60, // Extra padding for bottom tabs
  },
  header: {
    alignItems: 'center',
    paddingTop: SIZES.xl,
    paddingHorizontal: SIZES.lg,
    marginBottom: SIZES.xxl,
  },
  logoContainer: {
    width: 90,
    height: 90,
    borderRadius: RADIUS.xxl,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SIZES.lg,
    ...SHADOWS.large,
  },
  logoText: {
    fontSize: 40,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  title: {
    fontSize: FONTS.xxlarge,
    fontWeight: '800',
    marginBottom: SIZES.xs,
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: FONTS.medium,
    fontWeight: '500',
    textAlign: 'center',
  },
  modesContainer: {
    paddingHorizontal: SIZES.lg,
    marginBottom: SIZES.xl,
    gap: SIZES.md,
  },
  modeCard: {
    borderRadius: RADIUS.xl,
    overflow: 'hidden',
    marginBottom: SIZES.sm,
  },
  modeGradient: {
    padding: SIZES.xl,
    alignItems: 'center',
  },
  modeIconContainer: {
    width: 70,
    height: 70,
    borderRadius: RADIUS.full,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SIZES.md,
  },
  modeIcon: {
    fontSize: 36,
  },
  modeTitle: {
    fontSize: FONTS.xlarge,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: SIZES.xs,
  },
  modeDescription: {
    fontSize: FONTS.small,
    fontWeight: '500',
    color: '#FFFFFF',
    opacity: 0.9,
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
  statsCard: {
    flexDirection: 'row',
    borderRadius: RADIUS.lg,
    padding: SIZES.lg,
    justifyContent: 'space-around',
  },
  statItem: {
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
    fontWeight: '600',
    textAlign: 'center',
  },
  statDivider: {
    width: 1,
    marginHorizontal: SIZES.sm,
  },
});
