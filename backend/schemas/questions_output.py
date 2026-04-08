# schemas/questions_output.py
from typing import List
from pydantic import BaseModel, Field


class QuestionOutput(BaseModel):
    id: str
    question: str
    options: List[str]
    correct_answer: int = Field(description="0-based index of the correct option in the options list")
    explanation: str


class QuestionsOutput(BaseModel):
    questions: List[QuestionOutput]
    stage: str = Field(default="quiz", description="Always set to 'quiz'")