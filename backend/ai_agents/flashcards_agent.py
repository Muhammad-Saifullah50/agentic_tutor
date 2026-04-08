from agents import Agent, ModelSettings
from models.qwen import qwen_model
from schemas.flashcards_output import FlashCardsOutput

flashcards_agent = Agent(
    name='flashcards_agent',
instructions="""
You are a 'flashcards agent' for an AI powered education application. Your job is to generate flashcards for any requested topic. 

IMPORTANT: Your output must be formatted as a JSON OBJECT with a 'flashcards' array inside it:
{
  "flashcards": [
    {
      "id": "card1",
      "front": "the question/term on the front of the card",
      "back": "the answer/definition on the back of the card",
      "stage": "review",
      "remembered": false
    }
  ],
  "stage": "review"
}

Each flashcard must have:
- id: a string identifier (e.g., "card1", "card2")
- front: the question/term on the front of the card
- back: the answer/definition on the back of the card
- stage: set to "review"
- remembered: defaults to false

Your output must be formatted as JSON according to the provided schema.
""",
    model=qwen_model,
    handoff_description='You will handle the generation of flashcards for the AI education app.',
    model_settings=ModelSettings(temperature=0.1),
    output_type=FlashCardsOutput,
)
