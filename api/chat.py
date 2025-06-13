import json
import os
import google.generativeai as genai

genai.configure(api_key=os.environ.get("API_KEY"))

def handler(request):
    try:
        body = request.json()
        prompt = body.get("prompt", "")
        if not prompt:
            return {
                "statusCode": 400,
                "body": json.dumps({"error": "Prompt is required"})
            }

        response = genai.GenerativeModel("gemini-2.0-flash").generate_content(prompt)
        return {
            "statusCode": 200,
            "body": json.dumps({"reply": response.text})
        }
    except Exception as e:
        return {
            "statusCode": 500,
            "body": json.dumps({"error": str(e)})
        }
