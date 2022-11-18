from pydantic import BaseModel, constr
from typing import List

class AssetBase(BaseModel): 
    name : str
    type : int
    balance : int
    color : int

class Asset(AssetBase):
    id : int
    user_id : int
    class Config:
        orm_mode = True

class UserBase(BaseModel):
    username: constr(regex='^[a-z0-9_-]{3,16}$')

class UserCreate(UserBase):
    password: constr(regex='^.*(?=^.{8,16}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%*^&+=]).*$')

class User(UserBase):
    id: int
    assets: List[Asset] = []
    income_type: str
    expense_type: str

    class Config:
        orm_mode = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    id : int