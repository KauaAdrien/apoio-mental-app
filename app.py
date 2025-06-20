from flask import Flask, jsonify, request
from flask_cors import CORS
import datetime

app = Flask(__name__)
CORS(app)

# Dados simulados em memória
users_data = {}
diary_data = {}

@app.route('/')
def home():
    return jsonify({"message": "API funcionando com sucesso!"})

@app.route('/register-humor', methods=['POST'])
def register_humor():
    data = request.get_json()
    user_id = data.get('user_id')
    mood = data.get('mood')
    note = data.get('note')
    timestamp = datetime.datetime.utcnow().isoformat()

    if user_id not in users_data:
        users_data[user_id] = []

    users_data[user_id].append({
        'mood': mood,
        'note': note,
        'timestamp': timestamp
    })

    return jsonify({'message': 'Humor registrado com sucesso.'})

@app.route('/history-humor/<user_id>', methods=['GET'])
def history_humor(user_id):
    return jsonify(users_data.get(user_id, []))

@app.route('/diary', methods=['POST'])
def save_diary():
    data = request.get_json()
    user_id = data.get('user_id')
    text = data.get('text')
    timestamp = datetime.datetime.utcnow().isoformat()

    if user_id not in diary_data:
        diary_data[user_id] = []

    diary_data[user_id].append({
        'text': text,
        'timestamp': timestamp
    })

    return jsonify({'message': 'Entrada no diário salva com sucesso.'})

@app.route('/diary/<user_id>', methods=['GET'])
def get_diary(user_id):
    return jsonify(diary_data.get(user_id, []))

if __name__ == '__main__':
    app.run(debug=True)
