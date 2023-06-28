import concurrent.futures
from flask import Flask, request, jsonify
from rasa.core.agent import Agent
import asyncio

app = Flask(__name__)

model_path = '/models/20230620-190739-glossy-announcer.tar.gz'
agent = Agent.load(model_path)

executor = concurrent.futures.ThreadPoolExecutor()

@app.route('/chat', methods=['POST'])
def chat():
    try:
        message = request.json['message']
        bot_response = executor.submit(get_bot_response, message).result()
        response_data = {
            'response': bot_response
        }
        return jsonify(response_data)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

def get_bot_response(message):
    try:
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        response = loop.run_until_complete(agent.handle_text(message))
        return response[0]['text']
    except Exception as e:
        return str(e)

if __name__ == '__main__':
    app.run()
