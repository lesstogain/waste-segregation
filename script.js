let serialPort;
let writer;
let model;

// 📢 Load AI Model (GitHub Pages Compatible)
async function loadModel() {
    try {
        console.log("Loading AI model...");
        const modelPath = "https://lesstogain.github.io/waste-segregation/model/model.json";
        model = await tf.loadLayersModel(modelPath);
        console.log("Model loaded successfully!");
    } catch (error) {
        console.error("Error loading model:", error);
        alert("Failed to load AI model. Check file path or GitHub repository!");
    }
}

// 📷 Start Webcam
async function startWebcam() {
    try {
        console.log("Requesting webcam access...");
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        document.getElementById("videoElement").srcObject = stream;
        console.log("Webcam started successfully!");
    } catch (error) {
        console.error("Webcam error:", error);
        alert("Allow webcam access in browser settings!");
    }
}

// 📷 Capture Image from Webcam
function captureImage() {
    const video = document.getElementById("videoElement");
    if (!video || !video.srcObject) {
        console.error("Webcam is not active.");
        alert("Please start the webcam first!");
        return null;
    }

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    return tf.browser.fromPixels(canvas).resizeNearestNeighbor([224, 224]).toFloat().expandDims();
}

// 🧠 Classify Waste & Send to Arduino
async function classifyWaste() {
    if (!model) {
        alert("AI model not loaded yet!");
        return;
    }

    console.log("Capturing image...");
    const inputTensor = captureImage();
    if (!inputTensor) return;

    console.log("Running AI prediction...");
    const predictions = await model.predict(inputTensor).data();
    const resultIndex = predictions.indexOf(Math.max(...predictions));

    const labels = ["Biodegradable", "Non-Biodegradable"]; // Update with actual class names
    const resultText = labels[resultIndex];

    console.log("Prediction:", resultText);
    document.getElementById("result").innerText = "Result: " + resultText;

    // 🚀 Send result to Arduino via Serial
    if (serialPort && writer) {
        await writer.write(resultText + "\n");  // Send data to Arduino
        console.log("Sent to Arduino:", resultText);
    } else {
        console.warn("No serial connection. Connect Arduino first!");
    }
}

// 📡 Connect to Arduino via Web Serial API
async function connectArduino() {
    try {
        console.log("Requesting serial port...");
        serialPort = await navigator.serial.requestPort();
        await serialPort.open({ baudRate: 9600 });

        writer = serialPort.writable.getWriter();
        console.log("Connected to Arduino!");
    } catch (error) {
        console.error("Failed to connect to Arduino:", error);
        alert("Error connecting to Arduino. Check if it's properly plugged in.");
    }
}

// 🚀 Load AI Model on Page Load
window.onload = function () {
    loadModel();
};


