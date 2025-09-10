import os
import cv2
import numpy as np
import tensorflow as tf
from flask import Flask, request, jsonify
from flask_cors import CORS


model = tf.keras.models.load_model("signature_model.keras")
# Load model (try .h5 first)
# model = tf.keras.models.load_model("signature_model.h5", compile=False)


app = Flask(__name__)
CORS(app)
 
UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

def preprocess_image(image_path):
    img = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
    if img is None:
        return None
    img = cv2.resize(img, (128, 128))
    img = np.stack([img] * 3, axis=-1)  
    img = img / 255.0
    return np.expand_dims(img, axis=0)


@app.route("/verify", methods=["POST"])
def verify_signature():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    file_path = os.path.join(app.config["UPLOAD_FOLDER"], file.filename)
    file.save(file_path)

    image = preprocess_image(file_path)
    if image is None:
        return jsonify({"error": "Invalid image format"}), 400

    prediction = model.predict(image)
    result = "REAL" if prediction[0] > 0.5 else "FAKE"

    return jsonify({"signature": result, "confidence": float(prediction[0])})

# Run Flask app on port 5000
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
