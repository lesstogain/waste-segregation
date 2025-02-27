let model;

async function loadModel() {
    try {
        model = await tf.loadLayersModel('model/model.json');  // Adjust path if needed
        console.log("Model loaded successfully!");
    } catch (error) {
        console.error("Error loading model:", error);
    }
}

loadModel();
