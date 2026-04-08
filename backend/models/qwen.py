import os
from dotenv import load_dotenv
from agents import OpenAIChatCompletionsModel, RunConfig
from openai import AsyncOpenAI
load_dotenv()

base_url = os.getenv('QWEN_BASE_URL')
api_key = os.getenv('QWEN_API_KEY')
model_name = os.getenv('QWEN_MODEL_NAME', 'qwen-3.6')


if not base_url or not api_key:
    raise ValueError("QWEN_BASE_URL or QWEN_API_KEY environment variable is not set.")

external_client = AsyncOpenAI(
    api_key=api_key,
    base_url=base_url,

)

""""This is the model imported from this file"""

qwen_model = OpenAIChatCompletionsModel(
    model=model_name,
    openai_client=external_client,

)

config = RunConfig(
    model=qwen_model,
    model_provider=external_client,
    tracing_disabled=True,

)