from datetime import datetime, timedelta
from decouple import config
from jose import JWTError, jwt

ALGORITHM = 'HS256'
ACCESS_TOKEN_EXPIRE_MINUTES = 30
ACCESS_TOKEN_REFRESH_MINUTES = 15
SECRET_KEY = config('SECRET_KEY')


def create_access_token(data: dict):
    to_encode = data.copy()
    expires_delta = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_REFRESH_MINUTES)
    
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    
    return encoded_jwt
