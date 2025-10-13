import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface ExplainViewProps {
  topic: string;
  explanation: string;
  onNext: () => void;
}

export function ExplainView({ topic, explanation, onNext }: ExplainViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-4xl mx-auto"
    >
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
          <BookOpen className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h2 className="text-3xl font-bold">{topic}</h2>
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
          onClick={onNext}
          size="lg"
          className="group bg-gradient-primary hover:opacity-90 transition-opacity"
        >
          Next: Quiz Me
          <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </motion.div>
  );
}
