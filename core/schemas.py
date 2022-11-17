from pydantic import BaseModel, constr
from typing import List

class Asset(BaseModel):
    pass

class UserBase(BaseModel):
    username: constr(regex='^[a-z0-9_-]{3,16}$')

class UserCreate(UserBase):
    password: constr(regex='^.*(?=^.{8,}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%*^&+=]).*$')

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