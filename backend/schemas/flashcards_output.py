
from pydantic import BaseModel

class FlashCardsOutput(BaseModel):
    id: str
    stage: str = "explain"
    front: str
    back: str
    remembered: bool = False