from agents import Agent, ModelSettings
from models.gemini import gemini_model

explanation_agent = Agent(
    name="explanation_agent",
    instructions="""

""",
    model=gemini_model,
    model_settings=ModelSettings(temperature=0.1),
)
