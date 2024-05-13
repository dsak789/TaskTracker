from fastapi import APIRouter
from app.dbconfig import userCollection
from app.models.userModel import User


userrouter = APIRouter()

@userrouter.post('/adduser')
async def adduser(user : User):
    res = userCollection.insert_one(user.dict())
    if res.inserted_id is not None:
        return {'message':"New Registration Successfully with "+str(res.inserted_id) +"as ID"}

@userrouter.get('/getusers')
async def allusers():
    users = userCollection.find()
    users = [user async for user in users]
    for user in users:
        user['_id'] = str(['_id'])
    return {'message':"Users Data Retrieved",'Users':users}