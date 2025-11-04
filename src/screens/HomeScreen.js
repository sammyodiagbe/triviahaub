import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, KeyboardAvoidingView, Platform, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Button from '../components/Button';
import { useTheme } from '../context/ThemeContext';
import { getColors, SIZES, FONTS, SHADOWS, RADIUS } from '../constants/theme';

export default function HomeScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const { isDark, toggleTheme } = useTheme();
  const COLORS = getColors(isDark);

  const handleQuickBattle = () => {
    if (username.trim()) {
      navigation.navigate('Categories', { mode: 'quick', username });
    }
  };

  const handleCreateRoom = () => {
    if (username.trim()) {
      navigation.navigate('Categories', { mode: 'create', username });
    }
  };

  const handleJoinRoom = () => {
    if (username.trim()) {
      navigation.navigate('JoinRoom', { username });
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: COLORS.background }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      <LinearGradient
        colors={isDark ? [COLORS.background, COLORS.backgroundSecondary] : [COLORS.background, COLORS.backgroundSecondary]}
        style={styles.gradient}
      >
        <SafeAreaView style={styles.safeArea}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.content}
          >
            {/* Theme Toggle */}
            <View style={styles.topBar}>
              <TouchableOpacity
                onPress={toggleTheme}
                style={[styles.themeToggle, { backgroundColor: COLORS.card }, SHADOWS.small]}
              >
                <Text style={[styles.themeIcon, { color: COLORS.text }]}>{isDark ? '☀' : '☾'}</Text>
              </TouchableOpacity>
            </View>

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
              <Text style={[styles.title, { color: COLORS.text }]}>Trivia Batu</Text>
              <Text style={[styles.subtitle, { color: COLORS.textSecondary }]}>
                Battle your friends in real-time
              </Text>
            </View>

            {/* Form */}
            <View style={styles.form}>
              <View style={[styles.inputContainer, { backgroundColor: COLORS.card }, SHADOWS.small]}>
                <View style={[styles.inputIconContainer, { backgroundColor: COLORS.primary + '15' }]}>
                  <Text style={[styles.inputIconText, { color: COLORS.primary }]}>U</Text>
                </View>
                <TextInput
                  style={[styles.input, { color: COLORS.text }]}
                  placeholder="Enter your username"
                  placeholderTextColor={COLORS.textLight}
                  value={username}
                  onChangeText={setUsername}
                  maxLength={20}
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.buttonContainer}>
                <Button
                  title="Quick Battle"
                  onPress={handleQuickBattle}
                  disabled={!username.trim()}
                  style={styles.button}
                />
                <Button
                  title="Create Room"
                  onPress={handleCreateRoom}
                  variant="secondary"
                  disabled={!username.trim()}
                  style={styles.button}
                />
                <Button
                  title="Join Room"
                  onPress={handleJoinRoom}
                  variant="outline"
                  disabled={!username.trim()}
                  style={styles.button}
                />
              </View>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
              <Text style={[styles.footerText, { color: COLORS.textLight }]}>
                Choose your battle mode and start playing
              </Text>
            </View>
          </KeyboardAvoidingView>
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
  content: {
    flex: 1,
    paddingHorizontal: SIZES.lg,
  },
  topBar: {
    alignItems: 'flex-end',
    paddingTop: SIZES.sm,
    paddingBottom: SIZES.md,
  },
  themeToggle: {
    width: 48,
    height: 48,
    borderRadius: RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  themeIcon: {
    fontSize: 24,
  },
  header: {
    alignItems: 'center',
    marginTop: SIZES.lg,
    marginBottom: SIZES.xxl,
  },
  logoContainer: {
    width: 100,
    height: 100,
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
    fontSize: FONTS.xxlarge + 8,
    fontWeight: '800',
    marginBottom: SIZES.xs,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: FONTS.medium,
    fontWeight: '400',
  },
  form: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: RADIUS.lg,
    paddingHorizontal: SIZES.md,
    marginBottom: SIZES.xl,
    height: 56,
    gap: SIZES.sm,
  },
  inputIconContainer: {
    width: 32,
    height: 32,
    borderRadius: RADIUS.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputIconText: {
    fontSize: 16,
    fontWeight: '700',
  },
  input: {
    flex: 1,
    fontSize: FONTS.medium,
    fontWeight: '500',
  },
  buttonContainer: {
    gap: SIZES.md,
  },
  button: {
    marginVertical: SIZES.xs,
  },
  footer: {
    alignItems: 'center',
    paddingBottom: SIZES.xl,
    paddingTop: SIZES.lg,
  },
  footerText: {
    fontSize: FONTS.regular,
    textAlign: 'center',
    fontWeight: '500',
  },
});
