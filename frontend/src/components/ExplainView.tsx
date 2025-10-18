'use client'
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./../components/ui/button";
import { ArrowRight, BookOpen, Loader2 } from "lucide-react"; // 👈 Added Loader2
import ReactMarkdown from "react-markdown";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { updateLessonWithExplanation } from "../actions/lesson.actions";

interface ExplainViewProps {
  topic: string;
  explanation: string;
  isPrevLesson?: boolean;
}

export function ExplainView({ topic, explanation, isPrevLesson }: ExplainViewProps) {
  const [isLoading, setIsLoading] = useState(false); // 👈 loading state
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { isSignedIn } = useAuth();

  const handleNext = async () => {
    try {
      setIsLoading(true); // 👈 start loading

      if (isPrevLesson) {
        router.push(`${pathname}?stage=quiz`);
        return;
      }

      const mode = searchParams.get("mode") || "beginner";
      const lessonId = searchParams.get("lesson_id") || "";
      if (!lessonId) {
        router.push("/");
        return;
      }

      if (isSignedIn) {
        await updateLessonWithExplanation(lessonId, explanation);
        router.push(
          `/lesson?topic=${encodeURIComponent(topic)}&mode=${mode}&stage=quiz&lesson_id=${lessonId}`
        );
      } else {
        router.push(`/sign-in`);
      }
    } catch (error) {
      console.error("Error navigating to next stage:", error);
    } finally {
      setIsLoading(false); // 👈 stop loading
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-7xl mx-auto"
    >
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
          <BookOpen className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h2 className="text-3xl font-bold capitalize">{topic}</h2>
          <p className="text-muted-foreground">Let's learn together</p>
        </div>
      </div>

      <div className="rounded-xl border bg-card p-8 shadow-card">
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <ReactMarkdown>{explanation}</ReactMarkdown>
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <Button
          onClick={handleNext}
          size="lg"
          disabled={isLoading} // 👈 disable while loading
          className="group bg-gradient-primary hover:opacity-90 transition-opacity flex items-center gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Generating quiz ...</span>
            </>
          ) : (
            <>
              Next: {isPrevLesson ? "Review Quiz" : "Quiz Me"}
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </>
          )}
        </Button>
      </div>
    </motion.div>
  );
}
