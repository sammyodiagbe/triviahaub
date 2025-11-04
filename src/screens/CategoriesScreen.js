import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import CategoryCard from '../components/CategoryCard';
import { useTheme } from '../context/ThemeContext';
import { getColors, SIZES, FONTS, CATEGORIES, RADIUS } from '../constants/theme';

export default function CategoriesScreen({ navigation, route }) {
  const { mode, username } = route.params;
  const { isDark } = useTheme();
  const COLORS = getColors(isDark);

  const handleCategorySelect = (category) => {
    if (mode === 'quick') {
      navigation.navigate('Lobby', { mode: 'quick', category: category.name, username });
    } else if (mode === 'create') {
      navigation.navigate('Lobby', { mode: 'create', category: category.name, username });
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: COLORS.background }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={[styles.backButton, { backgroundColor: COLORS.card }]}
          >
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <View style={styles.headerContent}>
            <Text style={[styles.title, { color: COLORS.text }]}>Choose Category</Text>
            <Text style={[styles.subtitle, { color: COLORS.textSecondary }]}>
              Select a trivia category for your battle
            </Text>
          </View>
        </View>

        {/* Categories Grid */}
        <FlatList
          data={CATEGORIES}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <CategoryCard
              name={item.name}
              icon={item.icon}
              gradient={item.gradient}
              onPress={() => handleCategorySelect(item)}
            />
          )}
        />
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
    paddingTop: SIZES.md,
    paddingBottom: SIZES.lg,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SIZES.md,
  },
  backIcon: {
    fontSize: 24,
  },
  headerContent: {
    alignItems: 'center',
  },
  title: {
    fontSize: FONTS.xlarge + 4,
    fontWeight: '800',
    marginBottom: SIZES.xs,
  },
  subtitle: {
    fontSize: FONTS.medium,
    textAlign: 'center',
    fontWeight: '500',
  },
  listContent: {
    paddingHorizontal: SIZES.lg,
    paddingBottom: SIZES.xl,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: SIZES.md,
  },
});
