import { generateExplanation, generateFlashcards, generateQuestions } from "../../../actions/data.actions"
import { FlowStage, StudyMode } from "../../../types"
import { ExplainView } from "../../../components/ExplainView"
import { QuizView } from "../../../components/QuizView"
import { ReviewView } from "../../../components/ReviewView"
import { auth } from "@clerk/nextjs/server"

type LessonPageParams = {
    topic: string
    mode: StudyMode
    stage: FlowStage
    lesson_id: string
}
const LessonPage = async ({ searchParams }: { searchParams: Promise<LessonPageParams> }) => {

    const usableParams: LessonPageParams = await searchParams
    
    const {isAuthenticated, redirectToSignIn} =await auth();

    if (!isAuthenticated) redirectToSignIn();

    let explanation;
    let questions;
    let flashcards;


    switch (usableParams.stage) {
        case "explain":
            explanation = await generateExplanation(usableParams.topic, usableParams.mode)
            break;
        case "quiz":
            questions = await generateQuestions(usableParams.topic, usableParams.mode)
            break;
        case "review":
            flashcards = await generateFlashcards(usableParams.topic, usableParams.mode)
            break;
        default:
            break;

    }

    if (usableParams.stage === "explain" && explanation) {
        return (
            <ExplainView
                key="explain"
                topic={usableParams.topic}
                explanation={explanation}
            />
        )
    }

    if (usableParams.stage === "quiz" && questions) {
        return (
            <QuizView
                key="quiz"
                questions={questions}
            />
        )
    }

    if (usableParams.stage === "review" && flashcards) {
        return (
            <ReviewView
                key="review"
                flashcards={flashcards}
              
            />
        )
    }
}

export default LessonPage