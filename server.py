from fastapi import FastAPI
from mangum import Mangum
from app.routers import tasks,users
app = FastAPI()
handler = Mangum(app)

app.include_router(tasks.taskrouter)
app.include_router(users.userrouter)



@app.get('/')
async def server():
    return{"message":"Hey Great Your API Running... "}
