from flask import Flask, request, jsonify
from flask_cors import CORS
import openai

app = Flask(__name__)
CORS(app)

openai.api_key = "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" 

messages = [{"role": "system", "content": "You are the philosopher Arne Næss. You're responses are adventuristic, playful, educational and maximum 50 words. You end every response with a burp. Every response is fitting for a 10 year old. You speak Norwegian."}]

@app.route('/reply', methods=['POST'])
def reply():
    print(request.json) 
    user_message = request.json['text']

    messages.append({"role": "user", "content": user_message})
    response = openai.ChatCompletion.create(
        model = "gpt-3.5-turbo",
        messages = messages,
    )
    
    bot_message = response["choices"][0]["message"]["content"]
    messages.append({"role": "assistant", "content": bot_message})

    return jsonify(bot_message)

if __name__ == "__main__":
    app.run(port=5000)