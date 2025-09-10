import os
import cv2
import numpy as np
import tensorflow as tf

# Load Model
model = tf.keras.models.load_model("signature_model.h5")

# Paths
SCANNED_SIGN_DIR = "scanned_signs"
REAL_SIGN_DIR = "real_signs"

# Function to Process Images
def preprocess_image(image_path):
    img = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
    img = cv2.resize(img, (128, 128))
    img = img / 255.0  # Normalize
    img = img.reshape(1, 128, 128, 1)  # Reshape for model
    return img

# Signature Verification Function
def verify_signature(scanned_img_path):
    img = preprocess_image(scanned_img_path)
    prediction = model.predict(img)[0][0]  # Get probability

    if prediction > 0.5:
        return "Signature is Real ✅"
    else:
        return "Signature is Fake ❌"

# Test the function
scanned_files = os.listdir(SCANNED_SIGN_DIR)
for file in scanned_files:
    file_path = os.path.join(SCANNED_SIGN_DIR, file)
    result = verify_signature(file_path)
    print(f"{file}: {result}")
