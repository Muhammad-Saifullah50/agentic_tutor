from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

from agents import enable_verbose_stdout_logging,set_tracing_disabled 

from agents import Runner
from ai_agents.triage_agent import triage_agent

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    # Adjust the origins as needed for your frontend application
    allow_origins=["http://localhost:8080"], # add the vercel url
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
    topic = body.get("topic")
    mode = body.get('mode')
    step = body.get('step')

    # todo: send the mode

    enable_verbose_stdout_logging()
    set_tracing_disabled(True) 
    result = await Runner.run(
            triage_agent,
            input=topic,
        )
    
    return result.final_output