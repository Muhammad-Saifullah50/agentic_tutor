import { getStudySessionData } from "../../actions/data.actions"
import { FlowStage, StudyMode } from "../../types"
import { ExplainView } from "../../components/ExplainView"
import { QuizView } from "../../components/QuizView"
import { ReviewView } from "../../components/ReviewView"

type LessonPageParams = {
    topic: string
    mode: StudyMode
    stage: FlowStage
}
const LessonPage = async ({ searchParams }: { searchParams: Promise<LessonPageParams> }) => {

    const usableParams: LessonPageParams = await searchParams


    const studyData = await getStudySessionData(usableParams.topic, usableParams.mode, usableParams.stage)

    if (studyData.stage === "explain" && studyData.explanation) {
        return (
            <ExplainView
                key="explain"
                topic={studyData.topic}
                explanation={studyData.explanation}
            />
        )
    }

    if (studyData.stage === "quiz") {
        return (
            <QuizView
                key="quiz"
                questions={studyData.questions}
            />
        )
    }

    if (studyData.stage === "review") {
        return (
            <ReviewView
                key="review"
                flashcards={studyData.flashcards}
                cardsRemembered={studyData.progress.flashcardsRemembered}
                cardsTotal={studyData.flashcards.length}
            />
        )
    }
}

export default LessonPage