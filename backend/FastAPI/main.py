from fastapi import FastAPI 

app = FastAPI()


@app.get('/')
async def vercelcheck():
    return "Vercel Api Deployed"