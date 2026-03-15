# This project uses facebook/bart-large-cnn
# Licensed under the MIT License


import os
import time
from dotenv import load_dotenv
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from model import summarize_text

load_dotenv()

app = Flask(__name__)
app.config['TEMPLATES_AUTO_RELOAD'] = True

CORS(app, origins=["http://localhost:5000"])

limiter = Limiter(
    get_remote_address,
    app=app,
    storage_uri="memory://"
)

@app.route('/')
def index():
    return render_template('frontend.html', time=int(time.time()))

@app.route('/summarize', methods=['POST'])
@limiter.limit("10 per minute")
def summarize():
    if not request.is_json:
        return jsonify({"error": "Invalid request format"}), 400
    data = request.get_json()
    if "text" not in data:
        return jsonify({"error": "Invalid request format"}), 400
    text = data.get("text", "").strip()
    if not text:
        return jsonify({"error": "Invalid request format"}), 400
    word_count=len(text.split())
    if word_count>800:
        return jsonify({"error": "Input too large"}), 400
    try:
        summary = summarize_text(text)
        return jsonify({"summary": summary})
    except Exception as e:
        print("ERROR:", e)
        return jsonify({"error": "Processing failed"}), 500

if __name__ == "__main__":
    app.run(debug=True)