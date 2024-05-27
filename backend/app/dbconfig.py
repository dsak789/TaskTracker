# from pymongo import MongoClient
# uri = "mongodb://localhost:27017/"
# client = MongoClient(uri)["tasktracker"]
# db_name = "tasktracker" 
# dbclient = client[db_name]


from motor.motor_asyncio import AsyncIOMotorClient

mongourl = "mongodb+srv://sbcreations:sbcreations@cluster0.ao6t0sl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

mongodb = AsyncIOMotorClient(mongourl)
# mongodb = MongoClient(mongourl)

client = mongodb['tasktracker']

tasksCollection = client["tasks"]
userCollection = client['users']




# from motor.motor_asyncio import AsyncIOMotorClient

# mongourl = "mongodb://localhost:27017"
# mongodb = AsyncIOMotorClient(mongourl)
# client = mongodb['tasktracker']
# tasksCollection = client["tasks"]
# userCollection = client['users']