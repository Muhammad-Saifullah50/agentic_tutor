from agents import Agent
from models.gemini import gemini_model

questions_agent = Agent(
    name="questions_agent",
       instructions="""
""",
    model=gemini_model,
)
