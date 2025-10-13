import { useState } from "react";
import { StudyMode, FlowStage, Question, Flashcard, StudySession } from "@/types";
import { generateMockExplanation, generateMockQuestions, generateMockFlashcards } from "@/lib/mockData";

export function useStudySession() {
  const [session, setSession] = useState<StudySession>({
    topic: "",
    mode: "beginner",
    stage: "home",
    questions: [],
    flashcards: [],
    progress: {
      questionsAnswered: 0,
      questionsCorrect: 0,
      flashcardsReviewed: 0,
      flashcardsRemembered: 0,
    },
  });

  const startSession = (topic: string, mode: StudyMode) => {
    const explanation = generateMockExplanation(topic, mode);
    const questions = generateMockQuestions(topic, mode);
    const flashcards = generateMockFlashcards(topic, mode);

    setSession({
      topic,
      mode,
      stage: "explain",
      explanation,
      questions,
      flashcards,
      progress: {
        questionsAnswered: 0,
        questionsCorrect: 0,
        flashcardsReviewed: 0,
        flashcardsRemembered: 0,
      },
    });
  };

  const moveToQuiz = () => {
    setSession((prev) => ({ ...prev, stage: "quiz" }));
  };

  const moveToReview = () => {
    setSession((prev) => ({ ...prev, stage: "review" }));
  };

  const answerQuestion = (questionId: string, answerIndex: number) => {
    const question = session.questions.find((q) => q.id === questionId);
    const isCorrect = question?.correctAnswer === answerIndex;

    setSession((prev) => ({
      ...prev,
      progress: {
        ...prev.progress,
        questionsAnswered: prev.progress.questionsAnswered + 1,
        questionsCorrect: prev.progress.questionsCorrect + (isCorrect ? 1 : 0),
      },
    }));

    return isCorrect;
  };

  const markFlashcard = (flashcardId: string, remembered: boolean) => {
    setSession((prev) => ({
      ...prev,
      flashcards: prev.flashcards.map((card) =>
        card.id === flashcardId ? { ...card, remembered } : card
      ),
      progress: {
        ...prev.progress,
        flashcardsReviewed: prev.progress.flashcardsReviewed + 1,
        flashcardsRemembered: prev.progress.flashcardsRemembered + (remembered ? 1 : 0),
      },
    }));
  };

  const resetSession = () => {
    setSession({
      topic: "",
      mode: "beginner",
      stage: "home",
      questions: [],
      flashcards: [],
      progress: {
        questionsAnswered: 0,
        questionsCorrect: 0,
        flashcardsReviewed: 0,
        flashcardsRemembered: 0,
      },
    });
  };

  return {
    session,
    startSession,
    moveToQuiz,
    moveToReview,
    answerQuestion,
    markFlashcard,
    resetSession,
  };
}
