from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

from agents import enable_verbose_stdout_logging,set_tracing_disabled 

from agents import Runner
from ai_agents.triage_agent import triage_agent
import agentops
import os

from dotenv import load_dotenv
load_dotenv()


agentops_api_key = os.getenv('AGENTOPS_API_KEY')

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    # Adjust the origins as needed for your frontend application
    allow_origins=["http://localhost:3000", 'https://agentic-tutor-azure.vercel.app'], # add the vercel url
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
def root():
    return {"message": 'welcome fast api'}

@app.post('/send-message')
async def send_message(request: Request):
    body = await request.json()
    mode = body.get('mode')
    stage = body.get('stage')
    prompt = body.get('prompt')

    enable_verbose_stdout_logging()
    set_tracing_disabled(True) 

    agentops.init(agentops_api_key)

    result = await Runner.run(
            triage_agent,
            # dynamic prompt coming from the api request such as to explain, to generate questions or flashcards
            input=prompt,
            context=f'The user is on "{mode} mode and the learning stage is "{stage}".'
        )
    
    return result.final_output

    # have to implemenmt input filters while handing off