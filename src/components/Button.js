import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../context/ThemeContext';
import { getColors, SIZES, FONTS, SHADOWS, RADIUS } from '../constants/theme';

export default function Button({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  style
}) {
  const { isDark } = useTheme();
  const COLORS = getColors(isDark);

  const getGradientColors = () => {
    if (disabled) {
      return [COLORS.disabled, COLORS.disabled];
    }
    switch (variant) {
      case 'secondary':
        return [COLORS.secondary, COLORS.secondaryDark];
      case 'primary':
      default:
        return [COLORS.primary, COLORS.primaryDark];
    }
  };

  const getTextColor = () => {
    if (variant === 'outline') {
      return COLORS.primary;
    }
    return COLORS.card;
  };

  if (variant === 'outline') {
    return (
      <TouchableOpacity
        style={[
          styles.button,
          styles.outline,
          {
            borderColor: disabled ? COLORS.disabled : COLORS.primary,
            backgroundColor: 'transparent'
          },
          style
        ]}
        onPress={onPress}
        disabled={disabled || loading}
        activeOpacity={0.7}
      >
        {loading ? (
          <ActivityIndicator color={COLORS.primary} />
        ) : (
          <Text style={[styles.text, { color: disabled ? COLORS.disabled : COLORS.primary }]}>
            {title}
          </Text>
        )}
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={[styles.buttonWrapper, style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={getGradientColors()}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[
          styles.button,
          !disabled && SHADOWS.medium,
        ]}
      >
        {loading ? (
          <ActivityIndicator color={COLORS.card} />
        ) : (
          <Text style={[styles.text, { color: getTextColor() }]}>
            {title}
          </Text>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonWrapper: {
    overflow: 'hidden',
    borderRadius: RADIUS.lg,
  },
  button: {
    paddingVertical: SIZES.md + 2,
    paddingHorizontal: SIZES.xl,
    borderRadius: RADIUS.lg,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 56,
  },
  outline: {
    borderWidth: 2,
  },
  text: {
    fontSize: FONTS.medium,
    fontWeight: '700',
    letterSpacing: 0.5,
    textAlign: 'center',
  },
});
