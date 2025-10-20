import {
    generateExplanation,
    generateFlashcards,
    generateQuestions,
} from "../../../actions/data.actions";
import { FlowStage, StudyMode } from "../../../types";
import { ExplainView } from "../../../components/ExplainView";
import { QuizView } from "../../../components/QuizView";
import { ReviewView } from "../../../components/ReviewView";
import { Suspense } from "react";
import { unstable_cache } from "next/cache";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { redirect } from "next/navigation";

type LessonContentProps = {
    topic: string;
    mode: StudyMode;
    stage: FlowStage;
};

type LessonPageParams = {
    topic?: string;
    mode?: StudyMode;
    stage?: FlowStage;
    lesson_id?: string;
};


// 🧠 STEP 1: Create cached wrappers for AI generation
// cache() prevents multiple runs within one request
// unstable_cache() adds persistent cache across requests


// OR use this simpler approach with dynamic keys:
const getExplanationCached = (topic: string, mode: StudyMode) => 
    unstable_cache(
        async () => generateExplanation(topic, mode),
        ['explanation', topic, mode], // unique cache key per topic/mode
        {
            tags: [`explanation`], // tag for bulk revalidation
            revalidate: 60 * 60,
        }
    )();

const getQuestionsCached = (topic: string, mode: StudyMode) =>
    unstable_cache(
        async () => generateQuestions(topic, mode),
        ['questions', topic, mode],
        {
            tags: ['questions'],
            revalidate: 60 * 60,
        }
    )();

const getFlashcardsCached = (topic: string, mode: StudyMode) =>
    unstable_cache(
        async () => generateFlashcards(topic, mode),
        ['flashcards', topic, mode],
        {
            tags: ['flashcards'],
            revalidate: 60 * 60,
        }
    )();

//
// 🧩 STEP 2: Async component to display the correct stage content
// Using cached functions ensures no double AI generation
//

export async function LessonContent({ topic, mode, stage }: LessonContentProps) {
    switch (stage) {
        case "explain": {
            const explanation = await getExplanationCached(topic, mode);
            return <ExplainView topic={topic} explanation={explanation} />;
        }
        case "quiz": {
            const questions = await getQuestionsCached(topic, mode);
            return <QuizView questions={questions} />;
        }
        case "review": {
            const flashcards = await getFlashcardsCached(topic, mode);
            return <ReviewView flashcards={flashcards} />;
        }
        default:
            return (
                <div className="text-center p-6 text-destructive">
                    Failed to load lesson content. Please try again.
                </div>
            );
    }
}

//
// 🎡 STEP 3: Suspense fallback loader
//

function ContentLoader() {
    return (
        <div className="flex flex-col items-center justify-center p-6 min-h-[50vh]">
            <Loader2 className="animate-spin h-8 w-8 text-primary" />
            <p className="mt-4 text-muted-foreground">
                AI is generating your next exercise ...
            </p>
        </div>
    );
}


// 🚀 STEP 4: Page entry point with validation and auth


export default async function LessonPage({
    searchParams,
}: {
    searchParams: LessonPageParams;
}) {
    const { topic, mode, stage } = await searchParams;
    const { userId } = await auth();

    // Authentication check
    if (!userId) return redirect("/sign-in");

    // Validate query params
    const validModes: StudyMode[] = ["beginner", "practice", "exam"];
    const validStages: FlowStage[] = ["explain", "quiz", "review"];

    const isValidMode = mode && validModes.includes(mode);
    const isValidStage = stage && validStages.includes(stage);

    if (!topic || !isValidMode || !isValidStage) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-center p-6">
                <h2 className="text-2xl font-bold text-destructive mb-3">
                    Invalid or missing parameters
                </h2>
                <p className="text-muted-foreground mb-6">
                    Please make sure the URL includes valid <code>topic</code>,{" "}
                    <code>mode</code>, and <code>stage</code> query parameters.
                </p>
                <Link
                    href="/"
                    className="bg-primary text-white px-6 py-3 rounded-lg hover:opacity-90 transition"
                >
                    Go Back Home
                </Link>
            </div>
        );
    }

    // Render the content (Suspense used safely with stable key)
    return (
        <div className="container mx-auto p-4">
            <Suspense key={`${topic}-${mode}-${stage}`} fallback={<ContentLoader />}>
                <LessonContent topic={topic} mode={mode} stage={stage} />
            </Suspense>
        </div>
    );
}
