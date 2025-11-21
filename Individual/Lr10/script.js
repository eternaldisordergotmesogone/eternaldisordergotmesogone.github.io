const userName = document.getElementById("userName");
const slots = document.querySelectorAll(".slot");
const spinBtn = document.getElementById("spinBtn");
const decreaseBetBtn = document.getElementById("decreaseBet");
const increaseBetBtn = document.getElementById("increaseBet");
const betInput = document.getElementById("bet"); // <input>
const balanceEl = document.getElementById("balance");

// Масив картинок фруктів
const fruits = [
  "img/icon/apple.svg",
  "img/icon/banana.svg",
  "img/icon/cherry.svg",
  "img/icon/grape.svg",
  "img/icon/kavun.svg",
  "img/icon/lemon.svg",
  "img/icon/mango.svg",
  "img/icon/orange.svg",
  "img/icon/strawberry.svg"
];
let nameUser = prompt("Введіть ім'я:", "User");
if (!nameUser || nameUser.trim() === "") nameUser = "User";
userName.textContent = nameUser;

// Зміна ставки
increaseBetBtn.addEventListener("click", () => {
  let betValue = Number(betInput.value);
  let balanceValue = Number(balanceEl.textContent);

  if (betValue + 10 <= balanceValue) {
    betInput.value = betValue + 10;
  }
});

decreaseBetBtn.addEventListener("click", () => {
  let betValue = Number(betInput.value);
  if (betValue > 1) {
    betInput.value = Math.max(1, betValue - 5);
  }
});

//Спін
let result = [];

spinBtn.addEventListener("click", spin);

function spin() {
  let betValue = Number(betInput.value);
  let balanceValue = Number(balanceEl.textContent);

  if (betValue <= 0) {
    alert("Введіть суму ставки!");
    return;
  }

  if (balanceValue < betValue || balanceValue==0) {
    alert("Недостатньо коштів!");
    const loseGif = document.createElement("img");
    loseGif.src = "img/gif/lose.gif";
    loseGif.classList.add("lose-gif");
    document.body.appendChild(loseGif);
    setTimeout(() => {
      loseGif.classList.add("fade");
      setTimeout(() => loseGif.remove(), 500);
    }, 3000);
    return;
  }
  result = [];
  spinBtn.disabled = true;
  spinBtn.textContent = "КРУТИТЬСЯ...";
  const slotImages = document.querySelectorAll('.slot img');

  // Знімаємо ставку
  balanceValue -= betValue;
  balanceEl.textContent = balanceValue.toFixed(2);

  slots.forEach((slot, i) => {
    slotImages.forEach(img => {
      img.style.animation = 'spin 0.1s linear infinite';
     });
    setTimeout(() => {
      slot.style.animation = "none";
      const randomFruits = [];
        for (let j = 0; j < 3; j++) {
        const randomIndex = Math.floor(Math.random() * fruits.length);
        randomFruits.push(`<div><img src="${fruits[randomIndex]}" alt="fruit"></div>`);

        if (j === 1) result[i] = fruits[randomIndex];
      }

      slot.innerHTML = randomFruits.join("");

      if (i === slots.length - 1) {
        setTimeout(() => {
          countWin(result);
          spinBtn.disabled = false;
          spinBtn.textContent = "КРУТИТИ!";
        }, 300);
      }
    }, 1000 + i * 500);
  });
}

//Підрахунок виграшу
function countWin(result) {
  let winMultiplier = 0;

  if (result[0] === result[1] && result[1] === result[2]) {
    switch (result[0]) {
      case "img/icon/cherry.svg": winMultiplier = 15;  break;
      case "img/icon/lemon.svg": winMultiplier = 10; break;
      case "img/icon/apple.svg": winMultiplier = 8; break;
      case "img/icon/mango.svg": winMultiplier = 6; break;
      case "img/icon/grape.svg": winMultiplier = 5; break;
      case "img/icon/orange.svg": winMultiplier = 4; break;
      case "img/icon/strawberry.svg": winMultiplier = 3; break;
      case "img/icon/banana.svg": winMultiplier = 2; break;
      case "img/icon/kavun.svg": winMultiplier = 1.5; break;
    }
  } else if (result[0] === result[1] || result[1] === result[2] || result[0] === result[2]) {
    winMultiplier = 2;
  }

  if (winMultiplier > 0) {
    let betValue = Number(betInput.value);
    let balanceValue = Number(balanceEl.textContent);
    let win = betValue * winMultiplier;

    balanceValue += win;
    balanceEl.textContent = balanceValue.toFixed(2);

    balanceEl.style.color = "#00ff80";
    balanceEl.style.transition = "color 0.3s";
    setTimeout(() => (balanceEl.style.color = "#fff"), 500);
    if (winMultiplier === 15) {
      const jackpotGif = document.createElement("img");
      jackpotGif.src = "img/gif/jackpot.gif";
      jackpotGif.classList.add("jackpot-gif");
      document.body.appendChild(jackpotGif);
      setTimeout(() => {
        jackpotGif.classList.add("fade-out");
        setTimeout(() => jackpotGif.remove(), 500);
      }, 3000);
    }
  }
}
