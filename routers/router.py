from fastapi import APIRouter, Depends, status, HTTPException
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from core import database, models, schemas, crud, auth
from typing import Union

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/login/")
models.Base.metadata.create_all(bind=database.engine)

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

router = APIRouter(prefix='')

@router.post("/login/", response_model=schemas.Token)
# async def login (user_info: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
async def login (user_info: schemas.UserCreate, db: Session = Depends(get_db)):
    print (user_info.password)
    user = crud.auth_user(db, user_info.username, user_info.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password"
        )
    access_token = auth.create_access_token(data={'sub': str(user.id)})
    
    return {'access_token': access_token, 'token_type': 'bearer'}

@router.post("/signup/", response_model=schemas.User)
def signup(user_info: schemas.UserCreate, db: Session = Depends(get_db)):
    user = crud.get_user_by_name(db=db, username=user_info.username)
    if user:
        raise HTTPException(status_code=400, detail="Username already registered")
        
    return crud.create_user(db, user=user_info)

@router.get("/users/")
def users(db: Session = Depends(get_db)):
# def users(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    return crud.get_users(db)
