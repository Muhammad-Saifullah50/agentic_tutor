from agents import Agent
from models.gemini import gemini_model
from backend.ai_agents.flashcards_agent import flashcards_agent
from backend.ai_agents.questions_agent import questions_agent
from backend.ai_agents.explanation_agent import explanation_agent

triage_agent = Agent(
    name="triage_agent",
    instructions="""
""",
    model=gemini_model,
    handoffs=[explanation_agent, questions_agent, flashcards_agent],
)
