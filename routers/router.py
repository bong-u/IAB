from fastapi import APIRouter, Depends, status, HTTPException
from sqlalchemy.orm import Session
from core import database, models, schemas, crud, auth
from typing import Dict, List
from jose import jwt, JWTError
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm

models.Base.metadata.create_all(bind=database.engine)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl='/login/')

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

router = APIRouter(prefix='')

async def get_current_user(token : str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail='Could not validate credentials',
        headers={'WWW-Authenticate': 'Bearer'},
    )
    try:
        payload = jwt.decode(token, auth.SECRET_KEY, algorithms=[auth.ALGORITHM])
        id : str = payload.get('sub')
        if id is None:
            raise credentials_exception
        token_data = schemas.TokenData(id=id)
        
    except JWTError:
        raise credentials_exception
        
    user = crud.get_user_by_id (db, token_data.id)
    if user is None:
        raise credentials_exception

    return user

@router.post('/login/', response_model=schemas.Token)
async def login (user_info: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = crud.auth_user(db, user_info.username, user_info.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='Incorrect username or password'
        )
    access_token = auth.create_access_token(data={'sub': str(user.id)})
    
    return {'access_token': access_token, 'token_type': 'bearer'}

@router.post('/signup/', response_model=schemas.User)
def signup(user_info: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = crud.get_user_by_name(db=db, username=user_info.username)
    if user:
        raise HTTPException(status_code=400, detail='Username already registered')
        
    return crud.create_user(db, user=user_info)

@router.get('/users/')
def users(user: schemas.User = Depends(get_current_user), db: Session = Depends(get_db)):
    return crud.get_users(db)

@router.get('/')
def get_data(month: int, date: int, user: schemas.User = Depends(get_current_user), db: Session = Depends(get_db)):
    payload = {
        'asset_list' : crud.get_assets(db, user_id=user.id),
        'category_list' : [user.expense_type.split(','), user.income_type.split(',')],
        'transactions' : crud.get_transactions_of_user(db, user_id=user.id),
        'summary_data' : crud.get_summary_data(db, month, date, user_id=user.id)
    }
    return payload

@router.post('/asset/', response_model=schemas.Asset)
def new_asset(asset: schemas.AssetBase, user: schemas.User = Depends(get_current_user), db: Session = Depends(get_db)):
    res = crud.create_asset(db, asset=asset, user_id=user.id)
    
    if not isinstance(res, models.Asset):
        raise HTTPException(status_code=res['status_code'], detail=res['detail'])
    
    return res

@router.get('/transaction/', response_model=Dict[int, List[schemas.Transaction]])
def get_transaction(user: schemas.User = Depends(get_current_user), db: Session = Depends(get_db)):
    res = crud.get_transactions_of_user(db, user_id = user.id)

    if not isinstance(res, dict):
        raise HTTPException(status_code=res['status_code'], detail=res['detail'])
    print (res)
    return res

@router.post('/transaction/', response_model=schemas.Transaction)
def new_transaction(item: schemas.TransactionBase, user: schemas.User = Depends(get_current_user), db: Session = Depends(get_db)):
    res = crud.create_transaction(db, item=item)

    if not isinstance(res, models.Transaction):
        raise HTTPException(status_code=res['status_code'], detail=res['detail'])
    
    return res

@router.delete('/transaction/', response_model=schemas.Transaction)
def delete_transaction(item_id: int, user: schemas.User = Depends(get_current_user), db: Session = Depends(get_db)):
    res = crud.delete_transaction(db, item_id=item_id)

    if not isinstance(res, models.Transaction):
        raise HTTPException(status_code=res['status_code'], detail=res['detail'])
    
    return res

@router.post('/category/', response_model=List)
def get_category(user: schemas.User = Depends(get_current_user), db: Session = Depends(get_db)):
    res = [user.expense_type, user.income_type]
    return res

# @router.post('/summary/', response_model=List[List[schemas.Transaction]])
# def get_summary_data(item: schemas.MonthDate, user: schemas.User = Depends(get_current_user), db: Session = Depends(get_db)):
#     res = crud.get_summary_data(db, item.month, item.date, user_id=user.id)
#     return res