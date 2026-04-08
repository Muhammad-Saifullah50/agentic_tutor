from agents import Agent, ModelSettings
from models.qwen import qwen_model
from schemas.explanation_output import ExplanationOutput

explanation_agent = Agent(
    name="explanation_agent",
    instructions="""
You are an explanation agent for an AI powered education application.
Your job is to provide in-depth explanations for any requested topic.

You MUST call the final_output tool with this exact JSON structure:
{
  "explanation": "Your detailed explanation here...",
  "stage": "explain"
}

Rules:
- explanation should be thorough and easy to understand
- stage is always "explain" at the top level
- You MUST call the final_output tool — never respond with plain text
""",
    model=qwen_model,
    handoff_description='Handles in-depth explanations of topics.',
    model_settings=ModelSettings(
        temperature=0.1,
        extra_body={"enable_thinking": False},
        tool_choice="required"
    ),
    output_type=ExplanationOutput,
)