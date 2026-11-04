
import os
from dotenv import load_dotenv
from pymongo import MongoClient
from langchain_mongodb import MongoDBAtlasVectorSearch
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from embeddings import embeddings

load_dotenv()

client = MongoClient(os.getenv("MONGODB_ATLAS_CLUSTER_URI"))

DB_NAME = "test_db"
COLLECTION_NAME = "test_collection"
INDEX_NAME = "test-index-1"

collection = client[DB_NAME][COLLECTION_NAME]

vector_store = MongoDBAtlasVectorSearch(
    collection=collection,
    embedding=embeddings,
    index_name=INDEX_NAME,
    relevance_score_fn="cosine",
)

question = "What is the capital city of Sabah?"

docs = vector_store.similarity_search(question, k=3)

context = "\n".join([doc.page_content for doc in docs])

prompt = ChatPromptTemplate.from_template("""
Answer the question using only the context below.

Context:
{context}

Question:
{question}
""")

llm = ChatGoogleGenerativeAI(
    model="gemini-3.6-flash",
    google_api_key=os.getenv("GEMINI_API_KEY"),
    temperature=0,
)

chain = prompt | llm

response = chain.invoke({
    "context": context,
    "question": question,
})

print("\nQuestion:", question)
print("\nAnswer:", response.content)

client.close()
