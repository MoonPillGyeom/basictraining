const DRUM_KEYS = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
const DRUM_NAMES = [
  "CLAP",
  "HIHAT",
  "KICK",
  "OPENHAT",
  "BOOM",
  "RIDE",
  "SNARE",
  "TOM",
  "TINK",
];
document.addEventListener("DOMContentLoaded", () => {
  createAudio();
  createDrumUI();

  document.addEventListener("keydown", (e) => {
    const keyUpperCase = e.key.toUpperCase();
    playSound(keyUpperCase);
  });

  const playSound = (key) => {
    const audio = document.querySelector(`audio[data-key="${key}"]`);
    const divKey = document.querySelector(`.key[data-key="${key}"]`);
    if (!audio) return;
    audio.currentTime = 0;
    audio.play();
    divKey.classList.add("playing");
  };
  const keys = document.querySelectorAll(".key");
  keys.forEach((key) =>
    key.addEventListener("transitionend", removeTransition)
  );
});

// UI 생성
function createDrumUI() {
  const container = document.getElementById("container");
  DRUM_KEYS.forEach((key, i) => {
    const kbd = document.createElement("kbd");
    const divKey = document.createElement("div");
    const span = document.createElement("span");
    kbd.innerText = key;
    divKey.className = "key";
    divKey.dataset.key = key;
    span.innerText = DRUM_NAMES[i];
    span.className = "soundName";
    container.appendChild(divKey);
    divKey.appendChild(kbd);
    divKey.appendChild(span);
  });
}

// 오디오 생성
function createAudio() {
  DRUM_NAMES.forEach((k, i) => {
    const audio = document.createElement("audio");
    audio.src = `sounds/${k.toLowerCase()}.wav`;
    audio.dataset.key = DRUM_KEYS[i];
    document.body.appendChild(audio);
  });
}

function removeTransition(e) {
  if (e.propertyName !== "transform") return;
  this.classList.remove("playing");
}
