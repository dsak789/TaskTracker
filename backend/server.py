from fastapi import FastAPI
import uvicorn
from os import getenv
from mangum import Mangum 
from app.routers import tasks,users
app = FastAPI()
handler = Mangum(app)

app.include_router(tasks.taskrouter)
app.include_router(users.userrouter)


@app.get('/')
async def server():
    return{"message":"Hey Great Your API Running... "}

if __name__ == "__main__":
    port = int(getenv("PORT",8000)) or 8000
    uvicorn.run("server:app",host="0.0.0.0",port=port,reload=True) 