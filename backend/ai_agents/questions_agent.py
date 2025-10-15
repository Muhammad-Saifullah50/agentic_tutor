from agents import Agent
from models.gemini import gemini_model
from schemas.questions_output import QuestionsOutput


questions_agent = Agent(
    name="questions_agent",
       instructions="""
You are a questions agent for an AI powered education application. Your job is to generate questions for any requested topic.
""",
    model=gemini_model,
    output_type=QuestionsOutput,
)
