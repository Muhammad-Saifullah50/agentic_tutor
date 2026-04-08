# schemas/flashcards_output.py
from pydantic import BaseModel, Field
from typing import List

class FlashCardOutput(BaseModel):
    id: str
    front: str
    back: str
    remembered: bool = Field(default=False, description="Always false by default")

class FlashCardsOutput(BaseModel):
    flashcards: List[FlashCardOutput]
    stage: str = Field(default="review", description="Always set to 'review'")