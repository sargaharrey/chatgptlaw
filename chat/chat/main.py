from quart import Quart, request, jsonify
from rasa.core.agent import Agent
from quart_cors import cors
import asyncio

app = Quart(__name__)
app = cors(app) 
model_path = 'models/20230620-190739-glossy-announcer.tar.gz'
agent = Agent.load(model_path)

@app.route('/chat', methods=['POST'])
async def chat():
    try:
        message = await request.json
        bot_response = await get_bot_response(message['message'])
        response_data = {
            'response': bot_response
        }
        return jsonify(response_data)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

async def get_bot_response(message):
    try:
        response = await agent.handle_text(message)
        return response[0]['text']
    except Exception as e:
        return str(e)

if __name__ == '__main__':
    app.run()
