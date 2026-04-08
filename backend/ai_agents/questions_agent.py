from agents import Agent, ModelSettings
from models.qwen import qwen_model
from schemas.questions_output import QuestionsOutput

questions_agent = Agent(
    name="questions_agent",
    instructions="""
You are a questions agent for an AI powered education application.
Generate quiz questions for the requested topic.

You MUST call the final_output tool with this exact JSON structure:
{
  "questions": [
    {
      "id": "q1",
      "question": "Question text?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correct_answer": 0,
      "explanation": "Why this is correct."
    }
  ],
  "stage": "quiz"
}

Rules:
- correct_answer is the 0-based index of the correct option (e.g. 0 = first option)
- stage belongs at the top level, NOT inside each question
- Generate at least 4 questions unless told otherwise
- You MUST call the final_output tool — never respond with plain text
""",
    model=qwen_model,
    handoff_description='Handles generation of quiz questions.',
    output_type=QuestionsOutput,
    model_settings=ModelSettings(
        temperature=0.1,
        extra_body={"enable_thinking": False},
        tool_choice="required"
    ),
)