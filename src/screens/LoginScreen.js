import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, KeyboardAvoidingView, Platform, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Button from '../components/Button';
import CustomAlert from '../components/CustomAlert';
import { useAlert } from '../hooks/useAlert';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { getColors, SIZES, FONTS, SHADOWS, RADIUS } from '../constants/theme';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const { signIn, resetPassword } = useAuth();
  const { alertState, showAlert, hideAlert } = useAlert();
  const COLORS = getColors(isDark);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      showAlert(
        'Missing Information',
        'Please fill in all fields to continue.',
        [{ text: 'OK' }],
        'warning'
      );
      return;
    }

    setLoading(true);
    const { data, error } = await signIn(email.trim(), password);
    setLoading(false);

    if (error) {
      showAlert(
        'Login Failed',
        error,
        [{ text: 'Try Again' }],
        'error'
      );
    } else {
      // Navigation will be handled by auth state change
      navigation.navigate('Home');
    }
  };

  const handleSignupPress = () => {
    navigation.navigate('Signup');
  };

  const handleForgotPassword = async () => {
    if (!email.trim()) {
      showAlert(
        'Email Required',
        'Please enter your email address to reset your password.',
        [{ text: 'OK' }],
        'info'
      );
      return;
    }

    showAlert(
      'Reset Password',
      `Send password reset link to ${email.trim()}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Send Link',
          onPress: async () => {
            const { error } = await resetPassword(email.trim());
            if (error) {
              showAlert(
                'Error',
                error,
                [{ text: 'OK' }],
                'error'
              );
            } else {
              showAlert(
                'Email Sent!',
                'Password reset link has been sent to your email. Please check your inbox.',
                [{ text: 'OK' }],
                'success'
              );
            }
          },
        },
      ],
      'info'
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
              <Text style={[styles.title, { color: COLORS.text }]}>Welcome Back</Text>
              <Text style={[styles.subtitle, { color: COLORS.textSecondary }]}>
                Sign in to continue your trivia journey
              </Text>
            </View>

            {/* Form */}
            <View style={styles.form}>
              {/* Email Input */}
              <View style={[styles.inputContainer, { backgroundColor: COLORS.card }, SHADOWS.small]}>
                <View style={[styles.inputIconContainer, { backgroundColor: COLORS.primary + '15' }]}>
                  <Text style={[styles.inputIconText, { color: COLORS.primary }]}>@</Text>
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
                <View style={[styles.inputIconContainer, { backgroundColor: COLORS.primary + '15' }]}>
                  <Text style={[styles.inputIconText, { color: COLORS.primary }]}>•••</Text>
                </View>
                <TextInput
                  style={[styles.input, { color: COLORS.text }]}
                  placeholder="Password"
                  placeholderTextColor={COLORS.textLight}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoComplete="password"
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

              {/* Forgot Password */}
              <TouchableOpacity onPress={handleForgotPassword} style={styles.forgotPassword}>
                <Text style={[styles.forgotPasswordText, { color: COLORS.primary }]}>
                  Forgot Password?
                </Text>
              </TouchableOpacity>

              {/* Login Button */}
              <Button
                title="Sign In"
                onPress={handleLogin}
                disabled={!email.trim() || !password.trim()}
                loading={loading}
                style={styles.loginButton}
              />

              {/* Divider */}
              <View style={styles.divider}>
                <View style={[styles.dividerLine, { backgroundColor: COLORS.border }]} />
                <Text style={[styles.dividerText, { color: COLORS.textLight }]}>OR</Text>
                <View style={[styles.dividerLine, { backgroundColor: COLORS.border }]} />
              </View>

              {/* Social Login Buttons */}
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
                Don't have an account?{' '}
                <Text
                  style={[styles.signupLink, { color: COLORS.primary }]}
                  onPress={handleSignupPress}
                >
                  Sign Up
                </Text>
              </Text>
            </View>
          </KeyboardAvoidingView>
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
    marginTop: SIZES.md,
    marginBottom: SIZES.xl,
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
    flex: 1,
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
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: SIZES.lg,
  },
  forgotPasswordText: {
    fontSize: FONTS.small,
    fontWeight: '600',
  },
  loginButton: {
    marginBottom: SIZES.lg,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: SIZES.lg,
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
    paddingBottom: SIZES.xl,
    paddingTop: SIZES.lg,
  },
  footerText: {
    fontSize: FONTS.medium,
    fontWeight: '500',
  },
  signupLink: {
    fontWeight: '700',
  },
});
