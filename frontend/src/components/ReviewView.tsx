'use client'
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./../components/ui/button";
import { Card } from "./../components/ui/card";
import { Progress } from "./../components/ui/progress";
import { RotateCcw, Check, X, Trophy } from "lucide-react";
import { Flashcard } from "./../types";
import { updateLessonWithFlashcards } from "../actions/lesson.actions";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

interface ReviewViewProps {
  flashcards: Flashcard[];
  isPrevLesson?: boolean;
}

export function ReviewView({ flashcards,isPrevLesson }: ReviewViewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [updatedFlashcards, setUpdatedFlashcards] = useState<Flashcard[]>(
    flashcards.map(f => ({ ...f, remembered: false }))
  );

  const router = useRouter();
  const searchParams = useSearchParams();
  const { isSignedIn } = useAuth();

  // ✅ Safe access: prevent crash when index exceeds array length
  const currentCard = updatedFlashcards[currentIndex];
  const progress = ((currentIndex + 1) / updatedFlashcards.length) * 100;
  const remainingCards = Math.max(updatedFlashcards.length - currentIndex - 1, 0);

  useEffect(() => {
    if (currentIndex >= updatedFlashcards.length && !isComplete) {
      setIsComplete(true);
    }
  }, [currentIndex, updatedFlashcards.length, isComplete]);

  const handleFlip = () => setIsFlipped(!isFlipped);

  const handleMark = (remembered: boolean) => {
    const updated = updatedFlashcards.map((card, index) =>
      index === currentIndex ? { ...card, remembered } : card
    );
    setUpdatedFlashcards(updated);
    setIsFlipped(false);

    // ✅ Prevent out-of-bounds access
    if (currentIndex + 1 >= updatedFlashcards.length) {
      setIsComplete(true);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleRestart = () => {
    const topic = searchParams.get('topic');
    router.push(`/lesson?mode=beginner&stage=explain&topic=${encodeURIComponent(topic!)}`);
  };

  const handleStartNew = () => router.push('/');

  const handleLessonUpdate = async () => {
    const lessonId = searchParams.get('lesson_id');
    if (!lessonId) {
      router.push('/');
      return;
    }
    try {
      await updateLessonWithFlashcards(lessonId, updatedFlashcards);
    } catch (error) {
      console.error("Error updating lesson:", error);
    }
  };

  useEffect(() => {
    if (isComplete && isSignedIn) {
      handleLessonUpdate();
    }
  }, [isComplete, isSignedIn]);

  // ✅ Show results screen after completion
  if (isComplete) {
    const rememberedCount = updatedFlashcards.filter(c => c.remembered).length;
    const successRate = Math.round((rememberedCount / updatedFlashcards.length) * 100);

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl mx-auto"
      >
        <Card className="p-12 text-center shadow-elegant">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="mb-6 flex justify-center"
          >
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-primary">
              <Trophy className="h-12 w-12 text-primary-foreground" />
            </div>
          </motion.div>

          <h2 className="text-3xl font-bold mb-4">Review Complete! 🎉</h2>
          <p className="text-lg text-muted-foreground mb-8">
            You've completed all flashcards in this session
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div className="rounded-lg bg-secondary p-6">
              <p className="text-3xl font-bold text-success">{rememberedCount}</p>
              <p className="text-sm text-muted-foreground mt-1">Remembered</p>
            </div>
            <div className="rounded-lg bg-secondary p-6">
              <p className="text-3xl font-bold text-primary">{successRate}%</p>
              <p className="text-sm text-muted-foreground mt-1">Success Rate</p>
            </div>
          </div>

          <div className="flex gap-3 justify-center flex-wrap">
           {!isPrevLesson && <Button onClick={handleRestart} size="lg" className="bg-gradient-primary hover:opacity-90">
              <RotateCcw className="mr-2 h-5 w-5" />
              Review Again
            </Button>}
            <Button onClick={handleStartNew} variant="outline" size="lg">
              Start New Lesson
            </Button>
          </div>
        </Card>
      </motion.div>
    );
  }

  
  if (!flashcards || flashcards.length === 0) {
    return (
      <div className="text-center p-6 text-destructive">
        No flashcards available for review.
      </div>
    );
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-2xl font-bold">Spaced Repetition</h2>
          <span className="text-sm font-medium text-muted-foreground">
            {remainingCards} card{remainingCards !== 1 ? "s" : ""} remaining
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, rotateY: -90 }}
          animate={{ opacity: 1, rotateY: 0 }}
          exit={{ opacity: 0, rotateY: 90 }}
          transition={{ duration: 0.3 }}
        >
          <Card
            onClick={handleFlip}
            className="relative h-80 cursor-pointer shadow-elegant transition-shadow hover:shadow-elegant/50"
            style={{ perspective: "1000px" }}
          >
            <AnimatePresence mode="wait">
              {currentCard && (
                <motion.div
                  key={isFlipped ? "back" : "front"}
                  initial={{ rotateY: 90 }}
                  animate={{ rotateY: 0 }}
                  exit={{ rotateY: -90 }}
                  transition={{ duration: 0.3 }}
                  className="h-full p-8 flex flex-col items-center justify-center"
                >
                  <p className="text-xs uppercase tracking-wide text-muted-foreground mb-4">
                    {isFlipped ? "Answer" : "Question"}
                  </p>
                  <p className="text-2xl font-semibold text-center">
                    {isFlipped ? currentCard.back : currentCard.front}
                  </p>
                  {!isFlipped && (
                    <p className="text-sm text-muted-foreground mt-6">
                      Click to reveal answer
                    </p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </Card>

          {isFlipped && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 flex gap-3 justify-center"
            >
              <Button
                onClick={() => handleMark(false)}
                variant="outline"
                size="lg"
                className="flex-1 border-destructive/50 text-destructive hover:bg-destructive/10"
              >
                <X className="mr-2 h-5 w-5" />
                I Forgot
              </Button>
              <Button
                onClick={() => handleMark(true)}
                size="lg"
                className="flex-1 bg-success hover:bg-success/90 text-success-foreground"
              >
                <Check className="mr-2 h-5 w-5" />
                I Remember
              </Button>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="mt-8 flex justify-center gap-6">
        <div className="text-center">
          <p className="text-2xl font-bold text-success">
            {updatedFlashcards.filter(c => c.remembered).length}
          </p>
          <p className="text-sm text-muted-foreground">Remembered</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-destructive">
            {currentIndex - updatedFlashcards.filter(c => c.remembered).length}
          </p>
          <p className="text-sm text-muted-foreground">Forgot</p>
        </div>
      </div>
    </motion.div>
  );
}
