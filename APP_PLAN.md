# Trivia Batu App - Architecture Plan

## Overview
A peer-to-peer real-time trivia battle app where players compete head-to-head or in multiplayer rooms.

## Core Features
- **1v1 Mode**: Two players compete in real-time
- **Room Mode**: Multiple players in a battle room
- **Real-time Simultaneous Answers**: All players answer at the same time
- **Multiple Categories**: Sports, History, Science, Entertainment, etc.

## User Flow

### 1. Home Screen
- App logo/title
- Username input/display
- Two main buttons:
  - "Quick Battle" (1v1 matchmaking)
  - "Create/Join Room" (multiplayer)
- Stats/Profile button

### 2. Category Selection Screen
- Grid of category cards (Sports, History, Science, etc.)
- "Random" option for mixed categories
- Back button

### 3. Lobby/Waiting Screen
**For 1v1:**
- "Finding opponent..." loading state
- Opponent found - show both players
- Category display
- Countdown to start

**For Rooms:**
- Room code display
- List of players in room
- Host controls (start game, kick players)
- Join room by code option
- Ready/Not Ready status

### 4. Battle/Game Screen
- Question counter (e.g., "Question 3/10")
- Category badge
- Question text
- 4 answer buttons (A, B, C, D)
- Timer bar/countdown
- Player scores display
- Current players in battle indicator

### 5. Results Screen
- Winner announcement
- Final scores
- Question review (correct/incorrect breakdown)
- Buttons:
  - "Play Again"
  - "Back to Home"
  - "Share Results"

## Screen Components Breakdown

### Reusable Components
1. **Button** - Primary, secondary, outlined variants
2. **PlayerCard** - Avatar, username, score
3. **QuestionCard** - Question display with timer
4. **AnswerButton** - Interactive answer option
5. **CategoryCard** - Category selection tile
6. **RoomCodeDisplay** - Styled room code with copy function
7. **Timer** - Circular or linear countdown
8. **ScoreBar** - Real-time score comparison

## Data Models (Frontend - for UI planning)

### Player
```javascript
{
  id: string,
  username: string,
  avatar: string,
  score: number,
  isReady: boolean
}
```

### Question
```javascript
{
  id: string,
  category: string,
  question: string,
  answers: [string, string, string, string],
  correctAnswer: number, // index 0-3
  timeLimit: number // seconds
}
```

### Room
```javascript
{
  id: string,
  roomCode: string,
  hostId: string,
  players: [Player],
  category: string,
  maxPlayers: number,
  status: 'waiting' | 'playing' | 'finished'
}
```

### Battle State
```javascript
{
  currentQuestion: number,
  totalQuestions: number,
  question: Question,
  timeRemaining: number,
  playerAnswers: {[playerId]: number},
  scores: {[playerId]: number}
}
```

## Technical Stack (Planning)
- **Frontend**: React Native + Expo
- **Navigation**: React Navigation
- **State Management**: Context API / Redux (TBD)
- **Peer-to-Peer**: WebRTC or Socket.io (TBD - Phase 2)
- **Styling**: React Native StyleSheet + custom theme

## Development Phases

### Phase 1: UI Development (Current)
- [ ] Set up navigation
- [ ] Build all screen layouts
- [ ] Create reusable components
- [ ] Add mock data for testing
- [ ] Polish styling and animations

### Phase 2: Game Logic (Next)
- [ ] Question management
- [ ] Timer logic
- [ ] Score calculation
- [ ] Answer validation

### Phase 3: Peer-to-Peer Connectivity
- [ ] Choose P2P solution (WebRTC/Socket.io)
- [ ] Implement matchmaking
- [ ] Room creation/joining
- [ ] Real-time game synchronization

### Phase 4: Polish & Features
- [ ] User profiles
- [ ] Leaderboards
- [ ] Question database/API
- [ ] Animations and sound effects
- [ ] Settings screen

## Color Scheme (Suggestion)
- Primary: #6C63FF (Purple/Blue)
- Secondary: #FF6584 (Pink)
- Success: #4CAF50
- Warning: #FFC107
- Background: #F5F5F5
- Card: #FFFFFF
- Text: #333333

## Next Steps
1. Install React Navigation
2. Set up folder structure
3. Create basic screen shells
4. Build reusable components
5. Connect navigation
