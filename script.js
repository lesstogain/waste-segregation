let model;

// 🚀 Load the AI model when the page loads
async function loadModel() {
    try {
        console.log("Loading AI model...");
        model = await tf.loadLayersModel("model/model.json");  // Ensure correct path
        console.log("Model loaded successfully!");
    } catch (error) {
        console.error("Error loading model:", error);
        alert("Failed to load AI model. Check file path!");
    }
}

// 📷 Start the webcam
async function startWebcam() {
    try {
        console.log("Requesting webcam access...");
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        document.getElementById("videoElement").srcObject = stream;
        console.log("Webcam started successfully!");
    } catch (error) {
        console.error("Webcam error:", error);
        alert("Camera not found or permission denied!");
    }
}

// 📷 Capture an image from the webcam
function captureImage() {
    const video = document.getElementById("videoElement");
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    return tf.browser.fromPixels(canvas).resizeNearestNeighbor([224, 224]).toFloat().expandDims();
}

// 🧠 Classify the waste
async function classifyWaste() {
    if (!model) {
        alert("AI model not loaded yet!");
        return;
    }

    console.log("Capturing image...");
    const inputTensor = captureImage();
    console.log("Running AI prediction...");
    
    const predictions = await model.predict(inputTensor).data();
    const resultIndex = predictions.indexOf(Math.max(...predictions));
    
    const labels = ["Biodegradable", "Non-Biodegradable"]; // Update with actual class names
    const resultText = labels[resultIndex];

    console.log("Prediction:", resultText);
    document.getElementById("result").innerText = "Result: " + resultText;
}

// 🚀 Load AI Model on Page Load
window.onload = function () {
    loadModel();
};

