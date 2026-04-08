from agents import Agent
from models.qwen import qwen_model
from schemas.questions_output import QuestionsOutput


questions_agent = Agent(
    name="questions_agent",
    instructions="""
You are a questions agent for an AI powered education application. Your job is to generate questions for any requested topic. 

IMPORTANT: Your output must be formatted as JSON according to the provided schema with the following structure:
- id: a string identifier (e.g., "q1", "q2")
- question: the question text
- options: a list of answer options (strings)
- correct_answer: the INDEX (integer) of the correct answer (0-based, e.g., 0 for first option, 1 for second)
- explanation: a brief explanation of why the correct answer is correct
- stage: set to "quiz"

Your output must be formatted as JSON according to the provided schema.
""",
    model=qwen_model,
    handoff_description='You will handle the generation of questions for the AI education app.',
    output_type=QuestionsOutput,
)
