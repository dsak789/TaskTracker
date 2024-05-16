from pydantic import BaseModel
from typing import Optional


class User(BaseModel):
    id : Optional[int]
    name : str
    email : str
    githubid : str
    username : str
    password : str