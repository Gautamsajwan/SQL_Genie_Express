from flask import Flask, request, jsonify, render_template
from transformers import T5ForConditionalGeneration, T5Tokenizer
import torch
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS

# Load the fine-tuned model
model_path = "./models/llm_model"
model = T5ForConditionalGeneration.from_pretrained(model_path)
tokenizer = T5Tokenizer.from_pretrained(model_path)

# Route for serving the HTML page
@app.route("/", methods=["GET"])
def home():
    return "hello world"

@app.route("/generate_sql", methods=["POST"])
def generate_sql():
    data = request.json
    input_text = data.get("text", "")

    if not input_text:
        return jsonify({"error": "Input text is required"}), 400

    inputs = tokenizer(input_text, return_tensors="pt")
    output = model.generate(**inputs, max_new_tokens=1000, decoder_start_token_id=tokenizer.pad_token_id)
    sql_query = tokenizer.decode(output[0], skip_special_tokens=True)

    return jsonify({
            "sql_query": sql_query
    })


if __name__ == '__main__':
    app.run(debug=True, port=5000)