
import os, base64
from fastapi import FastAPI, File, UploadFile, HTTPException
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from dotenv import load_dotenv
from typing import Dict

load_dotenv()

llm = ChatGoogleGenerativeAI(
    model="gemini-2.5-flash",
    api_key=os.getenv("GEMINI_API_KEY")
)

app = FastAPI()

def encode_image(image_content: bytes) -> str:
    return base64.b64encode(image_content).decode()


@app.post("/analyze-image")
async def analyze_image(file: UploadFile = File(...)) -> Dict[str, str]:

    if not file.content_type or file.content_type not in ["image/jpeg", "image/png"]:
        raise HTTPException(
            status_code=400,
            detail="Invalid or missing file type. Only JPEG and PNG are allowed."
        )

    contents = await file.read()

    if len(contents) > 10_000_000:
        raise HTTPException(
            status_code=400,
            detail="File too large. Maximum size is 10MB."
        )

    image = encode_image(contents)
    image = encode_image(contents)
    
    prompt = ChatPromptTemplate.from_messages([
        (
            "system",
            "You are a nutrition expert capable of analyzing food images and providing detailed nutritional advice."
        ),
        (
            "human",
            [
                {
                    "type": "text",
                    "text": """Analyze the image and provide a comprehensive nutritional breakdown and health advice. Follow these steps:

1. FOOD IDENTIFICATION
- Identify all food items visible in the image.
- Estimate the portion sizes.
- Note visible ingredients.

2. NUTRITIONAL BREAKDOWN
- Calories
- Total Fat
- Saturated Fat
- Carbohydrates
- Protein
- Vitamins and Minerals

3. HEALTH ASSESSMENT
- Evaluate the healthiness of the meal.
- Identify health benefits and concerns.

4. RECOMMENDATIONS
- Suggest healthier improvements.
- Recommend complementary foods.
- Provide portion control advice.

If the image does not contain food or a nutritional label, inform the user and stop the analysis.

Present nutritional estimates clearly.
"""
                },
                {
                    "type": "image_url",
                    "image_url": {
                        "url": f"data:{file.content_type};base64,{image}"
                    }
                }
            ]
        )
    ])

    try:
        chain = prompt | llm | StrOutputParser()

        res = await chain.ainvoke({})

        return {"analysis": res}

    except Exception as e:
        print(f"Error: {e}")

        raise HTTPException(
            status_code=500,
            detail="An error occurred while analyzing the image."
        )
