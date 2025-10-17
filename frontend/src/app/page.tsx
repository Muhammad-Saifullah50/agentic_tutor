import { StudyMode, FlowStage, StudySession } from "./../types";
import { Navbar } from "./../components/Navbar";
import { HomeView } from "./../components/HomeView";

import { AnimatePresence } from "framer-motion";
import { getStudySessionData } from "../actions/data.actions";


export default async function HomePage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {

  const usableParams = await searchParams 

  const topic = usableParams?.topic as string || "";
  const mode = usableParams?.mode as StudyMode || "beginner";
  const stage = usableParams?.stage as FlowStage || "home";

  let session: StudySession = {
    topic: "",
    mode: "beginner",
    stage: "home",
    explanation: undefined,
    questions: [],
    flashcards: [],
    progress: {
      questionsAnswered: 0,
      questionsCorrect: 0,
      flashcardsReviewed: 0,
      flashcardsRemembered: 0,
    }
  };

  if (topic && mode && stage && stage !== "home") {
    session = await getStudySessionData(topic, mode, stage) as StudySession;
  }

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
              initialMode={session.mode}
            />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

// have to add db syncing on every step
// 