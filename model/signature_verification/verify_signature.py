import cv2
import numpy as np
import tensorflow as tf

# Load trained model
model = tf.keras.models.load_model("signature_model.keras")

def preprocess_image(image_path):
    img = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
    if img is None:
        print("❌ Error: Unable to read the image.")
        return None
    img = cv2.resize(img, (128, 128))
    img = np.stack([img] * 3, axis=-1)  # Convert grayscale to 3-channel
    img = img / 255.0  # Normalize
    return np.expand_dims(img, axis=0)  # Add batch dimension

# Test image
test_image_path = "scanned_signs/fakesignofme.jpg"  # Change this to the image you want to verify
test_image = preprocess_image(test_image_path)

if test_image is not None:
    prediction = model.predict(test_image)
    if prediction[0] > 0.5:
        print("✅ Signature is REAL")
    else:
        print("❌ Signature is FAKE")
