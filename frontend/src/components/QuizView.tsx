'use client'
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./../components/ui/button";
import { Card } from "./../components/ui/card";
import { Progress } from "./../components/ui/progress";
import { ArrowRight, CheckCircle2, XCircle, HelpCircle, Loader2 } from "lucide-react";
import { Question } from "./../types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { updateLessonWithQuestions } from "../actions/lesson.actions";

interface QuizViewProps {
  questions: Question[];
  isPrevLesson?: boolean;
}

export function QuizView({ questions, isPrevLesson }: QuizViewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isSignedIn } = useAuth();
  const pathname = usePathname();

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  const handleSelectAnswer = (index: number) => {
    if (!isAnswered) {
      setSelectedAnswer(index);
    }
  };

  const handleCheckAnswer = () => {
    if (selectedAnswer === null) return;
    const correct = selectedAnswer === currentQuestion.correct_answer;
    setIsCorrect(correct);
    setIsAnswered(true);
  };

  const handleNext = async () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setIsCorrect(false);
    } else {
      // ✅ Start loading state
      setIsLoading(true);

      if (isPrevLesson) {
        router.push(`${pathname}?stage=review`);
        setIsLoading(false);
      } else {
        const topic = searchParams.get("topic");
        const mode = searchParams.get("mode");
        const lessonId = searchParams.get("lesson_id");

        if (!lessonId) {
          router.push("/");
          setIsLoading(false);
          return;
        }

        try {
          if (isSignedIn && lessonId) {
            await updateLessonWithQuestions(lessonId, questions);
            router.push(
              `/lesson?topic=${encodeURIComponent(topic!)}&mode=${mode}&stage=review&lesson_id=${lessonId}`
            );
          } else {
            router.push(`/sign-in`);
          }
        } finally {
          setIsLoading(false);
        }
      }
    }
  };

  if (questions.length === 0) {
    return (
      <div className="text-center p-6 text-destructive">
        Failed to load questions. Please try again later.
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-3xl mx-auto"
    >
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <HelpCircle className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold">Quiz Time</h2>
          </div>
          <span className="text-sm font-medium text-muted-foreground">
            Question {currentIndex + 1} of {questions.length}
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Question Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="p-8 shadow-elegant">
            <h3 className="text-xl font-semibold mb-6">{currentQuestion.question}</h3>

            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrectAnswer = currentQuestion.correct_answer === index;
                const showCorrect = isAnswered && isCorrectAnswer;
                const showIncorrect = isAnswered && isSelected && !isCorrect;

                return (
                  <motion.button
                    key={index}
                    whileHover={!isAnswered ? { scale: 1.02 } : {}}
                    whileTap={!isAnswered ? { scale: 0.98 } : {}}
                    onClick={() => handleSelectAnswer(index)}
                    disabled={isAnswered}
                    className={`
                      w-full p-4 rounded-lg border-2 text-left transition-all
                      ${!isAnswered && isSelected ? "border-primary bg-primary/5" : "border-border"}
                      ${!isAnswered && !isSelected ? "hover:border-primary/50 hover:bg-muted/50" : ""}
                      ${showCorrect ? "border-success bg-success/10" : ""}
                      ${showIncorrect ? "border-destructive bg-destructive/10" : ""}
                      ${isAnswered ? "cursor-not-allowed" : "cursor-pointer"}
                    `}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{option}</span>
                      {showCorrect && <CheckCircle2 className="h-5 w-5 text-success" />}
                      {showIncorrect && <XCircle className="h-5 w-5 text-destructive" />}
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Explanation */}
            {isAnswered && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mt-6 p-4 rounded-lg bg-muted"
              >
                <p className="text-sm font-medium mb-1">
                  {isCorrect ? "✓ Correct!" : "✗ Not quite"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {currentQuestion.explanation}
                </p>
              </motion.div>
            )}
          </Card>

          {/* Action Buttons */}
          <div className="mt-6 flex justify-end gap-3">
            {!isAnswered ? (
              <Button
                onClick={handleCheckAnswer}
                disabled={selectedAnswer === null || isLoading}
                size="lg"
                className="bg-gradient-primary hover:opacity-90"
              >
                {isPrevLesson ? "Review" : "Check"} Answer
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                size="lg"
                disabled={isLoading}
                className="group bg-gradient-primary hover:opacity-90 flex items-center"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Generating Flashcards...
                  </>
                ) : (
                  <>
                    {currentIndex < questions.length - 1 ? "Next Question" : "Complete Quiz"}
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </Button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
