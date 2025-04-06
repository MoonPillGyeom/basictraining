let cardData = [];
const selectedNames = [];
const selectedIds = [];
let canClick = true;

document.addEventListener("DOMContentLoaded", async () => {
  const data = await fetch("./mock.json").then((res) => res.json());
  cardData = data;
  initGame();
});

// 카드를 받아와 섞고 renderCards함수를 통해 UI를 그림
function initGame() {
  const duplicated = [...cardData, ...cardData];
  const shuffled = shuffleArray(duplicated);
  renderCards(shuffled);
}

// 카드를 그려주는 함수
function renderCards(cards) {
  // 파라미터로 카드를 받아옴
  const container = document.getElementById("container");
  container.innerHTML = ""; // 혹시 모를 HTML초기화

  // 카드배열을 createCard를 통해 생성 한 후 컨테이너 아래로 집어 넣음
  cards.forEach((cardItem, index) => {
    const card = createCard(cardItem.name, index);
    container.appendChild(card);
  });
}

// 카드를 생성해주는 함수
function createCard(name, id) {
  const card = document.createElement("div");
  card.innerText = ""; // 혹시 모를 Text 초기화
  card.dataset.id = id; // id 값을 넣어줌
  card.dataset.name = name;

  card.className = "card";
  // card의 style 적용
  Object.assign(card.style, {
    width: "100px",
    height: "200px",
    backgroundColor: "black",
    color: "white",
  });
  // 카드를 클릭시 발생하는 이벤트 핸들러
  card.addEventListener("click", handleCardClick);
  return card;
}

function handleCardClick() {
  if (!canClick) return;

  const cardId = Number(this.dataset.id); // 카드 id는 클릭 한 카드의 data-id값
  const cardName = this.dataset.name;

  if (selectedIds.includes(cardId)) return; // 이미 선택되어 있는 카드는 클릭 방지

  this.innerText = cardName;
  // 선택한 값의 name, id를 각각의 배열에 push
  selectedNames.push(cardName);
  selectedIds.push(cardId);

  // 2개 클릭시 이후 클릭 방지 및 500ms 이후 checkforMatch 실행
  if (selectedNames.length === 2) {
    canClick = false;
    setTimeout(checkForMatch, 500);
  }
}

// 카드 2장을 검사하는 함수
function checkForMatch() {
  // class = card를 가진 모든 요소를 가져옴
  const cards = document.querySelectorAll(".card");
  console.log(cards);
  // selectedIds에 있는 0번째, 1번째 id 값을 가져와서 cards nodeList에 id1번째 id2번째값을 찾음
  const [id1, id2] = selectedIds;
  console.log(id1);
  const card1 = cards[id1];
  console.log(card1);
  const card2 = cards[id2];

  // selectedNames배열 안의 name값이 일치하면 알림창을 띄우고 해당 카드의 이벤트와 텍스트, 배경색ui를 없앰
  // 그게 아니라면 text ui만 없앰
  if (selectedNames[0] === selectedNames[1]) {
    alert("You found a match");
    [card1, card2].forEach((card) => {
      card.removeEventListener("click", handleCardClick);
      card.style.backgroundColor = "white";
      card.innerText = "";
    });
  } else {
    [card1, card2].forEach((card) => (card.innerText = ""));
  }

  // resetSelections함수를 불러와 각 배열을 초기화
  resetSelections();
}

// 클릭이 다시 가능하고, name,id를 담는 배열을 초기화하는 함수
function resetSelections() {
  selectedNames.length = 0;
  selectedIds.length = 0;
  canClick = true;
}

// 카드배열을 가져와 랜덤하게 석는 함수
function shuffleArray(array) {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}
