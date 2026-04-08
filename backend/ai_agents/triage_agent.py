from agents import Agent, ModelSettings
from models.qwen import qwen_model
from ai_agents.flashcards_agent import flashcards_agent
from ai_agents.questions_agent import questions_agent
from ai_agents.explanation_agent import explanation_agent

triage_agent = Agent(
    name="triage_agent",
    instructions="""
You are a triage agent for an AI education application.
Your ONLY job is to call the correct handoff tool. Never answer the user directly.

Routing rules — follow exactly:
- If learning_stage == "explain" → call transfer_to_explanation_agent
- If learning_stage == "quiz"    → call transfer_to_questions_agent
- If learning_stage == "review"  → call transfer_to_flashcards_agent

You MUST call one of these handoff tools. Do not respond with text.
""",
    model=qwen_model,
    handoffs=[explanation_agent, questions_agent, flashcards_agent],
    model_settings=ModelSettings(
        temperature=0.1,
        extra_body={"enable_thinking": False},
        tool_choice="required"
    ),
)