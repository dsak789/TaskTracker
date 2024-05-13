from fastapi import FastAPI
from app import dbconfig as dbclient
# from bson import ObjectId
from app.routers import tasks,users
app = FastAPI()

# db = dbclient.client["tasks"]

# res = db.insert_many([{"task":"someting5","description":"anything5"},{"task":"somthing6","description":"anything6"}])
# print("Data Inserted",res)
# print("#Records Inserted",res.inserted_ids)

app.include_router(tasks.taskrouter)
app.include_router(users.userrouter)



@app.get('/')
async def server():
    return{"message":"Hey Great Your API Running... "}
