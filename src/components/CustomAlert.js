import React, { useEffect, useRef } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../context/ThemeContext';
import { getColors, SIZES, FONTS, SHADOWS, RADIUS } from '../constants/theme';

const { width } = Dimensions.get('window');

export default function CustomAlert({
  visible,
  type = 'info', // 'success', 'error', 'warning', 'info'
  title,
  message,
  buttons = [],
  onDismiss,
}) {
  const { isDark } = useTheme();
  const COLORS = getColors(isDark);
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  const getIconAndColor = () => {
    switch (type) {
      case 'success':
        return { icon: '✓', color: COLORS.success, gradient: ['#10b981', '#059669'] };
      case 'error':
        return { icon: '✕', color: COLORS.error, gradient: ['#ef4444', '#dc2626'] };
      case 'warning':
        return { icon: '⚠', color: COLORS.warning, gradient: ['#f59e0b', '#d97706'] };
      default:
        return { icon: 'i', color: COLORS.primary, gradient: [COLORS.primary, COLORS.primaryDark] };
    }
  };

  const { icon, color, gradient } = getIconAndColor();

  const handleBackdropPress = () => {
    if (onDismiss) {
      onDismiss();
    }
  };

  return (
    <Modal
      transparent
      visible={visible}
      onRequestClose={onDismiss}
      animationType="none"
      statusBarTranslucent
    >
      <TouchableWithoutFeedback onPress={handleBackdropPress}>
        <Animated.View
          style={[
            styles.backdrop,
            {
              opacity: opacityAnim,
            },
          ]}
        >
          <TouchableWithoutFeedback>
            <Animated.View
              style={[
                styles.container,
                {
                  transform: [
                    { scale: scaleAnim },
                    {
                      translateY: scaleAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [50, 0],
                      }),
                    },
                  ],
                },
              ]}
            >
              <View style={[styles.alertBox, { backgroundColor: COLORS.card }, SHADOWS.large]}>
                {/* Icon */}
                <LinearGradient
                  colors={gradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.iconContainer}
                >
                  <Text style={styles.icon}>{icon}</Text>
                </LinearGradient>

                {/* Content */}
                <View style={styles.content}>
                  {title && (
                    <Text style={[styles.title, { color: COLORS.text }]}>{title}</Text>
                  )}
                  {message && (
                    <Text style={[styles.message, { color: COLORS.textSecondary }]}>
                      {message}
                    </Text>
                  )}
                </View>

                {/* Buttons */}
                {buttons.length > 0 && (
                  <View style={[styles.buttonContainer, buttons.length === 1 && styles.buttonContainerSingle]}>
                    {buttons.map((button, index) => {
                      const isDestructive = button.style === 'destructive';
                      const isCancel = button.style === 'cancel';
                      const isPrimary = !isDestructive && !isCancel;

                      return (
                        <TouchableOpacity
                          key={index}
                          onPress={() => {
                            if (button.onPress) {
                              button.onPress();
                            }
                            if (onDismiss) {
                              onDismiss();
                            }
                          }}
                          style={[
                            styles.button,
                            buttons.length === 1 && styles.buttonFull,
                          ]}
                        >
                          {isPrimary ? (
                            <LinearGradient
                              colors={gradient}
                              start={{ x: 0, y: 0 }}
                              end={{ x: 1, y: 1 }}
                              style={styles.buttonGradient}
                            >
                              <Text style={styles.buttonTextPrimary}>{button.text}</Text>
                            </LinearGradient>
                          ) : (
                            <View
                              style={[
                                styles.buttonOutline,
                                {
                                  backgroundColor: COLORS.backgroundSecondary,
                                  borderColor: isDestructive ? COLORS.error : COLORS.border,
                                },
                              ]}
                            >
                              <Text
                                style={[
                                  styles.buttonTextSecondary,
                                  {
                                    color: isDestructive ? COLORS.error : COLORS.textSecondary,
                                  },
                                ]}
                              >
                                {button.text}
                              </Text>
                            </View>
                          )}
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                )}
              </View>
            </Animated.View>
          </TouchableWithoutFeedback>
        </Animated.View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: width - 60,
    maxWidth: 400,
  },
  alertBox: {
    borderRadius: RADIUS.xl,
    padding: SIZES.xl,
    alignItems: 'center',
  },
  iconContainer: {
    width: 70,
    height: 70,
    borderRadius: RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SIZES.lg,
  },
  icon: {
    fontSize: 36,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  content: {
    alignItems: 'center',
    marginBottom: SIZES.lg,
  },
  title: {
    fontSize: FONTS.xlarge,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: SIZES.xs,
  },
  message: {
    fontSize: FONTS.medium,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 22,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: SIZES.sm,
    width: '100%',
  },
  buttonContainerSingle: {
    flexDirection: 'column',
  },
  button: {
    flex: 1,
  },
  buttonFull: {
    flex: 1,
    width: '100%',
  },
  buttonGradient: {
    paddingVertical: SIZES.md,
    paddingHorizontal: SIZES.lg,
    borderRadius: RADIUS.lg,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.medium,
  },
  buttonOutline: {
    paddingVertical: SIZES.md,
    paddingHorizontal: SIZES.lg,
    borderRadius: RADIUS.lg,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
  },
  buttonTextPrimary: {
    fontSize: FONTS.medium,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  buttonTextSecondary: {
    fontSize: FONTS.medium,
    fontWeight: '600',
  },
});
