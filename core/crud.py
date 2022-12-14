from sqlalchemy import subquery, select, extract
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
    
def get_user_by_id(db:Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()

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

def create_transaction(db:Session, item: schemas.TransactionBase):
    db_item = models.Transaction(**item.dict())

    try:
        db.add(db_item)
        db.commit()
        db.refresh(db_item)
    except Exception as e:
        return {'status_code' : 400, 'detail':str(e)}
    
    asset = db.query(models.Asset).filter(models.Asset.id == item.asset_id).first()

    try:
        if item.type == 0: balance = asset.balance - item.money
        else: balance = asset.balance + item.money

        setattr (asset, 'balance', balance)
        
        db.commit()
    except Exception as e:
        return {'status_code' : 400, 'detail':str(e)}

    return db_item

def delete_transaction(db:Session, item_id: int):
    
    db_item = db.query(models.Transaction).filter(models.Transaction.id == item_id).first()
    
    if not db_item:
        return {'code': 400, 'detail':'Item does not exist'}
    
    db.delete(db_item)
    db.commit()
    
    return db_item

def get_transactions_of_user(db:Session, user_id: int):
    subquery = db.query(models.Asset.id).filter(models.Asset.user_id == user_id).subquery()
    return {
        0: db.query(models.Transaction).filter(models.Transaction.type==0).filter(models.Transaction.asset_id.in_(select(subquery))).all(),
        1: db.query(models.Transaction).filter(models.Transaction.type==1).filter(models.Transaction.asset_id.in_(select(subquery))).all()
    }

def get_summary_data(db:Session, month, date, user_id: int):
    this_month = db.query(models.Transaction).filter(extract('month', models.Transaction.date)==month).all()
    this_day = db.query(models.Transaction).filter(extract('day', models.Transaction.date)==date).all()
    return [this_month, this_day]