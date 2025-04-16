// Classifier Variable
let classifier;
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/WtMIGXZEH/';

// Video
let video;
let flippedVideo;
// To store the classification
let label = '';
let canvas = createCanvas(320, 260);
canvas.parent("sketch");

const labelElement = document.getElementById('label');

// Example: Update the label dynamically
function updateLabel(text) {
    labelElement.textContent = text;
}

// Load the model first
function preload() {
    classifier = ml5.imageClassifier(imageModelURL + 'model.json');
    console.log(classifier);
}

function setup() {
    createCanvas(400, 300);
    
    // Create the video
    video = createCapture(VIDEO);
    video.size(400, 300);
    video.hide();

    // Start classifying
    classifyVideo();
}

function draw() {
    background(0);
    // Draw the video
    image(video, 0, 0);
    
    // Set the label in the HTML div
    document.getElementById('label').textContent = label;
}

// Get a prediction for the current video frame
function classifyVideo() {
    classifier.classify(video, gotResult);
}

// When we get a result
function gotResult(results) {
    console.log(results);
    // The results are in an array ordered by confidence.
    // Update the label variable with the classification result
    label = results[0].label;
    // Classify again!
    classifyVideo();
}

// Function to center the canvas
function centerCanvas() {
    let x = (windowWidth - width) / 2;
    let y = (windowHeight - height) / 2;
    select('canvas').position(x, y);
}

// Example usage
updateLabel('Gefahr erkannt!');
