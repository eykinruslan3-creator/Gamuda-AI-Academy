import os
from dotenv import load_dotenv
from langchain.agents import create_agent
from langchain_google_genai import ChatGoogleGenerativeAI
from langgraph.checkpoint.memory import InMemorySaver
from langchain.agents.middleware import SummarizationMiddleware
from langchain_core.messages import HumanMessage

load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

llm = ChatGoogleGenerativeAI(model="gemini-3.5-flash", api_key=GEMINI_API_KEY)

agent = create_agent(
    model=llm,
    checkpointer=InMemorySaver(),
    middleware=[
        SummarizationMiddleware(
            model=llm,
            trigger=("tokens", 100),
            keep=("messages", 1)
        )
    ],
    system_prompt="You are a helpful assistant."
)

config = {"configurable": {"thread_id": "1"}}

response = agent.invoke({"messages": [HumanMessage(content="Hello! Let's talk about space.")]}, config)
print("AI:", response["messages"][-1].text)