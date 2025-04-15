const DRUM_KEY_MAP = [
  { en: "A", kr: "ㅁ", sound: "CLAP" },
  { en: "S", kr: "ㄴ", sound: "HIHAT" },
  { en: "D", kr: "ㅇ", sound: "KICK" },
  { en: "F", kr: "ㄹ", sound: "OPENHAT" },
  { en: "G", kr: "ㅎ", sound: "BOOM" },
  { en: "H", kr: "ㅗ", sound: "RIDE" },
  { en: "J", kr: "ㅓ", sound: "SNARE" },
  { en: "K", kr: "ㅏ", sound: "TOM" },
  { en: "L", kr: "ㅣ", sound: "TINK" },
];
document.addEventListener("DOMContentLoaded", () => {
  createAudio();
  createDrumUI();

  document.addEventListener("keydown", (e) => {
    const keyUpperCase = e.key.toUpperCase();
    playSound(keyUpperCase);
  });

  const divKeys = document.querySelectorAll(".key");
  divKeys.forEach((key) =>
    key.addEventListener("transitionend", removeTransition)
  );
});

const playSound = (key) => {
  const matched = drumKeyMatch(key); // 함수로 분리된 부분
  if (!matched) return;
  const { en } = matched;
  const audio = document.querySelector(`audio[data-key="${en}"]`);
  const divKey = document.querySelector(`.key[data-key="${en}"]`);
  if (!audio) return;
  audio.currentTime = 0;
  audio.play();
  divKey.classList.add("playing");
};

// UI 생성
function createDrumUI() {
  const container = document.getElementById("container");
  DRUM_KEY_MAP.forEach(({ en, kr, sound }, i) => {
    const kbd = document.createElement("kbd");
    const divKey = document.createElement("div");
    const span = document.createElement("span");
    kbd.innerText = en;
    divKey.className = "key";
    divKey.dataset.key = en;
    span.innerText = sound;
    span.className = "soundName";
    container.appendChild(divKey);
    divKey.appendChild(kbd);
    divKey.appendChild(span);
  });
}

// 오디오 생성
function createAudio() {
  DRUM_KEY_MAP.forEach(({ en, _, sound }, i) => {
    const audio = document.createElement("audio");
    audio.src = `sounds/${sound.toLowerCase()}.wav`;
    audio.dataset.key = en;
    document.body.appendChild(audio);
  });
}

function removeTransition(e) {
  if (e.propertyName !== "transform") return;
  this.classList.remove("playing");
}

// 영어/한글 키 매칭 함수
function drumKeyMatch(key) {
  return DRUM_KEY_MAP.find(({ en, kr }) => key === en || key === kr);
}
