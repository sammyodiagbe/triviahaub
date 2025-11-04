import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../context/ThemeContext';
import { getColors, SIZES, FONTS, SHADOWS, RADIUS } from '../constants/theme';

// Mock questions - will be replaced with real data
const MOCK_QUESTIONS = [
  {
    id: '1',
    question: 'What is the capital of France?',
    answers: ['London', 'Berlin', 'Paris', 'Madrid'],
    correctAnswer: 2,
  },
  {
    id: '2',
    question: 'Which planet is known as the Red Planet?',
    answers: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
    correctAnswer: 1,
  },
  {
    id: '3',
    question: 'Who painted the Mona Lisa?',
    answers: ['Vincent van Gogh', 'Pablo Picasso', 'Leonardo da Vinci', 'Michelangelo'],
    correctAnswer: 2,
  },
];

export default function BattleScreen({ navigation, route }) {
  const { category, players } = route.params;
  const { isDark } = useTheme();
  const COLORS = getColors(isDark);
  const totalQuestions = MOCK_QUESTIONS.length;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [scores, setScores] = useState({});
  const [timerWidth] = useState(new Animated.Value(1));

  const currentQuestion = MOCK_QUESTIONS[currentQuestionIndex];

  useEffect(() => {
    // Initialize scores
    const initialScores = {};
    players.forEach((player) => {
      initialScores[player.id] = 0;
    });
    setScores(initialScores);
  }, []);

  useEffect(() => {
    // Timer animation
    Animated.timing(timerWidth, {
      toValue: 0,
      duration: 15000,
      useNativeDriver: false,
    }).start();

    // Countdown timer
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [currentQuestionIndex]);

  const handleTimeout = () => {
    if (!showResult) {
      setShowResult(true);
      setTimeout(nextQuestion, 2000);
    }
  };

  const handleAnswerSelect = (index) => {
    if (showResult) return;

    setSelectedAnswer(index);
    setShowResult(true);

    // Update score if correct
    if (index === currentQuestion.correctAnswer) {
      setScores((prev) => ({
        ...prev,
        '1': (prev['1'] || 0) + 100,
      }));
    }

    setTimeout(nextQuestion, 2000);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setTimeLeft(15);
      timerWidth.setValue(1);
    } else {
      // Game finished
      navigation.replace('Results', { scores, players, category });
    }
  };

  const getAnswerStyle = (index) => {
    if (!showResult) {
      return selectedAnswer === index ? styles.answerSelected : styles.answer;
    }

    if (index === currentQuestion.correctAnswer) {
      return styles.answerCorrect;
    }

    if (selectedAnswer === index && index !== currentQuestion.correctAnswer) {
      return styles.answerWrong;
    }

    return styles.answer;
  };

  const timerWidthInterpolated = timerWidth.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  const getAnswerBackgroundStyle = (index) => {
    if (!showResult) {
      return selectedAnswer === index
        ? { backgroundColor: COLORS.card, borderColor: COLORS.primary, borderWidth: 3 }
        : { backgroundColor: COLORS.card, borderColor: COLORS.border, borderWidth: 2 };
    }

    if (index === currentQuestion.correctAnswer) {
      return { backgroundColor: COLORS.success, borderColor: COLORS.success, borderWidth: 2 };
    }

    if (selectedAnswer === index && index !== currentQuestion.correctAnswer) {
      return { backgroundColor: COLORS.error, borderColor: COLORS.error, borderWidth: 2 };
    }

    return { backgroundColor: COLORS.card, borderColor: COLORS.border, borderWidth: 2 };
  };

  const getAnswerTextColor = (index) => {
    if (!showResult) {
      return COLORS.text;
    }
    if (index === currentQuestion.correctAnswer || (selectedAnswer === index && index !== currentQuestion.correctAnswer)) {
      return '#FFFFFF';
    }
    return COLORS.text;
  };

  return (
    <View style={[styles.container, { backgroundColor: COLORS.background }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      <SafeAreaView style={styles.safeArea}>
        {/* Header with Timer */}
        <View style={styles.header}>
          <View style={styles.questionCounter}>
            <Text style={[styles.questionCounterText, { color: COLORS.text }]}>
              Question {currentQuestionIndex + 1}/{totalQuestions}
            </Text>
            <LinearGradient
              colors={[COLORS.primary, COLORS.primaryDark]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.categoryBadge}
            >
              <Text style={styles.categoryText}>{category}</Text>
            </LinearGradient>
          </View>

          <View style={[styles.timerContainer, { backgroundColor: COLORS.border }]}>
            <Animated.View
              style={[
                styles.timerBar,
                {
                  width: timerWidthInterpolated,
                  backgroundColor: timeLeft <= 5 ? COLORS.error : COLORS.success,
                },
              ]}
            />
          </View>
          <View style={styles.timerCircle}>
            <Text style={[styles.timerText, { color: timeLeft <= 5 ? COLORS.error : COLORS.primary }]}>
              {timeLeft}s
            </Text>
          </View>
        </View>

        {/* Player Scores */}
        <View style={styles.scoresContainer}>
          {players.map((player) => (
            <View key={player.id} style={[styles.playerScore, { backgroundColor: COLORS.card }, SHADOWS.small]}>
              <Text style={[styles.playerName, { color: COLORS.textSecondary }]}>{player.username}</Text>
              <Text style={[styles.score, { color: COLORS.primary }]}>{scores[player.id] || 0}</Text>
            </View>
          ))}
        </View>

        {/* Question Card */}
        <View style={[styles.questionCard, { backgroundColor: COLORS.card }, SHADOWS.medium]}>
          <Text style={[styles.question, { color: COLORS.text }]}>{currentQuestion.question}</Text>
        </View>

        {/* Answer Options */}
        <View style={styles.answersContainer}>
          {currentQuestion.answers.map((answer, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.answer,
                getAnswerBackgroundStyle(index),
                SHADOWS.small
              ]}
              onPress={() => handleAnswerSelect(index)}
              disabled={showResult}
              activeOpacity={0.7}
            >
              <View style={[
                styles.answerLetter,
                { backgroundColor: showResult && index === currentQuestion.correctAnswer ? '#FFFFFF' : COLORS.primary }
              ]}>
                <Text style={[
                  styles.answerLetterText,
                  { color: showResult && index === currentQuestion.correctAnswer ? COLORS.success : '#FFFFFF' }
                ]}>
                  {String.fromCharCode(65 + index)}
                </Text>
              </View>
              <Text style={[styles.answerText, { color: getAnswerTextColor(index) }]}>{answer}</Text>
            </TouchableOpacity>
          ))}
        </View>
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
    paddingBottom: SIZES.sm,
  },
  questionCounter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.md,
  },
  questionCounterText: {
    fontSize: FONTS.medium,
    fontWeight: '700',
  },
  categoryBadge: {
    paddingHorizontal: SIZES.md + 2,
    paddingVertical: SIZES.xs + 2,
    borderRadius: RADIUS.full,
    ...SHADOWS.small,
  },
  categoryText: {
    fontSize: FONTS.small,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  timerContainer: {
    height: 8,
    borderRadius: RADIUS.xs,
    overflow: 'hidden',
    marginBottom: SIZES.md,
  },
  timerBar: {
    height: '100%',
    borderRadius: RADIUS.xs,
  },
  timerCircle: {
    alignSelf: 'center',
  },
  timerText: {
    fontSize: FONTS.xxlarge,
    fontWeight: '800',
    textAlign: 'center',
  },
  scoresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: SIZES.lg,
    paddingVertical: SIZES.md,
    gap: SIZES.md,
  },
  playerScore: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: SIZES.md,
    borderRadius: RADIUS.lg,
  },
  playerName: {
    fontSize: FONTS.small,
    marginBottom: SIZES.xs,
    fontWeight: '600',
  },
  score: {
    fontSize: FONTS.xlarge + 4,
    fontWeight: '800',
  },
  questionCard: {
    marginHorizontal: SIZES.lg,
    marginVertical: SIZES.md,
    padding: SIZES.xl,
    borderRadius: RADIUS.xl,
    minHeight: 120,
    justifyContent: 'center',
  },
  question: {
    fontSize: FONTS.large + 2,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 30,
  },
  answersContainer: {
    flex: 1,
    paddingHorizontal: SIZES.lg,
    paddingBottom: SIZES.md,
  },
  answer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SIZES.md + 2,
    borderRadius: RADIUS.lg,
    marginBottom: SIZES.md,
  },
  answerLetter: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SIZES.md,
  },
  answerLetterText: {
    fontSize: FONTS.medium + 2,
    fontWeight: '800',
  },
  answerText: {
    flex: 1,
    fontSize: FONTS.medium,
    fontWeight: '600',
    lineHeight: 22,
  },
});
