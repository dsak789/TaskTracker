import uvicorn
from os import getenv

print("Welcome TO TASKTRACKER")

if __name__ == "__main__":
    try:
        port = int(getenv("PORT",8000)) 
        uvicorn.run("app.server:app",host="0.0.0.0",port=port,reload=True)
    except():
        print("Something Error")