from flask import Flask, request, jsonify
from flask_cors import CORS
import datetime

app = Flask(__name__)
CORS(app)

# Banco de dados em memória (mock)
users_data = {}
support_centers = [
    {"name": "CVV", "phone": "188", "location": "Nacional"},
    {"name": "CAPS Centro", "phone": "(11) 1234-5678", "location": "São Paulo - SP"},
]

@app.route('/')
def index():
    return jsonify({"message": "API de Apoio à Saúde Mental ativa"})

@app.route('/register-humor', methods=['POST'])
def register_humor():
    data = request.json
    user_id = data.get('user_id')
    mood = data.get('mood')
    note = data.get('note')
    timestamp = datetime.datetime.now().isoformat()

    if user_id not in users_data:
        users_data[user_id] = {'humor': [], 'emergency_contacts': []}

    users_data[user_id]['humor'].append({
        'mood': mood,
        'note': note,
        'timestamp': timestamp
    })

    return jsonify({"message": "Humor registrado com sucesso."})

@app.route('/history-humor/<user_id>', methods=['GET'])
def history_humor(user_id):
    data = users_data.get(user_id, {}).get('humor', [])
    return jsonify(data)

@app.route('/support-centers', methods=['GET'])
def get_support_centers():
    return jsonify(support_centers)

@app.route('/emergency-contact', methods=['POST'])
def add_emergency_contact():
    data = request.json
    user_id = data.get('user_id')
    name = data.get('name')
    phone = data.get('phone')

    if user_id not in users_data:
        users_data[user_id] = {'humor': [], 'emergency_contacts': []}

    users_data[user_id]['emergency_contacts'].append({
        'name': name,
        'phone': phone
    })

    return jsonify({"message": "Contato adicionado com sucesso."})

@app.route('/emergency-contact/<user_id>', methods=['GET'])
def get_emergency_contacts(user_id):
    contacts = users_data.get(user_id, {}).get('emergency_contacts', [])
    return jsonify(contacts)

if __name__ == '__main__':
    app.run(debug=True)

# Diário
@app.route('/diary', methods=['POST'])
def add_diary():
    data = request.json
    user_id = data.get('user_id')
    text = data.get('text')
    timestamp = datetime.datetime.now().isoformat()

    if not user_id or not text:
        return jsonify({"error": "Dados inválidos"}), 400

    if user_id not in users_data:
        users_data[user_id] = {'humor': [], 'emergency_contacts': [], 'diary': []}

    users_data[user_id]['diary'].append({
        'text': text,
        'timestamp': timestamp
    })

    return jsonify({"message": "Diário registrado com sucesso."})


@app.route('/diary/<user_id>', methods=['GET'])
def get_diary(user_id):
    diary = users_data.get(user_id, {}).get('diary', [])
    return jsonify(diary)

