from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np

app = Flask(__name__)
CORS(app)

model = joblib.load('model.pkl')
scaler = joblib.load('scaler.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    X = np.array([[data['temperature'], data['humidity'], data['mq4'], data['mq135']]])
    X_scaled = scaler.transform(X)
    prediction = model.predict(X_scaled)[0]
    return jsonify({'status': prediction})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)