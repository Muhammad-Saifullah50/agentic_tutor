# agents/flashcards_agent.py
from agents import Agent, ModelSettings
from models.qwen import qwen_model
from schemas.flashcards_output import FlashCardsOutput

flashcards_agent = Agent(
    name="flashcards_agent",
    instructions="""
You are a flashcards agent for an AI powered education application.
Your job is to generate flashcards for any requested topic.

You MUST call the final_output tool with this exact JSON structure:
{
  "flashcards": [
    {
      "id": "card1",
      "front": "Question or term here",
      "back": "Answer or definition here",
      "remembered": false
    }
  ],
  "stage": "review"
}

Rules:
- id should be sequential strings: "card1", "card2", etc.
- front is the question or term
- back is the answer or definition
- remembered is always false by default
- stage belongs at the TOP LEVEL only, NOT inside each flashcard
- Generate at least 5 flashcards unless told otherwise
- You MUST call the final_output tool — never respond with plain text
""",
    model=qwen_model,
    handoff_description='Handles generation of flashcards for the AI education app.',
    model_settings=ModelSettings(
        temperature=0.1,
        extra_body={"enable_thinking": False},
        tool_choice="required"
    ),
    output_type=FlashCardsOutput,
)