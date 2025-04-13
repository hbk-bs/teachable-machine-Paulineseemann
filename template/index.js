// Classifier Variable
let classifier;
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/WtMIGXZEH/';

// Video
let video;
let label = '';

// Reaktionen mit lustigen Sprüchen + Symbolen
const reactions = {
  "Entzündlich": {
    text: "🔥 Heißer als dein Smartphone, wenn du 15 Apps gleichzeitig laufen lässt!",
    img: "https://upload.wikimedia.org/wikipedia/commons/6/60/GHS-pictogram-flamme.svg"
  },
  "Ätzend": {
    text: "☠️ Diese Chemikalie könnte dein Gesicht besser 'peelen' als jede Maske!",
    img: "https://upload.wikimedia.org/wikipedia/commons/6/64/GHS-pictogram-acid.svg"
  },
  "Giftig": {
    text: "💀 Ein Tropfen davon und du kannst den Rest des Tages im Bett verbringen... für immer!",
    img: "https://upload.wikimedia.org/wikipedia/commons/e/e6/GHS-pictogram-skull.svg"
  },
  "Explosiv": {
    text: "💥 Explosiver als dein letzter Versuch, deine Matheprüfung zu bestehen!",
    img: "https://upload.wikimedia.org/wikipedia/commons/a/a3/GHS-pictogram-explos.svg"
  },
  "Gesundheitsgefahr": {
    text: "😷 Diese Substanz könnte dich schneller krank machen als der Winter in Berlin!",
    img: "https://upload.wikimedia.org/wikipedia/commons/d/d6/GHS-pictogram-silhouette.svg"
  },
  "Umweltgefährlich": {
    text: "🐟 Fische mögen das nicht, aber hey, vielleicht ist es auch nicht dein Lieblingsparfüm.",
    img: "https://upload.wikimedia.org/wikipedia/commons/e/e1/GHS-pictogram-pollu.svg"
  },
  "Gas unter Druck": {
    text: "🥶 Das Gas in dieser Flasche ist wie ein zorniger Bär – unberechenbar und sauer!",
    img: "https://upload.wikimedia.org/wikipedia/commons/4/4a/GHS-pictogram-gas-cylinder.svg"
  }
};

function preload() {
  classifier = ml5.imageClassifier(imageModelURL + 'model.json');
}

function setup() {
  let canvas = createCanvas(320, 240);
  canvas.parent('sketch');

  video = createCapture(VIDEO);
  video.size(320, 240);
  video.hide();

  classifyVideo();
}

function draw() {
  background(0);
  image(video, 0, 0);

  fill(255);
  textSize(14);
  textAlign(CENTER);
  text(label, width / 2, height - 10);
}

function classifyVideo() {
  classifier.classify(video, gotResult);
}

function gotResult(error, results) {
  if (error) {
    console.error(error);
    return;
  }

  label = results[0].label;
  classifyVideo();

  // Zeige passenden Spruch und Symbol
  const reaction = reactions[label];
  const spruchDiv = document.getElementById("spruch");
  const symbolImg = document.getElementById("symbol-img");

  if (reaction) {
    spruchDiv.innerText = reaction.text;
    symbolImg.src = reaction.img;
    symbolImg.style.display = "block";
    symbolImg.alt = label;
  } else {
    spruchDiv.innerText = "😶 Keine passende Reaktion gefunden.";
    symbolImg.style.display = "none";
  }
}
