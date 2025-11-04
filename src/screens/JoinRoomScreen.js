import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, KeyboardAvoidingView, Platform, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../components/Button';
import { useTheme } from '../context/ThemeContext';
import { getColors, SIZES, FONTS, SHADOWS, RADIUS } from '../constants/theme';

export default function JoinRoomScreen({ navigation, route }) {
  const [roomCode, setRoomCode] = useState('');
  const { isDark } = useTheme();
  const COLORS = getColors(isDark);
  const { username } = route.params;

  const handleJoinRoom = () => {
    if (roomCode.trim().length === 6) {
      // Navigate to lobby with the room code
      // For now, we'll simulate joining a room with mock data
      navigation.navigate('Lobby', {
        mode: 'join',
        category: 'Sports',
        roomCode: roomCode.toUpperCase(),
        username,
      });
    }
  };

  const formatRoomCode = (text) => {
    // Remove non-alphanumeric characters and convert to uppercase
    const formatted = text.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
    return formatted.substring(0, 6);
  };

  return (
    <View style={[styles.container, { backgroundColor: COLORS.background }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.content}
        >
          <View style={styles.header}>
            <View style={[styles.iconContainer, { backgroundColor: COLORS.primary + '15' }]}>
              <Text style={[styles.iconText, { color: COLORS.primary }]}>ROOM</Text>
            </View>
            <Text style={[styles.title, { color: COLORS.text }]}>Join Room</Text>
            <Text style={[styles.subtitle, { color: COLORS.textSecondary }]}>
              Enter the 6-digit room code to join
            </Text>
          </View>

          <View style={styles.form}>
            <View style={[styles.inputContainer, { backgroundColor: COLORS.card }, SHADOWS.medium]}>
              <TextInput
                style={[styles.input, { color: COLORS.text }]}
                placeholder="ABC123"
                placeholderTextColor={COLORS.textLight}
                value={roomCode}
                onChangeText={(text) => setRoomCode(formatRoomCode(text))}
                maxLength={6}
                autoCapitalize="characters"
                autoCorrect={false}
                keyboardType="default"
              />
            </View>

            <Button
              title="Join Room"
              onPress={handleJoinRoom}
              disabled={roomCode.length !== 6}
              style={styles.button}
            />

            <Button
              title="Cancel"
              variant="outline"
              onPress={() => navigation.goBack()}
              style={styles.button}
            />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: SIZES.lg,
  },
  header: {
    alignItems: 'center',
    marginTop: SIZES.xxl,
    marginBottom: SIZES.xl,
  },
  iconContainer: {
    paddingHorizontal: SIZES.lg,
    paddingVertical: SIZES.md,
    borderRadius: RADIUS.lg,
    marginBottom: SIZES.md,
  },
  iconText: {
    fontSize: FONTS.large,
    fontWeight: '800',
    letterSpacing: 1,
  },
  title: {
    fontSize: FONTS.xlarge + 4,
    fontWeight: '800',
    marginBottom: SIZES.sm,
  },
  subtitle: {
    fontSize: FONTS.medium,
    textAlign: 'center',
    fontWeight: '500',
  },
  form: {
    flex: 1,
  },
  inputContainer: {
    borderRadius: RADIUS.xl,
    marginBottom: SIZES.xl,
  },
  input: {
    padding: SIZES.xl,
    fontSize: FONTS.xxlarge + 8,
    fontWeight: '800',
    textAlign: 'center',
    letterSpacing: 10,
  },
  button: {
    marginVertical: SIZES.xs,
  },
});
