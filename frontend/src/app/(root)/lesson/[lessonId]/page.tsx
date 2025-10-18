import { auth } from "@clerk/nextjs/server"
import { getLessonById } from "../../../../actions/lesson.actions"
import { ExplainView } from "../../../../components/ExplainView"
import { QuizView } from "../../../../components/QuizView"
import { ReviewView } from "../../../../components/ReviewView"

type LessonPageParams = Promise<{ lessonId?: string }>
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

  const { userId, redirectToSignIn } = await auth()

  // 🔒 Handle unauthenticated users
  if (!userId) {
    return redirectToSignIn()
  }

  // ⚠️ Handle missing or invalid lessonId
  if (!lessonId || typeof lessonId !== "string") {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-muted-foreground text-center">
          Invalid or missing lesson ID.
        </p>
      </div>
    )
  }

  const lesson = await getLessonById(lessonId)

  if (!lesson) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-muted-foreground text-center">
          Lesson not found.
        </p>
      </div>
    )
  }

  const validStages = ["explain", "quiz", "review"] as const
  if (!stage || !validStages.includes(stage)) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-muted-foreground text-center">
          Invalid or missing stage. Please select a valid stage.
        </p>
      </div>
    )
  }

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
