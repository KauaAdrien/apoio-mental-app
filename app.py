from flask import Flask, jsonify, request
from flask_cors import CORS
import datetime

app = Flask(__name__)
CORS(app)

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

@app.route('/support-centers', methods=['GET'])
def support_centers():
    centers = [
        {
            'name': 'CAPS II Centro Manaus',
            'phone': '(92) 3622-1234',
            'location': 'Av. Joaquim Nabuco, 1000 - Centro, Manaus - AM'
        },
        {
            'name': 'CAPS AD Manaus',
            'phone': '(92) 3622-5678',
            'location': 'Rua Major Gabriel, 200 - Centro, Manaus - AM'
        },
        {
            'name': 'CAPS Infantil Manaus',
            'phone': '(92) 3622-9101',
            'location': 'Rua 24 de Maio, 300 - Centro, Manaus - AM'
        },
        {
            'name': 'Centro de Atenção Psicossocial Família Manaus',
            'phone': '(92) 3622-2345',
            'location': 'Av. Sete de Setembro, 450 - Centro, Manaus - AM'
        },
        {
            'name': 'CAPS III Manaus',
            'phone': '(92) 3622-3456',
            'location': 'Rua Visconde de Mauá, 700 - Centro, Manaus - AM'
        },
        {
            'name': 'CAPS AD II Zona Leste',
            'phone': '(92) 3210-6789',
            'location': 'Rua Rio Jutaí, 150 - Zona Leste, Manaus - AM'
        },
        {
            'name': 'CAPS AD III Zona Norte',
            'phone': '(92) 3210-1234',
            'location': 'Av. Autaz Mirim, 850 - Zona Norte, Manaus - AM'
        }
    ]
    return jsonify(centers)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)


# from flask import Flask, jsonify, request
# from flask_cors import CORS
# import datetime

# app = Flask(__name__)
# CORS(app)

# # Dados simulados em memória
# users_data = {}
# diary_data = {}

# @app.route('/')
# def home():
#     return jsonify({"message": "API funcionando com sucesso!"})

# @app.route('/register-humor', methods=['POST'])
# def register_humor():
#     data = request.get_json()
#     user_id = data.get('user_id')
#     mood = data.get('mood')
#     note = data.get('note')
#     timestamp = datetime.datetime.utcnow().isoformat()

#     if user_id not in users_data:
#         users_data[user_id] = []

#     users_data[user_id].append({
#         'mood': mood,
#         'note': note,
#         'timestamp': timestamp
#     })

#     return jsonify({'message': 'Humor registrado com sucesso.'})

# @app.route('/history-humor/<user_id>', methods=['GET'])
# def history_humor(user_id):
#     return jsonify(users_data.get(user_id, []))

# @app.route('/diary', methods=['POST'])
# def save_diary():
#     data = request.get_json()
#     user_id = data.get('user_id')
#     text = data.get('text')
#     timestamp = datetime.datetime.utcnow().isoformat()

#     if user_id not in diary_data:
#         diary_data[user_id] = []

#     diary_data[user_id].append({
#         'text': text,
#         'timestamp': timestamp
#     })

#     return jsonify({'message': 'Entrada no diário salva com sucesso.'})

# @app.route('/diary/<user_id>', methods=['GET'])
# def get_diary(user_id):
#     return jsonify(diary_data.get(user_id, []))

# if __name__ == '__main__':
#     app.run(debug=True)
