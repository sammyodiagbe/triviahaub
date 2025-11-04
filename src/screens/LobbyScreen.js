import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import PlayerCard from '../components/PlayerCard';
import Button from '../components/Button';
import { useTheme } from '../context/ThemeContext';
import { getColors, SIZES, FONTS, SHADOWS, RADIUS } from '../constants/theme';

export default function LobbyScreen({ navigation, route }) {
  const { mode, category, username } = route.params;
  const { isDark } = useTheme();
  const COLORS = getColors(isDark);
  const [roomCode, setRoomCode] = useState('ABC123');
  const [isSearching, setIsSearching] = useState(mode === 'quick');
  const [countdown, setCountdown] = useState(null);

  // Mock players data - will be replaced with real data later
  const [players, setPlayers] = useState([
    { id: '1', username: username || 'You', score: 0, isReady: true },
  ]);

  useEffect(() => {
    // Simulate finding opponent for quick battle
    if (mode === 'quick') {
      const timer = setTimeout(() => {
        setPlayers([
          { id: '1', username: username || 'You', score: 0, isReady: true },
          { id: '2', username: 'Opponent', score: 0, isReady: true },
        ]);
        setIsSearching(false);
        startCountdown();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [mode]);

  const startCountdown = () => {
    let count = 3;
    setCountdown(count);

    const interval = setInterval(() => {
      count--;
      if (count === 0) {
        clearInterval(interval);
        navigation.navigate('Battle', { category, players });
      } else {
        setCountdown(count);
      }
    }, 1000);
  };

  const handleStartGame = () => {
    if (players.length >= 2) {
      startCountdown();
    } else {
      Alert.alert('Not Enough Players', 'You need at least 2 players to start the game.');
    }
  };

  const copyRoomCode = () => {
    // Will implement clipboard copy later
    Alert.alert('Room Code Copied', roomCode);
  };

  return (
    <View style={[styles.container, { backgroundColor: COLORS.background }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          {mode === 'quick' ? (
            <>
              <Text style={[styles.title, { color: COLORS.text }]}>
                {isSearching ? 'Finding Opponent...' : 'Opponent Found'}
              </Text>
              <LinearGradient
                colors={[COLORS.primary, COLORS.primaryDark]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.categoryBadge}
              >
                <Text style={styles.categoryText}>{category}</Text>
              </LinearGradient>
            </>
          ) : (
            <>
              <Text style={[styles.title, { color: COLORS.text }]}>Battle Room</Text>
              <TouchableOpacity
                style={[styles.roomCodeContainer, { backgroundColor: COLORS.card, borderColor: COLORS.primary }, SHADOWS.medium]}
                onPress={copyRoomCode}
              >
                <Text style={[styles.roomCodeLabel, { color: COLORS.textSecondary }]}>Room Code</Text>
                <Text style={[styles.roomCode, { color: COLORS.primary }]}>{roomCode}</Text>
                <Text style={[styles.copyHint, { color: COLORS.textLight }]}>Tap to copy</Text>
              </TouchableOpacity>
              <LinearGradient
                colors={[COLORS.primary, COLORS.primaryDark]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.categoryBadge}
              >
                <Text style={styles.categoryText}>{category}</Text>
              </LinearGradient>
            </>
          )}
        </View>

        {countdown !== null && (
          <View style={[styles.countdownContainer, { backgroundColor: COLORS.card }, SHADOWS.large]}>
            <Text style={[styles.countdownText, { color: COLORS.textSecondary }]}>Starting in</Text>
            <Text style={[styles.countdown, { color: COLORS.primary }]}>{countdown}</Text>
          </View>
        )}

        <View style={styles.playersSection}>
          <Text style={[styles.sectionTitle, { color: COLORS.text }]}>
            Players ({players.length}/8)
          </Text>
          <FlatList
            data={players}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <PlayerCard
                username={item.username}
                score={item.score}
                isReady={item.isReady}
                showScore={false}
              />
            )}
            contentContainerStyle={styles.playersList}
          />
        </View>

        {mode === 'create' && countdown === null && (
          <View style={styles.footer}>
            <Button
              title="Start Game"
              onPress={handleStartGame}
              disabled={players.length < 2}
            />
            <Button
              title="Leave Room"
              variant="outline"
              onPress={() => navigation.goBack()}
              style={styles.leaveButton}
            />
          </View>
        )}

        {mode === 'quick' && isSearching && (
          <View style={styles.footer}>
            <Button
              title="Cancel"
              variant="outline"
              onPress={() => navigation.goBack()}
            />
          </View>
        )}
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
  header: {
    paddingHorizontal: SIZES.lg,
    paddingVertical: SIZES.xl,
    alignItems: 'center',
  },
  title: {
    fontSize: FONTS.xlarge + 4,
    fontWeight: '800',
    marginBottom: SIZES.md,
  },
  roomCodeContainer: {
    paddingVertical: SIZES.lg,
    paddingHorizontal: SIZES.xl,
    borderRadius: RADIUS.xl,
    marginVertical: SIZES.md,
    alignItems: 'center',
    borderWidth: 3,
    borderStyle: 'dashed',
  },
  roomCodeLabel: {
    fontSize: FONTS.small,
    marginBottom: SIZES.xs,
    fontWeight: '600',
  },
  roomCode: {
    fontSize: FONTS.xxlarge + 8,
    fontWeight: '800',
    letterSpacing: 6,
  },
  copyHint: {
    fontSize: FONTS.small,
    marginTop: SIZES.sm,
    fontWeight: '500',
  },
  categoryBadge: {
    paddingVertical: SIZES.sm,
    paddingHorizontal: SIZES.lg,
    borderRadius: RADIUS.full,
    marginTop: SIZES.md,
    ...SHADOWS.small,
  },
  categoryText: {
    color: '#FFFFFF',
    fontSize: FONTS.medium,
    fontWeight: '700',
  },
  countdownContainer: {
    alignItems: 'center',
    paddingVertical: SIZES.xxl,
    marginHorizontal: SIZES.lg,
    borderRadius: RADIUS.xl,
    marginBottom: SIZES.lg,
  },
  countdownText: {
    fontSize: FONTS.medium,
    marginBottom: SIZES.md,
    fontWeight: '600',
  },
  countdown: {
    fontSize: 72,
    fontWeight: '900',
  },
  playersSection: {
    flex: 1,
    paddingHorizontal: SIZES.lg,
  },
  sectionTitle: {
    fontSize: FONTS.medium,
    fontWeight: '700',
    marginBottom: SIZES.md,
  },
  playersList: {
    paddingBottom: SIZES.md,
  },
  footer: {
    paddingHorizontal: SIZES.lg,
    paddingBottom: SIZES.xl,
  },
  leaveButton: {
    marginTop: SIZES.md,
  },
});
