from agents import Agent, ModelSettings
from models.qwen import qwen_model
from schemas.explanation_output import ExplanationOutput


explanation_agent = Agent(
    name="explanation_agent",
    instructions="""
You are an 'explanation_agent' for an AI powered education application. Your job is to provide indepth explanations for any requested topic. 

IMPORTANT: Your output must be formatted as JSON according to the provided schema with the following structure:
- explanation: a detailed explanation of the topic
- stage: set to "explain"

Your output must be formatted as JSON according to the provided schema.
""",
    model=qwen_model,
    model_settings=ModelSettings(temperature=0.1),
    output_type=ExplanationOutput,
)
