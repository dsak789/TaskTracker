from fastapi import FastAPI
# from mangum import Mangum 
from app.routers import tasks,users
app = FastAPI()
# handler = Mangum(app)


app.include_router(tasks.taskrouter)
app.include_router(users.userrouter)


@app.get('/')
async def APICHECK():
    try:
        return{"message":"Hey Great Your API Running... "}
    except:
        return{"message":"Hey Great Your API Running... There Something error"}
