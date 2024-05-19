from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow all origins, allow credentials, allow specific methods, allow specific headers
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Update with your specific origins if needed
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],  # Include OPTIONS for handling preflight requests
    allow_headers=["*"],  # Update with your specific headers if needed
)

import random
import time 

@app.post('/api/xts/start_app')
def demo(request:dict):
    print(request)
    time.sleep(2)
    val = random.choice(['Buy', 'Sell'])    
    return {'message':'Success', 'trade':val}

@app.get('/api/xts/logs/{process_id}')
def demo_1(process_id:int):
    print(process_id)
    val = random.choice(['Buy', 'Sell'])    
    return {'message':'Success', 'trade':val, 'logs':[f'{process_id}']}

if __name__=='__main__':
    import uvicorn
    uvicorn.run(app, host='localhost', port=8000)