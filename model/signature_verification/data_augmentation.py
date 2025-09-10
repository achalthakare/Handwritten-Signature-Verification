import os
import cv2
import numpy as np
from tensorflow.keras.preprocessing.image import ImageDataGenerator

# Paths
real_sign_folder = "real_signs"
augmented_sign_folder = "augmented_signs"

# Create directory if not exists
if not os.path.exists(augmented_sign_folder):
    os.makedirs(augmented_sign_folder)

# Data Augmentation Generator
datagen = ImageDataGenerator(
    rotation_range=10,
    width_shift_range=0.1,
    height_shift_range=0.1,
    shear_range=0.1,
    zoom_range=0.1,
    brightness_range=[0.8, 1.2]
)

# Load and augment images
image_files = [f for f in os.listdir(real_sign_folder) if f.endswith('.png') or f.endswith('.jpg')]
for img_file in image_files:
    img_path = os.path.join(real_sign_folder, img_file)
    img = cv2.imread(img_path, cv2.IMREAD_GRAYSCALE)
    img = cv2.resize(img, (128, 128))  # Resize to match model input size
    img = np.expand_dims(img, axis=-1)  # Add channel dimension
    img = np.expand_dims(img, axis=0)  # Batch dimension

    # Generate augmented images
    aug_iter = datagen.flow(img, batch_size=1)
    for i in range(5):  # Generate 5 variations per image
        aug_img = next(aug_iter)[0].astype(np.uint8)
        aug_img_path = os.path.join(augmented_sign_folder, f"{img_file.split('.')[0]}_aug{i}.png")
        cv2.imwrite(aug_img_path, aug_img)

print("Augmentation completed! Check the 'augmented_signs' folder.")
