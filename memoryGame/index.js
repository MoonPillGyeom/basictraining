let mock = [];
const CARD_CHOSEN = [];
const CARD_CHOSEN_ID = [];
let canClick = true;

function loadMockData() {
  return fetch("./mock.json").then((res) => res.json());
}

document.addEventListener("DOMContentLoaded", () => {
  loadMockData().then((data) => {
    mock = data;
    initGame();
  });
});

function initGame() {
  const container = document.getElementById("container");

  for (let repeat = 0; repeat < 2; repeat++) {
    for (let i = 0; i < mock.length; i++) {
      const card = document.createElement("div");
      card.innerText = "";

      card.setAttribute("data-id", i + repeat * mock.length);
      card.setAttribute("data-name", mock[i].name);
      card.classList.add("card");
      card.style.width = "100px";
      card.style.height = "200px";
      card.style.backgroundColor = "black";
      card.style.color = "white";
      container.appendChild(card);
      card.addEventListener("click", flatCard);
    }
  }
}

function checkForMatch() {
  const cards = document.querySelectorAll(".card");
  const [id1, id2] = CARD_CHOSEN_ID;

  const card1 = Array.from(cards).find(
    (card) => Number(card.getAttribute("data-id")) === id1
  );
  const card2 = Array.from(cards).find(
    (card) => Number(card.getAttribute("data-id")) === id2
  );

  if (CARD_CHOSEN[0] === CARD_CHOSEN[1]) {
    alert("You found a match");
    card1.removeEventListener("click", flatCard);
    card2.removeEventListener("click", flatCard);
  } else {
    card1.innerText = "";
    card2.innerText = "";
  }

  CARD_CHOSEN.length = 0;
  CARD_CHOSEN_ID.length = 0;
  canClick = true;
}
function flatCard() {
  if (!canClick) return;

  const cardId = Number(this.getAttribute("data-id"));
  const cardName = this.getAttribute("data-name");

  if (CARD_CHOSEN_ID.includes(cardId)) return;

  this.innerText = cardName;
  CARD_CHOSEN.push(cardName);
  CARD_CHOSEN_ID.push(cardId);
  console.log(CARD_CHOSEN_ID);
  console.log(CARD_CHOSEN);
  if (CARD_CHOSEN.length === 2) {
    canClick = false;
    setTimeout(checkForMatch, 500);
  }
}
