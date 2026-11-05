import os
from dotenv import load_dotenv
from langchain.agents import create_agent
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.agents.middleware import ModelFallbackMiddleware
from langchain_core.messages import HumanMessage

load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

# Menetapkan model utama dan model sandaran (fallback)
primary_llm = ChatGoogleGenerativeAI(model="gemini-3.5-pro", api_key=GEMINI_API_KEY)
fallback1 = ChatGoogleGenerativeAI(model="gemini-3.5-flash", api_key=GEMINI_API_KEY)
fallback2 = ChatGoogleGenerativeAI(model="gemini-3.5-flash-8b", api_key=GEMINI_API_KEY)

# Membina ejen dengan ModelFallbackMiddleware
agent = create_agent(
    model=primary_llm,
    middleware=[
        ModelFallbackMiddleware(
            fallback1,
            fallback2,
        )
    ],
    system_prompt="You are a helpful assistant."
)

response = agent.invoke(
    {"messages": [HumanMessage(content="Hello, how are you?")]},
)

print("Response:", response["messages"][-1].text)
# Menyemak model mana yang berjaya merespon
print("Model digunakan:", response["messages"][-1].response_metadata["model_name"])