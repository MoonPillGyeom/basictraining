/*
 * 드럼 구현과정 정리
 * 1. 우선 드럼을 치는것 같은 UI를 만든다. button처럼 생긴걸로 o
 * 2. 드럼 사운드를 구해온다
 * 3. 해당 UI를 클릭 하거나 특정 keyDown, or Keyup등과 같은 이벤트를 물려서 web API사운드를 지정한다 o
 * 4. 특정 키를 배열에 담아 저장기능을 만들어 저장기능을 담은 버튼을 클릭시 해당 키를 이용하여 드럼 사운드가 나오게 한다.
 * 추가 요구사항
 * 1. 4번에 해당하는 버튼을 전 사운드, 전전 사운드 처럼 여러 사운드를 저장하거나, 중복으로 사운드를 내보낼 수 있는 기능
 */

const DRUM_KEYS = ["a", "s", "d", "f", "g"];

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("container");

  // 버튼 UI 생성
  DRUM_KEYS.forEach((key) => {
    const btn = document.createElement("button");
    btn.innerText = key.toUpperCase();
    btn.className = "btn";
    btn.addEventListener("click", () => playSound(key));
    container.appendChild(btn);
  });

  document.addEventListener("keydown", (e) => {
    const key = e.key.toLowerCase();
    if (DRUM_KEYS.includes(key)) {
      playSound(key);
    }
  });

  const playSound = (key) => {
    console.log(`Play sound for key: ${key}`);
  };
});
