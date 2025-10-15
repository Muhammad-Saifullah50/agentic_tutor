from typing import List
from pydantic import BaseModel


class QuestionsOutput(BaseModel):
    id: str
    question: str
    options: List[str]
    correct_answer: int
    explanation: str