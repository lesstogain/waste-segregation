async function startWebcam() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        document.getElementById("videoElement").srcObject = stream;
    } catch (error) {
        console.error("Webcam error:", error);
        alert("Camera not found or permission denied!");
    }
}
