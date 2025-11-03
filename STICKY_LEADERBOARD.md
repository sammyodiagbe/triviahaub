# Sticky Leaderboard Header Update

## What Was Changed

Updated the LeaderboardScreen to have a **sticky header and podium** that stays fixed at the top while the ranked list scrolls below.

### Before
- Entire screen was scrollable (header, podium, and list all scrolled together)

### After
- **Fixed at top**: Header + Top 3 Podium
- **Scrollable below**: Ranked list (4th-10th) + Your Rank card

## Implementation Details

### Layout Structure

```
<SafeAreaView>
  <!-- FIXED SECTION (Sticky) -->
  <View style={fixedSection}>
    - Header (Title + Subtitle)
    - Podium (Top 3 players)
  </View>

  <!-- SCROLLABLE SECTION -->
  <ScrollView>
    - Ranked List (4th place onwards)
    - Your Rank Card
  </ScrollView>
</SafeAreaView>
```

### Key Changes

1. **Fixed Section** (`styles.fixedSection`)
   - Contains header and podium
   - Stays at the top, doesn't scroll
   - Transparent background to show gradient

2. **ScrollView**
   - Only wraps the ranked list and your rank card
   - Added top padding for spacing from fixed section
   - Bottom padding for tab bar clearance

3. **Updated Styles**
   - `fixedSection`: New style for the sticky container
   - `podiumContainer`: Changed `marginBottom` to `paddingBottom` for better spacing
   - `scrollContent`: Added `paddingTop` for proper spacing

### User Experience

**Benefits:**
- ✅ Top 3 players always visible
- ✅ Easy reference while scrolling
- ✅ Better use of screen space
- ✅ Maintains context while viewing lower ranks
- ✅ Smooth scrolling performance

**Behavior:**
1. When you open the leaderboard, you see the header and top 3 podium
2. As you scroll down, the podium stays fixed at the top
3. The ranked list (4th onwards) scrolls beneath it
4. Your rank card scrolls with the list at the bottom

## Code Changes

### File Modified
- `src/screens/LeaderboardScreen.js`

### Styles Added/Modified
```javascript
fixedSection: {
  backgroundColor: 'transparent',
},

scrollContent: {
  paddingBottom: SIZES.xxl + 60,
  paddingTop: SIZES.md,  // Added for spacing
},

podiumContainer: {
  // Changed marginBottom to paddingBottom
  paddingBottom: SIZES.lg,
},
```

## Testing

1. Open the app and navigate to the Leaderboard tab
2. You should see:
   - Header "Leaderboard" at the top
   - Top 3 players in podium formation
3. Scroll down:
   - The podium stays fixed at the top
   - Ranked list (4th-10th) scrolls smoothly
   - Your Rank card appears at the bottom

## Visual Hierarchy

```
┌─────────────────────────┐
│   Leaderboard          │ ← FIXED
│  Top players this week │ ← FIXED
│                        │
│    👑                  │ ← FIXED
│   2️⃣ 1st 3️⃣           │ ← FIXED (Podium)
│                        │
├─────────────────────────┤ ← Scroll starts here
│ 4  Player Name  Points │ ↓
│ 5  Player Name  Points │ ↓ SCROLLABLE
│ 6  Player Name  Points │ ↓
│ ...                    │ ↓
│ Your Rank Card         │ ↓
└─────────────────────────┘
```

## Performance

- **No performance impact**: Only a single ScrollView
- **Efficient rendering**: Fixed section doesn't re-render on scroll
- **Smooth animations**: Native scroll performance maintained

This creates a professional leaderboard experience similar to popular gaming and social apps!
