from flask import Flask, request, jsonify
from flask_cors import CORS
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np
import io
from PIL import Image
import json

app = Flask(__name__)
CORS(app, resources={r"/predict/*": {"origins": ["https://greenfarmline.shop"]}})

# Load the trained model
MODEL_PATH = 'model/crop_disease_model.h5'
model = load_model(MODEL_PATH)

# Load recommendations from JSON file
with open('recommendations.json', 'r') as f:
    recommendations = json.load(f)

# Image preprocessing function
def prepare_image(img_file):
    img = Image.open(img_file)
    img = img.resize((128, 128))  # Match the input size of your model
    img = np.array(img)
    img = img / 255.0  # Rescale the image
    img = np.expand_dims(img, axis=0)  # Add batch dimension
    return img

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    try:
        # Prepare the image for prediction
        img = prepare_image(file)
        # Predict the class
        prediction = model.predict(img)
        class_idx = np.argmax(prediction, axis=1)
        
        # Get class labels (optional: load the labels if necessary)
        class_labels = ['Wheat leaf blight', 'Wheat mite', 'Yellow Rust Sugarcane', 'Wheat scab', 'Wilt', 'Wheat Stem fly', 'Wheat___Yellow_Rust', 'Wheat powdery mildew', 'Wheat black rust', 'Wheat aphid', 'RedRot sugarcane', 'RedRust sugarcane', 'thirps on  cotton', 'Sugarcane Healthy', 'Wheat Brown leaf Rust', 'Rice Blast', 'Tungro', 'red cotton bug', 'maize fall armyworm', 'Healthy Maize', 'Leaf Curl', 'Healthy cotton', 'pink bollworm in cotton', 'Leaf smut', 'maize ear rot', 'maize stem borer', 'Healthy Wheat', 'Mosaic sugarcane', 'bollworm on Cotton', 'cotton mealy bug', 'Gray_Leaf_Spot', 'bollrot on Cotton', 'Cotton Aphid', 'cotton whitefly', 'Flag Smut', 'Becterial Blight in Rice', 'Brownspot', 'Common_Rust', 'Anthracnose on Cotton', 'bacterial_blight in Cotton', 'American Bollworm on Cotton', 'Army worm']  # Replace with your actual class labels
        predicted_class = class_labels[class_idx[0]]
        disease_recommendations = recommendations.get(predicted_class, ["No specific recommendations available."])
        
        return jsonify({
            'prediction': predicted_class,
            'confidence': float(np.max(prediction)),  # Confidence level
            'recommendations': disease_recommendations
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host="0.0.0.0",port=5000,debug=True)
