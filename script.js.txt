let model, webcam, maxPredictions;

async function loadModel() {
    const URL = "model/";
    model = await tmImage.load(URL + "model.json", URL + "metadata.json");
    maxPredictions = model.getTotalClasses();
}

// Start Webcam
async function startWebcam() {
    const video = document.getElementById("webcam");
    video.width = 300;
    video.height = 300;

    webcam = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = webcam;

    await loadModel();
}

// Classify Waste
async function classifyWaste() {
    const prediction = await model.predict(document.getElementById("webcam"));
    let resultText = "Unknown Waste";

    for (let i = 0; i < maxPredictions; i++) {
        if (prediction[i].probability > 0.8) {
            resultText = prediction[i].className;
            break;
        }
    }

    document.getElementById("result").innerText = `Result: ${resultText}`;

    if (resultText.includes("Wrong Bin")) {
        document.getElementById("buzzer").play();  // Play buzzer if wrong bin
    }
}
