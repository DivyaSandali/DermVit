import os
import cv2
import torch
import pickle
import numpy as np
from PIL import Image
import matplotlib.pyplot as plt
from flask import Flask, session, request, jsonify, render_template
from transformers import ViTFeatureExtractor, ViTForImageClassification

# Initialize Flask app
app = Flask(__name__)

# Configure upload folder
UPLOAD_FOLDER = os.path.join(os.getcwd(), 'static', 'upload_images')
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# Define custom model class if needed
class CustomViTModel(ViTForImageClassification):
    def __init__(self, vit_model, dropout_rate=0.3):  # Adjust dropout_rate as needed
        super(CustomViTModel, self).__init__()
        self.vit = vit_model.vit  # Use the base ViT model without classifier
        self.classifier = nn.Sequential(
            nn.Dropout(dropout_rate),  # Add dropout before the classifier
            vit_model.classifier  # The existing classifier layer
        )

    def forward(self, x):
        # Pass through the ViT model and get the last hidden state
        vit_output = self.vit(x)

        # The correct key is last_hidden_state for sequence output
        # ViT returns a dict, and we're using the first token (CLS token)
        last_hidden_state = vit_output['last_hidden_state'][:, 0]  # Extract the [CLS] token

        # Pass through the classifier with Dropout
        x = self.classifier(last_hidden_state)
        return x  # If your model has custom layers, define them here

# Load model safely
model_path = 'model/best_model_cpu.pth'
if os.path.exists(model_path):
    try:
        best_model = torch.load(model_path, map_location=device, weights_only=False)
        if isinstance(best_model, dict):
            model = CustomViTModel.from_pretrained("model/best_model_cpu.pth", num_labels=4)
            model.load_state_dict(best_model)
            best_model = model
    except (pickle.UnpicklingError, AttributeError):
        print("Warning: Error loading the full model. Loading using state_dict instead.")
        best_model = CustomViTModel.from_pretrained("google/vit-base-patch16-224", num_labels=4)
        best_model.load_state_dict(torch.load(model_path, map_location=device))

    best_model.to(device)
    best_model.eval()
else:
    raise FileNotFoundError(f"Model file '{model_path}' not found. Please check the path.")

# Load feature extractor
feature_extractor = ViTFeatureExtractor.from_pretrained('google/vit-base-patch16-224')
# Define class labels
class_labels = {
    0: "1. Enfeksiyonel",
    1: "2. Ekzama",
    2: "5. Benign",
    3: "6. Malign"
}

def apply_clahe_rgb(image):
    channels = cv2.split(image)
    clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8, 8))
    enhanced_channels = [clahe.apply(channel) for channel in channels]
    return cv2.merge(enhanced_channels)

def apply_gamma_correction(image, gamma=1.5):
    lab_image = cv2.cvtColor(image, cv2.COLOR_BGR2LAB)
    l_channel, a, b = cv2.split(lab_image)
    inv_gamma = 1.0 / gamma
    table = np.array([((i / 255.0) ** inv_gamma) * 255 for i in range(256)]).astype("uint8")
    l_channel_gamma = cv2.LUT(l_channel, table)
    lab_image_gamma = cv2.merge([l_channel_gamma, a, b])
    return cv2.cvtColor(lab_image_gamma, cv2.COLOR_LAB2BGR)

def apply_clahe_and_gamma(image, gamma=1.5):
    image_clahe = apply_clahe_rgb(image)
    return apply_gamma_correction(image_clahe, gamma=gamma)

def preprocess_image(image_path):
    image = cv2.imread(image_path)
    image_enhanced = apply_clahe_and_gamma(image)
    image_rgb = cv2.cvtColor(image_enhanced, cv2.COLOR_BGR2RGB)
    image_pil = Image.fromarray(image_rgb)
    inputs = feature_extractor(images=image_pil, return_tensors="pt")
    return inputs['pixel_values'].to(device)

def predict_image(image_path):
    image_tensor = preprocess_image(image_path)
    with torch.no_grad():
        outputs = best_model(image_tensor)
        probabilities = torch.softmax(outputs, dim=1)
        max_prob, predictions = torch.max(probabilities, dim=1)
    predicted_class = predictions.item()
    return class_labels.get(predicted_class, "Invalid image"), max_prob.item()

def visualize_image(image_path, predicted_label):
    image = cv2.imread(image_path)
    enhanced_image = apply_clahe_and_gamma(image)
    enhanced_image_rgb = cv2.cvtColor(enhanced_image, cv2.COLOR_BGR2RGB)
    plt.imshow(enhanced_image_rgb)
    plt.title(f"Prediction: {predicted_label}" if predicted_label != "Invalid image" else "Invalid Image")
    plt.axis("off")
    plt.show()

@app.route('/')
def land():
    return render_template('landingPage.html')

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({"error": "No file part in the request"}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No file selected for upload"}), 400
    try:
        filepath = os.path.normpath(os.path.join(app.config['UPLOAD_FOLDER'], file.filename))
        file.save(filepath)
        predicted_label, confidence = predict_image(filepath)
        # visualize_image(filepath, predicted_label)
        # session['predict_label'] = predicted_label
        print(predicted_label)
        return jsonify({
            "message": "File uploaded successfully",
            "file_path": filepath,
            "prediction": predicted_label,
            "confidence": confidence
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/home')
def home():
    return render_template('home.html')

if __name__ == "__main__":
    app.run(port=8000, debug=True)
