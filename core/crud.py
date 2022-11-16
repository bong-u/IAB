from sqlalchemy.orm import Session
from fastapi import Depends
from passlib.context import CryptContext
from core import models, schemas

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")        

def verify_password(plain, hashed):
    return pwd_context.verify(plain, hashed)

def hash_password(password):
    return pwd_context.hash(password)

def get_user_by_name(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()

def create_user(db: Session, user: schemas.UserCreate):
    db_user = models.User(username=user.username, password=hash_password(user.password))
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def auth_user(db:Session, username: str, password: str):
    user = get_user_by_name (db, username)
    if not user or not verify_password(password, user.password):
        return False
    return user

def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()