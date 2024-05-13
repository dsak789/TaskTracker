from pydantic import BaseModel
from typing import Optional

class Task(BaseModel):
    id : Optional[int]
    userid: str
    title : str
    description : str
    status : str