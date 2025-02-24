import os
import cv2
import numpy as np
from PIL import Image, UnidentifiedImageError
import imagehash
from collections import defaultdict

# Paths to dataset
DATASET_PATH = "20k-multi-class-crop-disease-images"
TRAIN_PATH = os.path.join(DATASET_PATH, "Train")
VALIDATION_PATH = os.path.join(DATASET_PATH, "Validation")

# Thresholds
BLUR_THRESHOLD = 100  # Lower values indicate more blur
BLACK_PIXEL_THRESHOLD = 0.8  # Proportion of black pixels
HASH_SIMILARITY_THRESHOLD = 5  # Hamming distance threshold for duplicates

# Helper function to check if the image is blurry
def is_blurry(image_path):
    image = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
    if image is None:
        return True  # Remove if unreadable
    variance = cv2.Laplacian(image, cv2.CV_64F).var()
    return variance < BLUR_THRESHOLD

# Helper function to check if the image has a black background
def is_black_background(image_path):
    image = cv2.imread(image_path)
    if image is None:
        return True  # Remove if unreadable
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    black_pixels = np.sum(gray < 30)  # Count almost black pixels
    total_pixels = gray.size
    return (black_pixels / total_pixels) > BLACK_PIXEL_THRESHOLD

# Helper function to find and remove duplicates
def find_and_remove_duplicates(folder_path):
    image_hashes = defaultdict(list)
    removed_files = []
    for root, _, files in os.walk(folder_path):
        for file in files:
            image_path = os.path.join(root, file)
            try:
                img = Image.open(image_path)
                img_hash = imagehash.average_hash(img)
                image_hashes[img_hash].append(image_path)
            except (UnidentifiedImageError, IOError):
                removed_files.append(image_path)
                os.remove(image_path)

    # Remove duplicates
    for hash_val, paths in image_hashes.items():
        if len(paths) > 1:
            # Keep only the first image, remove others
            for duplicate_path in paths[1:]:
                removed_files.append(duplicate_path)
                os.remove(duplicate_path)

    return removed_files

# Helper function to check if an image is corrupt or unsupported
def is_corrupt_or_unsupported(image_path):
    try:
        with Image.open(image_path) as img:
            img.verify()  # Check for corruption
        cv2.imread(image_path)  # Check if OpenCV can read the image
    except (UnidentifiedImageError, IOError, cv2.error):
        return True
    return False

# Cleaning the dataset
def clean_dataset(path):
    total_removed = 0
    for folder_name in os.listdir(path):
        folder_path = os.path.join(path, folder_name)
        if not os.path.isdir(folder_path):
            continue

        print(f"Cleaning folder: {folder_name}")

        # 1. Remove corrupt or unsupported images
        for file_name in os.listdir(folder_path):
            file_path = os.path.join(folder_path, file_name)
            if is_corrupt_or_unsupported(file_path):
                os.remove(file_path)
                total_removed += 1

        # 2. Remove blurry images
        for file_name in os.listdir(folder_path):
            file_path = os.path.join(folder_path, file_name)
            if is_blurry(file_path):
                os.remove(file_path)
                total_removed += 1

        # 3. Remove images with black background
        for file_name in os.listdir(folder_path):
            file_path = os.path.join(folder_path, file_name)
            if is_black_background(file_path):
                os.remove(file_path)
                total_removed += 1

        # 4. Remove duplicate images
        duplicates = find_and_remove_duplicates(folder_path)
        total_removed += len(duplicates)

    print(f"Total images removed from {path}: {total_removed}")

# Run cleaning on both Train and Validation folders
print("Starting dataset cleaning...")
clean_dataset(TRAIN_PATH)
clean_dataset(VALIDATION_PATH)
print("Dataset cleaning completed!")