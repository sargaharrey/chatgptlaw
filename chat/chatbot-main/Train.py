from flask import Flask, request, jsonify
from flask_cors import CORS
from rasa import train

app = Flask(__name__)
CORS(app) 

@app.route('/train', methods=['POST'])
def train_chatbot():
    try:

        training_data = request.json.get('training_data')

        if not training_data:
            return jsonify({'error': 'Training data is missing.'}), 400

        with open('data/nlu.md', 'w') as file:
            file.write(training_data)

 


        train(domain='domain.yml', config='config.yml', training_files='data', output='models')

        return 'Training finished.'
    except Exception as e:
        return jsonify({'error': str(e)}), 500
        

if __name__ == '__main__':
    app.run()
