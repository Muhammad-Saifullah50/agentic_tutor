import { generateExplanation, generateFlashcards, generateQuestions } from "../../../actions/data.actions";
import { FlowStage, StudyMode } from "../../../types";
import { ExplainView } from "../../../components/ExplainView";
import { QuizView } from "../../../components/QuizView";
import { ReviewView } from "../../../components/ReviewView";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

type LessonPageParams = {
    topic?: string;
    mode?: StudyMode;
    stage?: FlowStage;
    lesson_id?: string;
};

export default async function LessonPage({
    searchParams,
}: {
    searchParams: Promise<LessonPageParams>;
}) {
    const usableParams = await searchParams;
    const { isAuthenticated, redirectToSignIn } = await auth();

    if (!isAuthenticated) redirectToSignIn();

    const { topic, mode, stage, lesson_id } = usableParams;

    // ✅ 1. Validate params
    const validModes: StudyMode[] = ["beginner", "practice", "exam"];
    const validStages: FlowStage[] = ["explain", "quiz", "review"];

    const isValidMode = mode && validModes.includes(mode);
    const isValidStage = stage && validStages.includes(stage);
    const hasRequiredParams = topic && isValidMode && isValidStage && lesson_id;

    // ✅ 2. Handle missing or invalid params
    if (!hasRequiredParams) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-center p-6">
                <h2 className="text-2xl font-bold text-destructive mb-3">
                    Invalid or missing parameters
                </h2>
                <p className="text-muted-foreground mb-6">
                    Please make sure the URL includes valid <code>topic</code>,{" "}
                    <code>mode</code>, <code>stage</code>, and <code>lesson_id</code> query parameters.
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

    let explanation;
    let questions;
    let flashcards;

    switch (stage) {
        case "explain":
            explanation = await generateExplanation(topic!, mode!);
            break;
        case "quiz":
            questions = await generateQuestions(topic!, mode!);
            break;
        case "review":
            flashcards = await generateFlashcards(topic!, mode!);
            break;
    }

    if (stage === "explain" && explanation) {
        return (
            <ExplainView key="explain" topic={topic!} explanation={explanation} />
        );
    }

    if (stage === "quiz" && questions) {
        return <QuizView key="quiz" questions={questions} />;
    }

    if (stage === "review" && flashcards) {
        return <ReviewView key="review" flashcards={flashcards} />;
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center p-6">
            <h2 className="text-2xl font-bold text-destructive mb-3">
                Failed to load content
            </h2>
            <p className="text-muted-foreground mb-6">
                Something went wrong while generating your {stage} data. Please try again later.
            </p>
            <Link
                href="/"
                className="bg-primary text-white px-6 py-3 rounded-lg hover:opacity-90 transition"
            >
                Return Home
            </Link>
        </div>
    );
}
