from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import make_pipeline
import nltk
import re

# Flask application creation
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Necessary NLTK downloads
nltk.download('punkt')
nltk.download('stopwords')

def initialize():
    # Load the dataset
    global df
    df = pd.read_csv('code_data.csv')

    # Split features and target variables
    X = df['description']
    y = df['index']

    # Use TF-IDF vectorizer with Multinomial Naive Bayes model in a pipeline
    global model
    model = make_pipeline(TfidfVectorizer(), MultinomialNB())

    # Train the model
    model.fit(X, y)

def insert_parameters(code, params):
    for key, value in params.items():
        code = re.sub(f"\\b{key}\\b", value, code)
    return code

@app.route('/api/getCodeDataList', methods=['GET'])
def getCodeDataList():
    global df  # Ensure the DataFrame is in the global scope
    return jsonify(df.to_dict(orient='records'))

@app.route('/api/reload', methods=['GET'])
def reload():
    initialize()
    return jsonify({'status': 'Model reloaded successfully'})

@app.route('/api/getByIndex', methods=['POST'])
def getByIndex():
    data = request.get_json(force=True)
    index = data['index']
    params = data.get('params', {})
    result = df[df['index'] == index].to_dict(orient='records')
    if not result:
        return jsonify({'error': 'Predicted code not found'}), 404
    result=result[0]
    customized_code = insert_parameters(result["code"], params)
    result["code"]=customized_code
    return jsonify({'predictedCode': result})

@app.route('/api/predict', methods=['POST'])
def predict():
    global model  # Ensure the model is in the global scope
    data = request.get_json(force=True)
    description = data['description']
    params = data.get('params', {})
    predicted_index = model.predict([description])[0];
    result = df[df['index'] == predicted_index].to_dict(orient='records')
    if not result:
        return jsonify({'error': 'Predicted code not found'}), 404
    result=result[0]
    customized_code = insert_parameters(result["code"], params)
    result["code"]=customized_code
    return jsonify({'predictedCode': result})

if __name__ == '__main__':
    initialize()  # Initialize the model before starting the app
    app.run(debug=True)