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



@taskrouter.get('/tasks/{userid}')
async def tasks(userid : str ):
    try:
        res =  tasksCollection.aggregate([{'$match':{'userid':userid}}])
        res = [task async for task in res]
        for task in res:
            task['_id'] = str(task['_id'])
        if res:
            return {"message": "Data Retrieved", "Tasks": res}
        else:
            return {"message": "No tasks found (or) You have not added Any Task yet "}
    except Exception as e:
        return {"message": "An error occurred", "error": str(e)}

@taskrouter.put('/updatetask/{taskid}')
async def update_task(taskid:int, task :Task):
    res = await tasksCollection.update_one({'id':(taskid)},{"$set":task.dict()})
    if res.modified_count == 1:
        return{'message':"Task Updated"}
    else:
        return{'message':"Task not Updated"}
@taskrouter.get('/updatetask/{taskid}/{status}')
async def update_task(taskid:int, status :str):
    res = await tasksCollection.update_one({'id':(taskid)},{"$set":{'status':status}})
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
