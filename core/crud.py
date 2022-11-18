from sqlalchemy.orm import Session
from passlib.context import CryptContext
from core import models, schemas

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")        

def verify_password(plain, hashed):
    return pwd_context.verify(plain, hashed)

def hash_password(password):
    return pwd_context.hash(password)


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

def get_user_by_name(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()
    
def get_user_by_id(db:Session, username:str):
    return db.query(models.User).filter(models.User.id == username).first()

def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()

def create_asset(db:Session, asset: schemas.AssetBase, user_id : int):
    db_asset = models.Asset(**asset.dict(), user_id=user_id)

    if not get_user_by_id(db, user_id):
        return {'status_code': 400, 'detail':'User does not exist'}

    try:
        db.add(db_asset)
        db.commit()
        db.refresh(db_asset)
    except Exception as e:
        return {'status_code' : 400, 'detail':str(e)}

    return db_asset

def get_assets(db: Session, user_id: int, skip: int = 0, limit: int = 100):
    return db.query(models.Asset).filter(models.Asset.user_id == user_id).offset(skip).limit(limit).all()