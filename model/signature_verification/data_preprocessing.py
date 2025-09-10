import cv2
import os
import numpy as np
from tensorflow.keras.preprocessing.image import ImageDataGenerator

# Paths to real and fake signatures
real_signs_path = "real_signs"
fake_signs_path = "fake_signs"

# Data augmentation
datagen = ImageDataGenerator(
    rotation_range=10, width_shift_range=0.1, height_shift_range=0.1,
    shear_range=0.1, zoom_range=0.1, horizontal_flip=False, fill_mode='nearest'
)


def load_images_from_folder(folder, label):
    images = []
    labels = []

    for filename in os.listdir(folder):
        img_path = os.path.join(folder, filename)
        img = cv2.imread(img_path, cv2.IMREAD_GRAYSCALE)  # Load grayscale

        if img is None:
            print(f"Skipping {filename}, unable to read.")
            continue

        img = cv2.resize(img, (128, 128))  # Resize for consistency

        # Ensure grayscale images are converted to 3-channel for augmentation
        img_rgb = np.stack([img] * 3, axis=-1)

        augmented_images = [datagen.random_transform(img_rgb) for _ in range(5)]
        images.extend(augmented_images)
        labels.extend([label] * 5)

    return np.array(images, dtype="float32") / 255.0, np.array(labels)


# Load and augment data
real_images, real_labels = load_images_from_folder(real_signs_path, 1)  # Label 1 for real
fake_images, fake_labels = load_images_from_folder(fake_signs_path, 0)  # Label 0 for fake

# Combine and shuffle data
X = np.concatenate((real_images, fake_images), axis=0)
y = np.concatenate((real_labels, fake_labels), axis=0)

indices = np.arange(X.shape[0])
np.random.shuffle(indices)
X, y = X[indices], y[indices]

# Split dataset
split = int(0.8 * len(X))
X_train, X_val = X[:split], X[split:]
y_train, y_val = y[:split], y[split:]

# Save dataset
np.save("X_train.npy", X_train)
np.save("X_val.npy", X_val)
np.save("y_train.npy", y_train)
np.save("y_val.npy", y_val)

print("✅ Dataset preprocessing complete. Saved as .npy files.")
