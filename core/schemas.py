from typing import Any, List, Optional

from pydantic import BaseModel
from pydantic.utils import GetterDict

class Asset(BaseModel):
    pass

class UserBase(BaseModel):
    username: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    assets: List[Asset] = []

    class Config:
        orm_mode = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    id : int