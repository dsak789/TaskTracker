from fastapi import APIRouter
from app.dbconfig import userCollection
from app.models.userModel import User
from app.models.loginModel import Login
import bcrypt

userrouter = APIRouter()

def encryptpwd(pwd : str):
    salt = bcrypt.gensalt()
    hashed_pwd = bcrypt.hashpw(pwd.encode('utf-8'),salt)
    print(hashed_pwd.decode('utf-8'))
    return hashed_pwd.decode('utf-8')

def verifypwd(pwd : str, hashedpwd : str):
    verify = bcrypt.checkpw(pwd.encode('utf-8'),hashedpwd.encode('utf-8'))
    return verify


@userrouter.post('/login')
async def login(cred : Login):
    try:
        creds = cred.dict()
        # print(creds)
        res = await userCollection.find_one({'username':creds['username']})
        if res:
            if verifypwd(creds['password'],res['password']):
                log = {"name":res['name'],'username':res['username'],'githubid':res['githubid']}
                return{"message":"Login Successfull",'user':log}
    except Exception as ex:
        print(ex)
        return {
            'message':"Server Unreachable..!",
            'error':str(ex)
        }

@userrouter.post('/adduser')
async def adduser(user : User):
    try:
        # print(user.dict())
        res = userCollection.insert_one(user.dict())
        if res.inserted_id is not None:
            return {'message':"New Registration Successfully with "+str(res.inserted_id) +"as ID"}
    except Exception as ex:
        print(ex)
        return {
            'message':"Server Unreachable..!",
            'error':str(ex)
        }
    
@userrouter.get('/getusers')
async def allusers():
    try:
        users = userCollection.find()
        users = [user async for user in users]
        for user in users:
            user['_id'] = str(['_id'])
        return {'message':"Users Data Retrieved",'Users':users}
    except Exception as ex:
        print(ex)
        return {
            'message':"Server Unreachable..!",
            'error':str(ex)
        }