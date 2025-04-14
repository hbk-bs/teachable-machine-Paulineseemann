// Classifier Variable
let classifier;
// Model URL
// HERE
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/WtMIGXZEH/';

// Video
let video;
let flippedVideo;
// To store the classification
let label = '';
let canvas = createCanvas(320, 260);
canvas.parent("sketch");

// Load the model first
function preload() {
	classifier = ml5.imageClassifier(imageModelURL + 'model.json');
	console.log(classifier);
}

function setup() {
	createCanvas(400, 300);
	
	// Create the video
	video = createCapture(VIDEO);
	video.size(400, 250);
	video.hide();

	// Start classifying
	classifyVideo();
	
}

function draw() {
	background(0);
	// Draw the video
	image(video, 0, 0);

	// Draw the label
	fill(255);
	textSize(20);
	textFont("'Nimbus Mono PS', 'Courier New', monospace");
	textAlign(CENTER);
	text(label, width / 2, height - 8);
	
}

// Get a prediction for the current video frame
function classifyVideo() {
	classifier.classify(video, gotResult);
}





// When we get a result
function gotResult(results) {
	console.log(results);
	// The results are in an array ordered by confidence.
	// console.log(results[0]);
	label = results[0].label;
	// Classifiy again!
	classifyVideo();
}
// Function to center the canvas
function centerCanvas() {
    // Calculate the position to center the canvas
    let x = (windowWidth - width) / 2;
    let y = (windowHeight - height) / 2;
    // Set the position of the canvas
    select('canvas').position(x, y);
}

