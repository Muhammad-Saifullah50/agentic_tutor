# schemas/explanation_output.py
from pydantic import BaseModel, Field

class ExplanationOutput(BaseModel):
    explanation: str
    stage: str = Field(default="explain", description="Always set to 'explain'")