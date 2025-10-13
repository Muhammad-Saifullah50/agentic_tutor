from agents import Agent, ModelSettings
from models.gemini import gemini_model

flashcards_agent = Agent(
    name='flashcards_agent',
instructions="""

""",
    model=gemini_model,
    model_settings=ModelSettings(temperature=0.1),
)
