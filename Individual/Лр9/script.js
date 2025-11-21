const suits = ["spades", "clubs", "diamonds", "hearts"];
const ranks = [
  { name: "2", value: 2 }, { name: "3", value: 3 }, { name: "4", value: 4 },
  { name: "5", value: 5 }, { name: "6", value: 6 }, { name: "7", value: 7 },
  { name: "8", value: 8 }, { name: "9", value: 9 }, { name: "10", value: 10 },
  { name: "jack", value: 10 }, { name: "queen", value: 10 },
  { name: "king", value: 10 }, { name: "ace", value: 11 }
];

let deck = [];
let score = { user: 0, computer: 0 };
let round = 0;

const btnPlay = document.getElementById("playBtn");
const btnReset = document.getElementById("resetBtn");
const btnFinish = document.getElementById("finishBtn");

function createDeck() {
  deck = [];
  for (let suit of suits) {
    for (let rank of ranks) {
      deck.push({
        name: `${rank.name} ${suit}`,
        value: rank.value,
        image: `img/${rank.name}_${suit}.svg`
      });
    }
  }
}
function shuffleDeck() {
  for (let i = deck.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
}

let userName = "";
do {
  userName = prompt("Введіть ваше ім’я:");
  if (userName === null) {
    alert("Введення скасовано. Спробуйте ще раз!");
  } else if (userName.trim() === "") {
    alert("Ім’я не може бути порожнім!");
  }
} while (!userName || userName.trim() === "");

document.getElementById("info").innerText = `Гравець: ${userName} vs Комп’ютер`;
document.getElementById("userName").innerText = userName;

createDeck();
shuffleDeck();

btnPlay.onclick = function() {
  if (round < 3) {
    round++;
    document.getElementById("round").innerText = `Раунд: ${round} / 3`;

    let userCard = deck.pop();
    let compCard = deck.pop();

    score.user += userCard.value;
    score.computer += compCard.value;

    let userImg = document.createElement("img");
    userImg.src = userCard.image;
    document.getElementById("userCards").appendChild(userImg);

    let compImg = document.createElement("img");
    compImg.src = compCard.image;
    document.getElementById("compCards").appendChild(compImg);

    document.getElementById("userScore").innerText = `Сума: ${score.user}`;
    document.getElementById("compScore").innerText = `Сума: ${score.computer}`;

    if (score.user === 21 || score.computer === 21) {
      let resultText = "";
      if (score.user === 21 && score.computer === 21) {
        resultText = "Обидва набрали 21! Нічия!";
      } else if (score.user === 21) {
        resultText = `🎉 ${userName} набрав 21 і переміг!`;
      } else {
        resultText = "🤖 Комп’ютер набрав 21 і переміг!";
      }
      document.getElementById("result").innerText = resultText;
      btnPlay.disabled = true;
      return;
    }

    if (round === 3) finishGame();
  }
};

function finishGame() {
  btnPlay.disabled = true;
  let resultText = "";

  if ((score.user > score.computer && score.user <= 21) || score.computer > 21) {
    resultText = `Переміг ${userName}! 🎉`;
  } else if ((score.computer > score.user && score.computer <= 21) || score.user > 21) {
    resultText = "Переміг комп’ютер 🤖";
  } else {
    resultText = "Нічия!";
  }

  document.getElementById("result").innerText = resultText;
}
btnReset.onclick = function() {
  score = { user: 0, computer: 0 };
  round = 0;
  createDeck();
  shuffleDeck();

  document.getElementById("userCards").innerHTML = "";
  document.getElementById("compCards").innerHTML = "";
  document.getElementById("userScore").innerText = "Сума: 0";
  document.getElementById("compScore").innerText = "Сума: 0";
  document.getElementById("round").innerText = "Раунд: 0 / 3";
  document.getElementById("result").innerText = "";
  btnPlay.disabled = false;
};
btnFinish.onclick = function() {
  if (round === 0) {
    alert("Гра ще не почалася!");
    return;
  }
  finishGame();
};
