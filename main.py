import uvicorn

from fastapi import FastAPI, Request
# from fastapi.middleware.cors import CORSMiddleware

# from decouple import config
# from backend.routers import rest

# isDebug = config('DEBUG', cast=bool)
isDebug = True

app = FastAPI()

# app.mount('/build', StaticFiles(directory='frontend/public/build'), name='static')
# app.include_router(rest.router)

@app.get('/')
def render(request: Request):
    return 'it works!'

if __name__ == '__main__':
    uvicorn.run('main:app', host='0.0.0.0', port=8001)