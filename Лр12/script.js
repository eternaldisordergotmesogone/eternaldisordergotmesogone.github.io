let easyWords = [
    { word: "apple", translate: "яблуко" },
    { word: "planet", translate: "планета" },
    { word: "freedom", translate: "свобода" },
    { word: "language", translate: "мова" },
    { word: "computer", translate: "комп'ютер" },
    { word: "travel", translate: "подорожувати" },
    { word: "bicycle", translate: "велосипед" },
    { word: "sunlight", translate: "сонячне світло" },
    { word: "history", translate: "історія" },
    { word: "future", translate: "майбутнє" }
];

let mediumWords = [
    { word: "responsibility", translate: "відповідальність" },
    { word: "communication", translate: "спілкування" },
    { word: "environment", translate: "довкілля" },
    { word: "opportunity", translate: "можливість" },
    { word: "experience", translate: "досвід" },
    { word: "development", translate: "розвиток" },
    { word: "condition", translate: "умова" },
    { word: "direction", translate: "напрямок" },
    { word: "community", translate: "спільнота" },
    { word: "education", translate: "освіта" }
];

let hardWords = [
    { word: "acknowledgement", translate: "визнання" },
    { word: "consciousness", translate: "свідомість" },
    { word: "entrepreneurship", translate: "підприємництво" },
    { word: "vulnerability", translate: "вразливість" },
    { word: "interpretation", translate: "тлумачення" },
    { word: "sustainability", translate: "сталий розвиток" },
    { word: "approximation", translate: "наближення" },
    { word: "transformation", translate: "перетворення" },
    { word: "determination", translate: "рішучість" },
    { word: "collaboration", translate: "співпраця" }
];

let words = [];

let score = { attemp: 1, correct: 0, uncorrect: 0 };
let index = 0;

function getMark12(correct) {
    if (correct === 10) return 12;
    if (correct === 9) return 11;
    if (correct === 8) return 9;
    if (correct === 7) return 8;
    if (correct === 6) return 6;
    if (correct === 5) return 5;
    if (correct === 4) return 4;
    if (correct === 3) return 3;
    if (correct === 2) return 2;
    return 1;
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

$(document).ready(function () {
    $("#result").text(`${score.attemp}/10`).css("color", "white");
    $("#startTest").on("click", function () {
        let level = $("#levelSelectStart").val();

        if (level === "easy") words = [...easyWords];
        if (level === "medium") words = [...mediumWords];
        if (level === "hard") words = [...hardWords];

        shuffle(words);

        $("#word").text(words[0].word);

        $("#levelStart").fadeOut(300);
    });

    $("#translate").on("click", function () {

        let userAnswer = $("#answer").val().trim().toLowerCase();
        let correctAnswer = words[index].translate.toLowerCase();

        if (userAnswer === correctAnswer) {
            score.correct++;
            $("#result").text("Правильно!").css("color", "#4ade80");
        } else {
            score.uncorrect++;
            $("#result").text("Помилка! Правильно: " + correctAnswer)
                .css("color", "#f87171");
        }

        $("#correct").text(`Correct: ${score.correct}`);
        $("#uncorrect").text(`Uncorrect: ${score.uncorrect}`);

        setTimeout(() => {
            score.attemp++;
            $("#result").text(`${score.attemp}/10`).css("color", "white");
            index++;

            if (index >= words.length) {

                let mark = getMark12(score.correct);
                $("#levelText").text(`Ваша оцінка: ${mark} / 12`);
                $("#levelModal").addClass("active");

                $("#word").text("Слова закінчилися!");
                $("#answer").prop("disabled", true);
                $("#translate").prop("disabled", true);
                return;
            }

            $("#word").text(words[index].word);
            $("#answer").val("");

        }, 900);
    });

    $("#Dictionary").on("click", function () {
        $(".Translate-pages").addClass("active").removeClass("dis");
        $(".dictionary-pages").removeClass("active").addClass("dis");
        $("#wordList").empty();
    });

    $("#AllWord").on("click", function () {
        $(".Translate-pages").removeClass("active").addClass("dis");
        $(".dictionary-pages").addClass("active").removeClass("dis");

        $("#wordList").empty();
        words.forEach(w =>
            $("#wordList").append(`<li>${w.word} — ${w.translate}</li>`)
        );
    });

    $("#closeModal").on("click", function () {
        $("#levelModal").removeClass("active");
    });

});
