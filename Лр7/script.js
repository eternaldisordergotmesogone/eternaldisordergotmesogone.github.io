const answers = ["Yes", "No", "Maybe", "Definitely", "Unlikely", "Ask again later"];
const questionInput = document.getElementById("questionInput");
const answerEl = document.getElementById("answer");
const askBtn = document.getElementById("askBtn");
const ball = document.getElementById("ball");

askBtn.addEventListener("click", () => {
  const question = questionInput.value.trim();
  if (question === "") {
    alert("Будь ласка, введи запитання!");
    return;
  }
  if (question === "?") {
    alert("Потрібно написати запитання, а не лише знак питання!");
    return;
  }
  if (!question.endsWith("?")) {
    alert("Запитання має закінчуватись знаком питання (?)");
    return;
  }
  answerEl.textContent = "...";

  setTimeout(() => {
    const randomAnswer = answers[Math.floor(Math.random() * answers.length)];
    answerEl.textContent = randomAnswer;
  }, 1000);
});


ball.addEventListener("click", () => {
  askBtn.click();
});
