import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import CustomAlert from '../components/CustomAlert';
import { useAlert } from '../hooks/useAlert';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { getColors, SIZES, FONTS, SHADOWS, RADIUS } from '../constants/theme';

export default function SettingsScreen({ navigation }) {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);
  const { isDark, toggleTheme } = useTheme();
  const { signOut, user } = useAuth();
  const { alertState, showAlert, hideAlert } = useAlert();
  const COLORS = getColors(isDark);

  const handleSignOut = () => {
    showAlert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            const { error } = await signOut();
            if (error) {
              showAlert(
                'Error',
                error,
                [{ text: 'OK' }],
                'error'
              );
            }
          },
        },
      ],
      'warning'
    );
  };

  const handleDeleteAccount = () => {
    showAlert(
      'Delete Account',
      'This action cannot be undone. All your data will be permanently deleted.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            // TODO: Implement account deletion
            showAlert(
              'Feature Coming Soon',
              'Account deletion will be available soon.',
              [{ text: 'OK' }],
              'info'
            );
          },
        },
      ],
      'error'
    );
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
              <Text style={[styles.headerTitle, { color: COLORS.text }]}>Settings</Text>
            </View>

            {/* Appearance Section */}
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: COLORS.textSecondary }]}>
                APPEARANCE
              </Text>

              <View style={[styles.settingsCard, { backgroundColor: COLORS.card }, SHADOWS.small]}>
                <View style={styles.settingRow}>
                  <View style={styles.settingLeft}>
                    <View style={[styles.settingIconContainer, { backgroundColor: COLORS.primary + '15' }]}>
                      <Text style={styles.settingIcon}>{isDark ? '🌙' : '☀️'}</Text>
                    </View>
                    <View style={styles.settingTextContainer}>
                      <Text style={[styles.settingTitle, { color: COLORS.text }]}>
                        Dark Mode
                      </Text>
                      <Text style={[styles.settingSubtitle, { color: COLORS.textSecondary }]}>
                        {isDark ? 'Currently enabled' : 'Currently disabled'}
                      </Text>
                    </View>
                  </View>
                  <Switch
                    value={isDark}
                    onValueChange={toggleTheme}
                    trackColor={{ false: COLORS.border, true: COLORS.primary }}
                    thumbColor="#FFFFFF"
                  />
                </View>
              </View>
            </View>

            {/* Sound & Notifications */}
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: COLORS.textSecondary }]}>
                SOUND & NOTIFICATIONS
              </Text>

              <View style={[styles.settingsCard, { backgroundColor: COLORS.card }, SHADOWS.small]}>
                <View style={styles.settingRow}>
                  <View style={styles.settingLeft}>
                    <View style={[styles.settingIconContainer, { backgroundColor: COLORS.secondary + '15' }]}>
                      <Text style={styles.settingIcon}>🔊</Text>
                    </View>
                    <View style={styles.settingTextContainer}>
                      <Text style={[styles.settingTitle, { color: COLORS.text }]}>
                        Sound Effects
                      </Text>
                      <Text style={[styles.settingSubtitle, { color: COLORS.textSecondary }]}>
                        Game sound effects
                      </Text>
                    </View>
                  </View>
                  <Switch
                    value={soundEnabled}
                    onValueChange={setSoundEnabled}
                    trackColor={{ false: COLORS.border, true: COLORS.secondary }}
                    thumbColor="#FFFFFF"
                  />
                </View>

                <View style={[styles.divider, { backgroundColor: COLORS.border }]} />

                <View style={styles.settingRow}>
                  <View style={styles.settingLeft}>
                    <View style={[styles.settingIconContainer, { backgroundColor: COLORS.warning + '15' }]}>
                      <Text style={styles.settingIcon}>🔔</Text>
                    </View>
                    <View style={styles.settingTextContainer}>
                      <Text style={[styles.settingTitle, { color: COLORS.text }]}>
                        Notifications
                      </Text>
                      <Text style={[styles.settingSubtitle, { color: COLORS.textSecondary }]}>
                        Push notifications
                      </Text>
                    </View>
                  </View>
                  <Switch
                    value={notificationsEnabled}
                    onValueChange={setNotificationsEnabled}
                    trackColor={{ false: COLORS.border, true: COLORS.warning }}
                    thumbColor="#FFFFFF"
                  />
                </View>

                <View style={[styles.divider, { backgroundColor: COLORS.border }]} />

                <View style={styles.settingRow}>
                  <View style={styles.settingLeft}>
                    <View style={[styles.settingIconContainer, { backgroundColor: COLORS.success + '15' }]}>
                      <Text style={styles.settingIcon}>📳</Text>
                    </View>
                    <View style={styles.settingTextContainer}>
                      <Text style={[styles.settingTitle, { color: COLORS.text }]}>
                        Vibration
                      </Text>
                      <Text style={[styles.settingSubtitle, { color: COLORS.textSecondary }]}>
                        Haptic feedback
                      </Text>
                    </View>
                  </View>
                  <Switch
                    value={vibrationEnabled}
                    onValueChange={setVibrationEnabled}
                    trackColor={{ false: COLORS.border, true: COLORS.success }}
                    thumbColor="#FFFFFF"
                  />
                </View>
              </View>
            </View>

            {/* Account Section */}
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: COLORS.textSecondary }]}>
                ACCOUNT
              </Text>

              <View style={[styles.settingsCard, { backgroundColor: COLORS.card }, SHADOWS.small]}>
                <TouchableOpacity
                  style={styles.settingRow}
                  onPress={() => {
                    showAlert(
                      'Change Password',
                      'You will receive a password reset link via email.',
                      [{ text: 'OK' }],
                      'info'
                    );
                  }}
                >
                  <View style={styles.settingLeft}>
                    <View style={[styles.settingIconContainer, { backgroundColor: COLORS.primary + '15' }]}>
                      <Text style={styles.settingIcon}>🔒</Text>
                    </View>
                    <View style={styles.settingTextContainer}>
                      <Text style={[styles.settingTitle, { color: COLORS.text }]}>
                        Change Password
                      </Text>
                      <Text style={[styles.settingSubtitle, { color: COLORS.textSecondary }]}>
                        Update your password
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.settingArrow}>›</Text>
                </TouchableOpacity>

                <View style={[styles.divider, { backgroundColor: COLORS.border }]} />

                <TouchableOpacity
                  style={styles.settingRow}
                  onPress={() => {
                    showAlert(
                      'Email Verification',
                      user?.email_confirmed_at
                        ? 'Your email is already verified!'
                        : 'A verification link will be sent to your email.',
                      [{ text: 'OK' }],
                      user?.email_confirmed_at ? 'success' : 'info'
                    );
                  }}
                >
                  <View style={styles.settingLeft}>
                    <View style={[styles.settingIconContainer, { backgroundColor: COLORS.secondary + '15' }]}>
                      <Text style={styles.settingIcon}>✉️</Text>
                    </View>
                    <View style={styles.settingTextContainer}>
                      <Text style={[styles.settingTitle, { color: COLORS.text }]}>
                        Email Verification
                      </Text>
                      <Text style={[styles.settingSubtitle, { color: user?.email_confirmed_at ? COLORS.success : COLORS.warning }]}>
                        {user?.email_confirmed_at ? 'Verified' : 'Not verified'}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.settingArrow}>›</Text>
                </TouchableOpacity>

                <View style={[styles.divider, { backgroundColor: COLORS.border }]} />

                <TouchableOpacity
                  style={styles.settingRow}
                  onPress={handleDeleteAccount}
                >
                  <View style={styles.settingLeft}>
                    <View style={[styles.settingIconContainer, { backgroundColor: COLORS.error + '15' }]}>
                      <Text style={styles.settingIcon}>🗑️</Text>
                    </View>
                    <View style={styles.settingTextContainer}>
                      <Text style={[styles.settingTitle, { color: COLORS.error }]}>
                        Delete Account
                      </Text>
                      <Text style={[styles.settingSubtitle, { color: COLORS.textSecondary }]}>
                        Permanently delete account
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.settingArrow}>›</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* About Section */}
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: COLORS.textSecondary }]}>
                ABOUT
              </Text>

              <View style={[styles.settingsCard, { backgroundColor: COLORS.card }, SHADOWS.small]}>
                <View style={styles.settingRow}>
                  <View style={styles.settingLeft}>
                    <View style={[styles.settingIconContainer, { backgroundColor: COLORS.primary + '15' }]}>
                      <Text style={styles.settingIcon}>ℹ️</Text>
                    </View>
                    <View style={styles.settingTextContainer}>
                      <Text style={[styles.settingTitle, { color: COLORS.text }]}>
                        Version
                      </Text>
                      <Text style={[styles.settingSubtitle, { color: COLORS.textSecondary }]}>
                        1.0.0
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={[styles.divider, { backgroundColor: COLORS.border }]} />

                <TouchableOpacity
                  style={styles.settingRow}
                  onPress={() => {
                    showAlert(
                      'Privacy Policy',
                      'Privacy policy will be available soon.',
                      [{ text: 'OK' }],
                      'info'
                    );
                  }}
                >
                  <View style={styles.settingLeft}>
                    <View style={[styles.settingIconContainer, { backgroundColor: COLORS.secondary + '15' }]}>
                      <Text style={styles.settingIcon}>📄</Text>
                    </View>
                    <Text style={[styles.settingTitle, { color: COLORS.text }]}>
                      Privacy Policy
                    </Text>
                  </View>
                  <Text style={styles.settingArrow}>›</Text>
                </TouchableOpacity>

                <View style={[styles.divider, { backgroundColor: COLORS.border }]} />

                <TouchableOpacity
                  style={styles.settingRow}
                  onPress={() => {
                    showAlert(
                      'Terms of Service',
                      'Terms of service will be available soon.',
                      [{ text: 'OK' }],
                      'info'
                    );
                  }}
                >
                  <View style={styles.settingLeft}>
                    <View style={[styles.settingIconContainer, { backgroundColor: COLORS.warning + '15' }]}>
                      <Text style={styles.settingIcon}>📋</Text>
                    </View>
                    <Text style={[styles.settingTitle, { color: COLORS.text }]}>
                      Terms of Service
                    </Text>
                  </View>
                  <Text style={styles.settingArrow}>›</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Sign Out Button */}
            <View style={styles.section}>
              <TouchableOpacity
                style={[styles.signOutButton, { backgroundColor: COLORS.error }, SHADOWS.medium]}
                onPress={handleSignOut}
              >
                <LinearGradient
                  colors={[COLORS.error, '#b91c1c']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.signOutGradient}
                >
                  <Text style={styles.signOutIcon}>⎋</Text>
                  <Text style={styles.signOutText}>Sign Out</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>

      {/* Custom Alert */}
      <CustomAlert
        visible={alertState.visible}
        type={alertState.type}
        title={alertState.title}
        message={alertState.message}
        buttons={alertState.buttons}
        onDismiss={hideAlert}
      />
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
  },
  headerTitle: {
    fontSize: FONTS.xxlarge,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  section: {
    paddingHorizontal: SIZES.lg,
    marginBottom: SIZES.lg,
  },
  sectionTitle: {
    fontSize: FONTS.small,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: SIZES.sm,
  },
  settingsCard: {
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SIZES.md,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIconContainer: {
    width: 44,
    height: 44,
    borderRadius: RADIUS.sm,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SIZES.md,
  },
  settingIcon: {
    fontSize: 22,
  },
  settingTextContainer: {
    flex: 1,
  },
  settingTitle: {
    fontSize: FONTS.medium,
    fontWeight: '600',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: FONTS.small,
    fontWeight: '500',
  },
  settingArrow: {
    fontSize: 24,
    color: '#999',
    fontWeight: '300',
  },
  divider: {
    height: 1,
    marginLeft: SIZES.md + 44 + SIZES.md,
  },
  signOutButton: {
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
  },
  signOutGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SIZES.lg,
    gap: SIZES.sm,
  },
  signOutIcon: {
    fontSize: 20,
    color: '#FFFFFF',
  },
  signOutText: {
    fontSize: FONTS.medium,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
