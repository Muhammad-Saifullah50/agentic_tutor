export type StudyMode = "beginner" | "practice" | "exam";

export type FlowStage = "home" | "explain" | "quiz" | "review";

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  remembered: boolean;
}

export interface StudySession {
  topic: string;
  mode: StudyMode;
  stage: FlowStage;
  explanation?: string;
  questions: Question[];
  flashcards: Flashcard[];
  progress: {
    questionsAnswered: number;
    questionsCorrect: number;
    flashcardsReviewed: number;
    flashcardsRemembered: number;
  };
}
