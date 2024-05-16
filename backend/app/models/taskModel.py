from pydantic import BaseModel

class Task(BaseModel):
    id : str
    userid: str
    title : str
    description : str
    status : str
    adddate : str