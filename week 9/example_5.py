# example_5.py: Ask questions about diabetes.pdf

import os
from dotenv import load_dotenv
from pymongo import MongoClient

from langchain_mongodb import MongoDBAtlasVectorSearch
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables import RunnablePassthrough
from langchain_core.output_parsers import StrOutputParser

from embeddings import embeddings

# Load environment variables
load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
MONGODB_URI = os.getenv("MONGODB_ATLAS_CLUSTER_URI")

# MongoDB settings
DB_NAME = "test_db"
COLLECTION_NAME = "test_collection_pdf"
ATLAS_VECTOR_SEARCH_INDEX_NAME = "test-index-pdf"

# Connect to MongoDB
client = MongoClient(MONGODB_URI)
MONGODB_COLLECTION = client[DB_NAME][COLLECTION_NAME]

# Initialize the LLM
llm = ChatGoogleGenerativeAI(
    model="gemini-3.6-flash",
    google_api_key=GEMINI_API_KEY,
    temperature=0
)

# Initialize vector store
vector_store = MongoDBAtlasVectorSearch(
    collection=MONGODB_COLLECTION,
    embedding=embeddings,
    index_name=ATLAS_VECTOR_SEARCH_INDEX_NAME,
    relevance_score_fn="cosine"
)

# Create retriever
retriever = vector_store.as_retriever(
    search_kwargs={"k": 10}
)

# Define system prompt
system_prompt = """
You are a helpful AI assistant.
Answer the user's question using only the provided context.
If the answer is not available in the context, say that you do not have enough information.

Context:
{context}
"""

prompt = ChatPromptTemplate.from_messages([
    ("system", system_prompt),
    ("human", "{input}")
])

# Format retrieved documents
def format_docs(docs):
    return "\n\n".join(doc.page_content for doc in docs)

# Build RAG chain
rag_chain = (
    {
        "context": retriever | format_docs,
        "input": RunnablePassthrough()
    }
    | prompt
    | llm
    | StrOutputParser()
)

# Execute query
print("Querying Vector DB ...")

response = rag_chain.invoke(
    "What medications are used to treat diabetes?"
)

print(f"\nAI Response: {response}")