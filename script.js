async function startWebcam() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        document.getElementById("videoElement").srcObject = stream;
    } catch (error) {
        console.error("Webcam error:", error);
        alert("Camera not found or permission denied!");
    }
}
function classifyWaste() {
    console.log("Waste classification started.");
    // Your classification logic here
}
async function startWebcam() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        document.getElementById("videoElement").srcObject = stream;
    } catch (error) {
        console.error("Webcam error:", error);
        alert("Camera not found or permission denied!");
    }
}
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Waste Segregation AI</title>
</head>
<body>
    <h1>Waste Segregation AI</h1>
    
    <button onclick="startWebcam()">Start Webcam</button>
    <video id="videoElement" autoplay></video>

    <script src="script.js"></script>
</body>
</html>
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

