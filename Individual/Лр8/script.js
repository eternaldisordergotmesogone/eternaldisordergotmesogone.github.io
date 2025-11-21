let userName = prompt("Введіть своє ім'я:");
if (!userName) userName = "User";
document.getElementById("user-name").textContent = userName;

let userScore = 0;
let compScore = 0;

const userNum = document.getElementById("user-number");
const compNum = document.getElementById("comp-number");
const userScoreEl = document.getElementById("user-score");
const compScoreEl = document.getElementById("comp-score");
const resultEl = document.getElementById("result");
const generateBtn = document.getElementById("generate");

generateBtn.addEventListener("click", () => {
  if (userScore >= 3 || compScore >= 3) {
    resultEl.textContent = "Гра закінчена! Перезавантажте сторінку для нової гри.";
    return;
  }

  const userRandom = Math.floor(Math.random() * 10) + 1;
  const compRandom = Math.floor(Math.random() * 10) + 1;

  userNum.textContent = userRandom;
  compNum.textContent = compRandom;

  if (userRandom > compRandom) {
    userScore++;
    resultEl.textContent = `${userName} отримує бал!`;
  } else if (userRandom < compRandom) {
    compScore++;
    resultEl.textContent = `Комп'ютер отримує бал!`;
  } else {
    resultEl.textContent = "Нічия!";
  }

  userScoreEl.textContent = userScore;
  compScoreEl.textContent = compScore;

  if (userScore === 3) {
    resultEl.textContent = `${userName} переміг гру!`;
    generateBtn.disabled = true;
    generateBtn.style.background = "#ccc";
  } else if (compScore === 3) {
    resultEl.textContent = `Комп'ютер переміг гру!`;
    generateBtn.disabled = true;
    generateBtn.style.background = "#ccc";
  }
});
