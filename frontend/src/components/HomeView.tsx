import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./../components/ui/button";
import { Input } from "./../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./../components/ui/select";
import { Brain, Sparkles, ArrowRight } from "lucide-react";
import { StudyMode } from "./../types";

interface HomeViewProps {
  onStart: (topic: string, mode: StudyMode) => void;
  currentMode: StudyMode;
  onModeChange: (mode: StudyMode) => void;
}

export function HomeView({ onStart, currentMode, onModeChange }: HomeViewProps) {
  const [topic, setTopic] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (topic.trim()) {

      onStart(topic.trim(), currentMode);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl"
      >
        {/* Hero Section */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="mb-6 flex justify-center"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-primary blur-2xl opacity-30 rounded-full" />
              <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-primary">
                <Brain className="h-12 w-12 text-primary-foreground" />
              </div>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent"
          >
            Study Mode
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-muted-foreground mb-8"
          >
            AI-powered learning through three simple steps:{" "}
            <span className="text-primary font-semibold">Explain</span>,{" "}
            <span className="text-accent font-semibold">Quiz</span>, and{" "}
            <span className="text-success font-semibold">Review</span>
          </motion.p>
        </div>

        {/* Input Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-primary blur-xl opacity-10 rounded-xl" />
              <div className="relative bg-card rounded-xl border-2 border-border shadow-card p-8">
                <label className="block text-sm font-medium mb-3 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  What do you want to learn today?
                </label>
                <Input
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g., Quantum Physics, Machine Learning, Ancient Rome..."
                  className="text-lg h-14 border-2 focus:border-primary"
                  autoFocus
                />
                
                <div className="mt-4">
                  <label className="block text-sm font-medium mb-2">
                    Study Mode
                  </label>
                  <Select value={currentMode} onValueChange={(value) => onModeChange(value as StudyMode)}>
                    <SelectTrigger className="w-full h-12 text-base">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="practice">Practice</SelectItem>
                      <SelectItem value="exam">Exam</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              disabled={!topic.trim()}
              size="lg"
              className="w-full h-14 text-lg group bg-gradient-primary hover:opacity-90 transition-opacity"
            >
              Start Learning
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </form>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-4 mt-12">
            {[
              {
                title: "1. Explain",
                description: "Get clear, tailored explanations",
                icon: "📖",
              },
              {
                title: "2. Quiz",
                description: "Test your understanding",
                icon: "✏️",
              },
              {
                title: "3. Review",
                description: "Master with spaced repetition",
                icon: "🎯",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="bg-card rounded-lg border p-6 text-center hover:shadow-card transition-shadow"
              >
                <div className="text-3xl mb-2">{feature.icon}</div>
                <h3 className="font-semibold mb-1">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
