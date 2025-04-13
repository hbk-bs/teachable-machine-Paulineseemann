const URL = "https://teachablemachine.withgoogle.com/models/WtMIGXZEH/";
let model, webcam, maxPredictions;

const reactions = {
  "Entzündlich": {
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/GHS-pictogram-flamme.svg/1200px-GHS-pictogram-flamme.svg.png",
    text: "🔥 Brennt besser als dein Liebesleben!"
  },
  "Ätzend": {
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/GHS-pictogram-acid.svg/1200px-GHS-pictogram-acid.svg.png",
    text: "☠️ Diese Flüssigkeit hat mehr Zerstörungskraft als Montagmorgen."
  },
  "Giftig": {
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/GHS-pictogram-skull.svg/1200px-GHS-pictogram-skull.svg.png",
    text: "💀 Würde selbst eine Kakerlake umhauen."
  },
  "Explosiv": {
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/GHS-pictogram-explos.svg/1200px-GHS-pictogram-explos.svg.png",
    text: "💥 Boom! Mehr Drama als in deiner Lieblingsserie."
  }
};

async function init() {
  const modelURL = URL + "model.json";
  const metadataURL = URL + "metadata.json";

  model = await tmImage.load(modelURL, metadataURL);
  maxPredictions = model.getTotalClasses();

  const flip = true;
  webcam = new tmImage.Webcam(224, 224, flip);
  await webcam.setup(); // Kamera freigeben
  await webcam.play();  // Kamera starten
  document.getElementById("webcam").replaceWith(webcam.canvas); // Canvas statt Video anzeigen

  document.getElementById("webcam-container").style.display = "block";
  document.getElementById("uploadedImage").style.display = "none";

  window.requestAnimationFrame(loop);
}

async function loop() {
  webcam.update();
  await predict();
  window.requestAnimationFrame(loop);
}

async function predict() {
  const prediction = await model.predict(webcam.canvas);
  prediction.sort((a, b) => b.probability - a.probability);
  const best = prediction[0];
  document.getElementById("result").innerText = `🧠 Erkannt: ${best.className} (${(best.probability * 100).toFixed(1)}%)`;
  showReaction(best.className);
}

function loadImage(event) {
  const image = document.getElementById('uploadedImage');
  image.src = URL.createObjectURL(event.target.files[0]);
  image.onload = async () => {
    model ??= await tmImage.load(URL + "model.json", URL + "metadata.json");
    document.getElementById("webcam-container").style.display = "none";
    image.style.display = "block";
    const prediction = await model.predict(image);
    prediction.sort((a, b) => b.probability - a.probability);
    const best = prediction[0];
    document.getElementById("result").innerText = `🧠 Erkannt: ${best.className} (${(best.probability * 100).toFixed(1)}%)`;
    showReaction(best.className);
  };
}

function showReaction(label) {
  const reaction = reactions[label];
  const container = document.getElementById("reaction");
  if (reaction) {
    container.innerHTML = `
      <img src="${reaction.img}" alt="${label}" width="100"><br>
      <p>${reaction.text}</p>
    `;
  } else {
    container.innerHTML = "<p>🤷 Kein Spruch für dieses Symbol gefunden.</p>";
  }
}
