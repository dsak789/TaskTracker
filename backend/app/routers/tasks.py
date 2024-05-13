from fastapi import APIRouter
from app.dbconfig import tasksCollection 
from app.models.taskModel import Task

# db = dbclient['tasks']
# app =FastAPI()

taskrouter = APIRouter()

@taskrouter.post("/addtask")
async def createTask(task : Task):
    result = await tasksCollection.insert_one(task.dict())
    return{
        "message":'Task Added Successfully '+str(result.inserted_id),
        
    }


@taskrouter.get('/tasks')
async def gettasks():
    res = tasksCollection.find()
    responses = [doc async for doc in res]
    for res in responses:
        res['_id'] = str(res['_id'])
    return{'message':"Data Recieved Successfully",'Tasks':responses}



@taskrouter.get('/tasksagg')
async def tasks():
    try:
        cursor = list(tasksCollection.aggregate([{'$match':{'task':'someting5'}},{'$project':{'_id':0}}]))
        if tasks:
            return {"message": "Data Retrieved", "Tasks": cursor}
        else:
            return {"message": "No tasks found with the given criteria"}
    except Exception as e:
        return {"message": "An error occurred", "error": str(e)}

@taskrouter.put('/updatetask/{taskid}')
async def update_task(taskid:str, task :Task):
    res = await tasksCollection.update_one({'id':int(taskid)},{"$set":task.dict()})
    if res.modified_count == 1:
        return{'message':"Task Updated"}
    else:
        return{'message':"Task not Updated"}
        

@taskrouter.delete('/deletetask/{taskid}')
async def delete_task(taskid: str):
    res = await tasksCollection.delete_many({'id':int(taskid)})
    if res.deleted_count == 1:
        return{'message':"Task Deleted"}
    else:
        return{'message':"Task not Deleted"}


@taskrouter.get('/drop')
async def drop():
    tasksCollection.drop()
