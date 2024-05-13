from fastapi import APIRouter
from app.dbconfig import userCollection
from app.models.userModel import User
from app.models.loginModel import Login


userrouter = APIRouter()


@userrouter.post('/login')
async def login(cred : Login):
    creds = cred.dict()
    # print(creds)
    res = await userCollection.find_one({'username':creds['username'],'password':creds['password']})
    if res:
        log = {"name":res['name'],'username':res['username'],'githubid':res['githubid']}
        return{"message":"Login Successfull",'user':log}

@userrouter.post('/adduser')
async def adduser(user : User):
    # print(user.dict())
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