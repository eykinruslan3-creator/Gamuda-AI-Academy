
import os
from dotenv import load_dotenv
from pymongo import MongoClient
from langchain_mongodb import MongoDBAtlasVectorSearch
from langchain_core.documents import Document
from langchain_text_splitters import CharacterTextSplitter
from embeddings import embeddings

load_dotenv()

MONGODB_URI = os.getenv("MONGODB_ATLAS_CLUSTER_URI")

client = MongoClient(MONGODB_URI)

DB_NAME = "test_db"
COLLECTION_NAME = "test_collection"
ATLAS_VECTOR_SEARCH_INDEX_NAME = "test-index-1"

MONGODB_COLLECTION = client[DB_NAME][COLLECTION_NAME]

vector_store = MongoDBAtlasVectorSearch(
    collection=MONGODB_COLLECTION,
    embedding=embeddings,
    index_name=ATLAS_VECTOR_SEARCH_INDEX_NAME,
    relevance_score_fn="cosine",
)

with open("facts.txt", "r", encoding="utf-8") as file:
    text = file.read()

documents = [Document(page_content=text)]

text_splitter = CharacterTextSplitter(
    separator="\n",
    chunk_size=200,
    chunk_overlap=20,
)

split_docs = text_splitter.split_documents(documents)

MONGODB_COLLECTION.delete_many({})

vector_store.add_documents(split_docs)

print("Documents successfully inserted!")

client.close()
