# embeddings.py
import os
from dotenv import load_dotenv
from langchain_core.embeddings import Embeddings
from langchain_google_genai import GoogleGenerativeAIEmbeddings

load_dotenv()

_base = GoogleGenerativeAIEmbeddings(
    model="gemini-embedding-2",
    google_api_key=os.getenv("GEMINI_API_KEY"),
    output_dimensionality=768,
)


class PrefixedEmbeddings(Embeddings):

    def embed_documents(self, texts):
        return _base.embed_documents(
            [f"title: none | text: {t}" for t in texts]
        )

    def embed_query(self, text):
        return _base.embed_query(
            f"task: search result | query: {text}"
        )


embeddings = PrefixedEmbeddings()
