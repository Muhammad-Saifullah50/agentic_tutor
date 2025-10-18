import { auth } from "@clerk/nextjs/server"
import { getLessonById } from "../../../../actions/lesson.actions"
import { ExplainView } from "../../../../components/ExplainView"
import { QuizView } from "../../../../components/QuizView"
import { ReviewView } from "../../../../components/ReviewView"

type LessonPageParams = Promise<{ lessonId: string }>
type LessonPageSearchParams = Promise<{ stage?: "review" | "quiz" | "explain" }>

const LessonPage = async ({
  params,
  searchParams,
}: {
  params: LessonPageParams
  searchParams: LessonPageSearchParams
}) => {

  const { lessonId } = await params
  const { stage } = await searchParams

  const { userId } = await auth()

  if (!userId) return null

  const lesson = await getLessonById(lessonId)
  if (!lesson) return null

  switch (stage) {
    case "explain":
      return (
        <ExplainView
          key="explain"
          topic={lesson.topic}
          explanation={lesson.explanation}
          isPrevLesson
        />
      )
    case "quiz":
      return (
        <QuizView
          key="quiz"
          questions={lesson.questions}
          isPrevLesson
        />
      )
    case "review":
      return (
        <ReviewView
          key="review"
          flashcards={lesson.flashcards}
          isPrevLesson
        />
      )
    default:
      return null
  }
}

export default LessonPage
