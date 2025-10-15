from agents import Agent, ModelSettings
from models.gemini import gemini_model
from schemas.flashcards_output import FlashCardsOutput

flashcards_agent = Agent(
    name='flashcards_agent',
instructions="""
You are a 'flashcards agent' for an AI powered education application. Your job is to generate flashcards for any requested topic. Set the stage field to flashcards and rest of the data accordsing to the schema provided.
""",
    model=gemini_model,
    model_settings=ModelSettings(temperature=0.1),
    output_type=FlashCardsOutput,
)
