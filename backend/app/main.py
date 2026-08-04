from fastapi import FastAPI

from app.database import Base, engine
import app.models

print("Registered tables:", Base.metadata.tables.keys())
Base.metadata.create_all(bind=engine)

app = FastAPI()


@app.get("/")
def root():
    return {"message": "Welcome to SAVIOUR API 🚀"}