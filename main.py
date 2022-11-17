import uvicorn
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from decouple import config
from routers import router

isDebug = config('DEBUG', cast=bool)
app = FastAPI()

# app.mount('/build', StaticFiles(directory='frontend/public/build'), name='static')

app.include_router(router.router)
app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:3000'],
    allow_credentials=True,
    allow_methods=['*'],
)

@app.get('/')
def render(request: Request):
    return 'it works!'

if __name__ == '__main__':
    uvicorn.run('main:app', host='0.0.0.0', port=8001, reload=isDebug)