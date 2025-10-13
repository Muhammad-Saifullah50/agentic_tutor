import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { HomeView } from "@/components/HomeView";
import { ExplainView } from "@/components/ExplainView";
import { QuizView } from "@/components/QuizView";
import { ReviewView } from "@/components/ReviewView";
import { useStudySession } from "@/hooks/useStudySession";

const Index = () => {
  const {
    session,
    startSession,
    moveToQuiz,
    moveToReview,
    answerQuestion,
    markFlashcard,
    resetSession,
  } = useStudySession();

  const [currentMode, setCurrentMode] = useState<typeof session.mode>("beginner");

  const handleModeChange = (mode: typeof session.mode) => {
    setCurrentMode(mode);
    // If user changes mode, reset the session
    if (session.stage !== "home") {
      resetSession();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navbar
        questionsCorrect={session.progress.questionsCorrect}
        questionsTotal={session.stage === "quiz" ? session.questions.length : 0}
        flashcardsRemembered={session.progress.flashcardsRemembered}
        flashcardsTotal={session.stage === "review" ? session.flashcards.length : 0}
      />

      <main className="container mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {session.stage === "home" && (
            <HomeView
              key="home"
              onStart={startSession}
              currentMode={currentMode}
              onModeChange={handleModeChange}
            />
          )}

          {session.stage === "explain" && session.explanation && (
            <ExplainView
              key="explain"
              topic={session.topic}
              explanation={session.explanation}
              onNext={moveToQuiz}
            />
          )}

          {session.stage === "quiz" && (
            <QuizView
              key="quiz"
              questions={session.questions}
              onComplete={moveToReview}
              onAnswerQuestion={answerQuestion}
            />
          )}

          {session.stage === "review" && (
            <ReviewView
              key="review"
              flashcards={session.flashcards}
              onMarkCard={markFlashcard}
              onReset={resetSession}
              cardsRemembered={session.progress.flashcardsRemembered}
              cardsTotal={session.flashcards.length}
            />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Index;
