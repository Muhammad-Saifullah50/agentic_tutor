from agents import AsyncOpenAI, Runner, Agent,set_tracing_disabled,set_default_openai_api, set_default_openai_client
from dotenv import load_dotenv
import os

from tools.translation_tool import translation_tool

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")
base_url = os.getenv("GEMINI_BASE_URL")

if not api_key or not base_url:
    raise ValueError("GEMINI_API_KEY and GEMINI_BASE_URL must be set in the .env file")

set_tracing_disabled(disabled=True)
set_default_openai_api('chat_completions')

external_client: AsyncOpenAI = AsyncOpenAI(
    api_key=api_key,
    base_url=base_url,
)

set_default_openai_client(external_client)

agent: Agent = Agent(
    name='Tutor',
    model="gemini-2.5-flash",
    tools=[translation_tool]
)

result = Runner.run_sync(agent, "What is the capital of France?")
print(result.final_output)