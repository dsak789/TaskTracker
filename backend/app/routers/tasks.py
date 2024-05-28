from fastapi import APIRouter
from app.dbconfig import tasksCollection 
from app.models.taskModel import Task

# db = dbclient['tasks']
# app =FastAPI()

taskrouter = APIRouter()

@taskrouter.post("/addtask")
async def createTask(task : Task):
    try:
        result = await tasksCollection.insert_one(task.dict())
        return{
            "message":'Task Added Successfully '+str(result.inserted_id),
            
        }
    except Exception as ex:
        print(ex)
        return {
            'message':"Server Unreachable..!",
            'error':str(ex)
        }


@taskrouter.get('/tasks')
async def gettasks():
    try:
        res = tasksCollection.find()
        responses = [doc async for doc in res]
        for res in responses:
            res['_id'] = str(res['_id'])
        return{'message':"Data Recieved Successfully",'Tasks':responses}
    except Exception as ex:
        print(ex)
        return {
            'message':"Server Unreachable..!",
            'error':str(ex)
        }


@taskrouter.get('/tasks/{userid}')
async def tasks(userid : str ):
    try:
        res =  tasksCollection.aggregate([{'$match':{'userid':userid,'status':{'$in':['Todo','In Progress']}}},{'$sort':{'_id':-1}}])
        res = [task async for task in res]
        for task in res:
            task['_id'] = str(task['_id'])
        if res:
            return {"message": "Data Retrieved", "Tasks": res}
        else:
            return {"message": "No New tasks found (or) You have not added Any Task yet "}
    except Exception as ex:
        print(ex)
        return {"message": "An error occurred", "error": str(ex)}
    
@taskrouter.get('/completed-tasks/{userid}')
async def tasks(userid : str ):
    try:
        res =  tasksCollection.aggregate([{'$match':{'userid':userid,'status':'Completed'}},{'$sort':{'_id':-1}}])
        res = [task async for task in res]
        for task in res:
            task['_id'] = str(task['_id'])
        if res:
            return {"message": "Data Retrieved", "Tasks": res}
        else:
            return {"message": "No New tasks found (or) You have not added Any Task yet "}
    except Exception as ex:
        print(ex)
        return {"message": "An error occurred", "error": str(ex)}

@taskrouter.get('/archieved-tasks/{userid}')
async def tasks(userid : str ):
    try:
        res =  tasksCollection.aggregate([{'$match':{'userid':userid,'status':'Archieve'}},{'$sort':{'_id':-1}}])
        res = [task async for task in res]
        for task in res:
            task['_id'] = str(task['_id'])
        if res:
            return {"message": "Data Retrieved", "Tasks": res}
        else:
            return {"message": "No Archieved tasks found (or) You can archieve All Tasks "}
    except Exception as ex:
        print(ex)
        return {"message": "An error occurred", "error": str(ex)}

@taskrouter.put('/updatetask/{taskid}')
async def update_task(taskid:str, task :Task):
    try:
        res = await tasksCollection.update_one({'id':(taskid)},{"$set":task.dict()})
        if res.modified_count == 1:
            return{'message':"Task Updated"}
        else:
            return{'message':"Task not Updated"}
    except Exception as ex:
        print(ex)
        return {
            'message':"Server Unreachable..!",
            'error':str(ex)
        }
    
@taskrouter.get('/updatetask/{taskid}/{status}')
async def update_task(taskid:str, status :str):
    try:
        res = await tasksCollection.update_one({'id':(taskid)},{"$set":{'status':status}})
        if res.modified_count == 1:
            return{'message':"Task Updated"}
        else:
            return{'message':"Task not Updated"}
    except Exception as ex:
        print(ex)
        return {
            'message':"Server Unreachable..!",
            'error':str(ex)
        }
        
@taskrouter.get('/deletetask/{taskid}')
async def update_task(taskid:str):
    try:
        res = await tasksCollection.delete_one({'id':(taskid)})
        if res.deleted_count == 1:
            return{'message':"Task Deleted"}
        else:
            return{'message':"Task not Deleted"}
    except Exception as ex:
        print(ex)
        return {
            'message':"Server Unreachable..!",
            'error':str(ex)
        }
        

@taskrouter.delete('/deletetask/{taskid}')
async def delete_task(taskid: str):
    try:
        res = await tasksCollection.delete_many({'id':int(taskid)})
        if res.deleted_count == 1:
            return{'message':"Task Deleted"}
        else:
            return{'message':"Task not Deleted"}
    except Exception as ex:
        print(ex)
        return {
            'message':"Server Unreachable..!",
            'error':str(ex)
        }


@taskrouter.get('/drop')
async def drop():
    tasksCollection.drop()
