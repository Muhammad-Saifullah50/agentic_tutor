import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./../components/ui/button";
import { Card } from "./../components/ui/card";
import { Progress } from "./../components/ui/progress";
import { RotateCcw, Check, X, Trophy } from "lucide-react";
import { Flashcard } from "./../types";
import confetti from "canvas-confetti";

interface ReviewViewProps {
  flashcards: Flashcard[];
  onMarkCard: (flashcardId: string, remembered: boolean) => void;
  onReset: () => void;
  cardsRemembered: number;
  cardsTotal: number;
}

export function ReviewView({
  flashcards,
  onMarkCard,
  onReset,
  cardsRemembered,
  cardsTotal,
}: ReviewViewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const currentCard = flashcards[currentIndex];
  const progress = ((currentIndex + 1) / flashcards.length) * 100;
  const remainingCards = flashcards.length - currentIndex - 1;

  useEffect(() => {
    if (currentIndex >= flashcards.length && !isComplete) {
      setIsComplete(true);
      // Trigger confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }, [currentIndex, flashcards.length, isComplete]);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleMark = (remembered: boolean) => {
    onMarkCard(currentCard.id, remembered);
    setIsFlipped(false);
    setCurrentIndex(currentIndex + 1);
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setIsComplete(false);
    onReset();
  };

  if (isComplete) {
    const successRate = Math.round((cardsRemembered / cardsTotal) * 100);

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

          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="rounded-lg bg-secondary p-6">
              <p className="text-3xl font-bold text-success">{cardsRemembered}</p>
              <p className="text-sm text-muted-foreground mt-1">Remembered</p>
            </div>
            <div className="rounded-lg bg-secondary p-6">
              <p className="text-3xl font-bold text-primary">{successRate}%</p>
              <p className="text-sm text-muted-foreground mt-1">Success Rate</p>
            </div>
          </div>

          <div className="flex gap-3 justify-center">
            <Button onClick={handleRestart} size="lg" className="bg-gradient-primary hover:opacity-90">
              <RotateCcw className="mr-2 h-5 w-5" />
              Review Again
            </Button>
            <Button onClick={onReset} variant="outline" size="lg">
              Start New Topic
            </Button>
          </div>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-2xl mx-auto"
    >
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-2xl font-bold">Spaced Repetition</h2>
          <span className="text-sm font-medium text-muted-foreground">
            {remainingCards} card{remainingCards !== 1 ? "s" : ""} remaining
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Flashcard */}
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
                  <p className="text-sm text-muted-foreground mt-6">Click to reveal answer</p>
                )}
              </motion.div>
            </AnimatePresence>
          </Card>

          {/* Action Buttons */}
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

      {/* Stats */}
      <div className="mt-8 flex justify-center gap-6">
        <div className="text-center">
          <p className="text-2xl font-bold text-success">{cardsRemembered}</p>
          <p className="text-sm text-muted-foreground">Remembered</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-destructive">
            {currentIndex - cardsRemembered}
          </p>
          <p className="text-sm text-muted-foreground">Forgot</p>
        </div>
      </div>
    </motion.div>
  );
}
