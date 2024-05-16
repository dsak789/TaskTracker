# from pymongo import MongoClient
# uri = "mongodb://localhost:27017/"
# client = MongoClient(uri)["tasktracker"]
# db_name = "tasktracker" 
# dbclient = client[db_name]


from motor.motor_asyncio import AsyncIOMotorClient

# Replace this with your MongoDB Atlas connection string
# Example: "mongodb+srv://<username>:<password>@<clustername>.mongodb.net/<dbname>?retryWrites=true&w=majority"
mongourl = "mongodb+srv://sbcreations:sbcreations@cluster0.ao6t0sl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

# Create an instance of AsyncIOMotorClient with the MongoDB Atlas connection string
mongodb = AsyncIOMotorClient(mongourl)
# mongodb = MongoClient(mongourl)

# Replace 'tasktracker' with your database name
client = mongodb['tasktracker']

# Access 'tasks' and 'users' collections
tasksCollection = client["tasks"]
userCollection = client['users']




# from motor.motor_asyncio import AsyncIOMotorClient

# mongourl = "mongodb://localhost:27017"
# mongodb = AsyncIOMotorClient(mongourl)
# client = mongodb['tasktracker']
# tasksCollection = client["tasks"]
# userCollection = client['users']