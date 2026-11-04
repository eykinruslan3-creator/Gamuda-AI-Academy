import os
import requests
from dotenv import load_dotenv
from langchain.tools import tool
from langchain.agents import create_agent
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import HumanMessage

load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
llm = ChatGoogleGenerativeAI(model="gemini-3.5-flash", api_key=GEMINI_API_KEY)

@tool("exchange_rate_checker", description="Get the latest currency exchange rates from Frankfurter API.")
def get_exchange_rate(base: str = "USD", symbols: str = "MYR") -> str:
    """
    Mendapatkan kadar tukaran mata wang semasa daripada Frankfurter API.
    """
    try:
        url = f"https://api.frankfurter.app/latest?from={base}&to={symbols}"
        response = requests.get(url)
        data = response.json()
        return str(data)
    except Exception as e:
        return f"Error fetching exchange rate: {e}"

tools = [get_exchange_rate]

agent = create_agent(
    model=llm,
    tools=tools,
    system_prompt="You are a helpful assistant with access to currency exchange rate tools."
)

question = HumanMessage(content="What is the current exchange rate from US dollars to Malaysian Ringgit?")
response = agent.invoke({"messages": [question]})

final_message = response['messages'][-1]
print(final_message.text)