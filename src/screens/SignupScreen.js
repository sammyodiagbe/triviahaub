import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, KeyboardAvoidingView, Platform, TouchableOpacity, StatusBar, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Button from '../components/Button';
import { useTheme } from '../context/ThemeContext';
import { getColors, SIZES, FONTS, SHADOWS, RADIUS } from '../constants/theme';

export default function SignupScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const COLORS = getColors(isDark);

  const handleSignup = () => {
    // TODO: Add signup functionality
    // For now, just navigate to Home
    navigation.navigate('Home');
  };

  const handleLoginPress = () => {
    navigation.navigate('Login');
  };

  const isFormValid = () => {
    return (
      username.trim().length > 0 &&
      email.trim().length > 0 &&
      password.trim().length >= 6 &&
      password === confirmPassword
    );
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
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollContent}
            >
              {/* Theme Toggle */}
              <View style={styles.topBar}>
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={[styles.backButton, { backgroundColor: COLORS.card }, SHADOWS.small]}
                >
                  <Text style={[styles.backIcon, { color: COLORS.text }]}>←</Text>
                </TouchableOpacity>
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
                  colors={[COLORS.secondary, COLORS.secondaryDark]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.logoContainer}
                >
                  <Text style={styles.logoText}>TB</Text>
                </LinearGradient>
                <Text style={[styles.title, { color: COLORS.text }]}>Create Account</Text>
                <Text style={[styles.subtitle, { color: COLORS.textSecondary }]}>
                  Join the trivia battle today
                </Text>
              </View>

              {/* Form */}
              <View style={styles.form}>
                {/* Username Input */}
                <View style={[styles.inputContainer, { backgroundColor: COLORS.card }, SHADOWS.small]}>
                  <View style={[styles.inputIconContainer, { backgroundColor: COLORS.secondary + '15' }]}>
                    <Text style={[styles.inputIconText, { color: COLORS.secondary }]}>U</Text>
                  </View>
                  <TextInput
                    style={[styles.input, { color: COLORS.text }]}
                    placeholder="Username"
                    placeholderTextColor={COLORS.textLight}
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="none"
                    maxLength={20}
                  />
                </View>

                {/* Email Input */}
                <View style={[styles.inputContainer, { backgroundColor: COLORS.card }, SHADOWS.small]}>
                  <View style={[styles.inputIconContainer, { backgroundColor: COLORS.secondary + '15' }]}>
                    <Text style={[styles.inputIconText, { color: COLORS.secondary }]}>@</Text>
                  </View>
                  <TextInput
                    style={[styles.input, { color: COLORS.text }]}
                    placeholder="Email address"
                    placeholderTextColor={COLORS.textLight}
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    autoComplete="email"
                  />
                </View>

                {/* Password Input */}
                <View style={[styles.inputContainer, { backgroundColor: COLORS.card }, SHADOWS.small]}>
                  <View style={[styles.inputIconContainer, { backgroundColor: COLORS.secondary + '15' }]}>
                    <Text style={[styles.inputIconText, { color: COLORS.secondary }]}>•••</Text>
                  </View>
                  <TextInput
                    style={[styles.input, { color: COLORS.text }]}
                    placeholder="Password (min 6 characters)"
                    placeholderTextColor={COLORS.textLight}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    autoComplete="password-new"
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    style={styles.eyeIcon}
                  >
                    <Text style={[styles.eyeIconText, { color: COLORS.textSecondary }]}>
                      {showPassword ? 'Hide' : 'Show'}
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* Confirm Password Input */}
                <View style={[styles.inputContainer, { backgroundColor: COLORS.card }, SHADOWS.small]}>
                  <View style={[styles.inputIconContainer, { backgroundColor: COLORS.secondary + '15' }]}>
                    <Text style={[styles.inputIconText, { color: COLORS.secondary }]}>•••</Text>
                  </View>
                  <TextInput
                    style={[styles.input, { color: COLORS.text }]}
                    placeholder="Confirm password"
                    placeholderTextColor={COLORS.textLight}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry={!showConfirmPassword}
                    autoCapitalize="none"
                    autoComplete="password-new"
                  />
                  <TouchableOpacity
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                    style={styles.eyeIcon}
                  >
                    <Text style={[styles.eyeIconText, { color: COLORS.textSecondary }]}>
                      {showConfirmPassword ? 'Hide' : 'Show'}
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* Password Match Indicator */}
                {confirmPassword.length > 0 && (
                  <View style={styles.passwordMatch}>
                    {password === confirmPassword ? (
                      <Text style={[styles.matchText, { color: COLORS.success }]}>
                        ✓ Passwords match
                      </Text>
                    ) : (
                      <Text style={[styles.matchText, { color: COLORS.error }]}>
                        ✗ Passwords don't match
                      </Text>
                    )}
                  </View>
                )}

                {/* Terms and Conditions */}
                <View style={styles.termsContainer}>
                  <Text style={[styles.termsText, { color: COLORS.textLight }]}>
                    By signing up, you agree to our{' '}
                    <Text style={[styles.termsLink, { color: COLORS.primary }]}>
                      Terms & Conditions
                    </Text>
                    {' '}and{' '}
                    <Text style={[styles.termsLink, { color: COLORS.primary }]}>
                      Privacy Policy
                    </Text>
                  </Text>
                </View>

                {/* Signup Button */}
                <Button
                  title="Create Account"
                  onPress={handleSignup}
                  disabled={!isFormValid()}
                  style={styles.signupButton}
                  variant="secondary"
                />

                {/* Divider */}
                <View style={styles.divider}>
                  <View style={[styles.dividerLine, { backgroundColor: COLORS.border }]} />
                  <Text style={[styles.dividerText, { color: COLORS.textLight }]}>OR</Text>
                  <View style={[styles.dividerLine, { backgroundColor: COLORS.border }]} />
                </View>

                {/* Social Signup Buttons */}
                <View style={styles.socialButtons}>
                  <TouchableOpacity
                    style={[styles.socialButton, { backgroundColor: COLORS.card, borderColor: COLORS.border, borderWidth: 1 }]}
                  >
                    <Text style={[styles.socialText, { color: COLORS.text }]}>Google</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.socialButton, { backgroundColor: COLORS.card, borderColor: COLORS.border, borderWidth: 1 }]}
                  >
                    <Text style={[styles.socialText, { color: COLORS.text }]}>Facebook</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Footer */}
              <View style={styles.footer}>
                <Text style={[styles.footerText, { color: COLORS.textSecondary }]}>
                  Already have an account?{' '}
                  <Text
                    style={[styles.loginLink, { color: COLORS.primary }]}
                    onPress={handleLoginPress}
                  >
                    Sign In
                  </Text>
                </Text>
              </View>
            </ScrollView>
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
  },
  scrollContent: {
    paddingHorizontal: SIZES.lg,
    paddingBottom: SIZES.xl,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: SIZES.sm,
    paddingBottom: SIZES.md,
  },
  backButton: {
    width: 48,
    height: 48,
    borderRadius: RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    fontSize: 24,
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
    marginTop: SIZES.sm,
    marginBottom: SIZES.lg,
  },
  logoContainer: {
    width: 90,
    height: 90,
    borderRadius: RADIUS.xxl,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SIZES.md,
    ...SHADOWS.large,
  },
  logoText: {
    fontSize: 36,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  title: {
    fontSize: FONTS.xxlarge + 4,
    fontWeight: '800',
    marginBottom: SIZES.xs,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: FONTS.medium,
    fontWeight: '400',
    textAlign: 'center',
  },
  form: {
    marginTop: SIZES.md,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: RADIUS.lg,
    paddingHorizontal: SIZES.md,
    marginBottom: SIZES.md,
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
  eyeIcon: {
    paddingHorizontal: SIZES.sm,
  },
  eyeIconText: {
    fontSize: FONTS.small,
    fontWeight: '600',
  },
  passwordMatch: {
    marginTop: -SIZES.sm,
    marginBottom: SIZES.md,
    marginLeft: SIZES.xs,
  },
  matchText: {
    fontSize: FONTS.small,
    fontWeight: '600',
  },
  termsContainer: {
    marginBottom: SIZES.lg,
  },
  termsText: {
    fontSize: FONTS.small,
    textAlign: 'center',
    lineHeight: 20,
  },
  termsLink: {
    fontWeight: '700',
  },
  signupButton: {
    marginBottom: SIZES.lg,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: SIZES.md,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    fontSize: FONTS.small,
    marginHorizontal: SIZES.md,
    fontWeight: '600',
  },
  socialButtons: {
    flexDirection: 'row',
    gap: SIZES.md,
    marginBottom: SIZES.lg,
  },
  socialButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SIZES.md,
    borderRadius: RADIUS.lg,
  },
  socialText: {
    fontSize: FONTS.medium,
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
    paddingTop: SIZES.md,
  },
  footerText: {
    fontSize: FONTS.medium,
    fontWeight: '500',
  },
  loginLink: {
    fontWeight: '700',
  },
});
