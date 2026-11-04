from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from pydantic import BaseModel
from example_5 import rag_chain

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "Diabetes RAG API is running!"}

@app.get("/ask")
def ask_question(question: str):
    response = rag_chain.invoke(question)
    return {
        "question": question,
        "answer": response
    }