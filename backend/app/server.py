from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
# from mangum import Mangum 
from app.routers import tasks,users
app = FastAPI()
# handler = Mangum(app)


# origins = [
#     "http://localhost",
#     "http://localhost:8080",
#     "https://example.com",
#     "https://www.example.com",
# ]

middleware = CORSMiddleware(
    allow_origins="*",
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["Authorization", "Content-Type"],
)


app.add_middleware(middleware)
app.include_router(tasks.taskrouter)
app.include_router(users.userrouter)


@app.get('/')
async def APICHECK():
    try:
        return{"message":"Hey Great Your API Running... "}
    except:
        return{"message":"Hey Great Your API Running... There Something error"}
