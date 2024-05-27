from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
# from mangum import Mangum 
from app.routers import tasks,users


app = FastAPI()
# handler = Mangum(app)

#middleware cors
app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)



app.include_router(tasks.taskrouter)
app.include_router(users.userrouter)


@app.get('/')
async def APICHECK():
    try:
        print(f"Hey Great Your API Running... (Console Print)")
        return{"message":"Hey Great Your API Running... "}
    except Exception as e:
        print(f"Hey Great Your API Running... There Something error:{str(e)}")
        return{"message":f"Hey Great Your API Running... There Something error:{str(e)}"}
