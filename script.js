var questions = [
  {
    question: "Commonly used data types DO NOT include:",
    choices: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts",
  },
  {
    question:
      "The condition in an if / else statement is enclosed within ____.",
    choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
    answer: "parentheses",
  },
];

var questionEl = document.querySelector("#question");
var optionListEl = document.querySelector("#option-list");
var questionResultEl = document.querySelector("#question-result");
var timerEl = document.querySelector("#timer");

var questionIndex = 0;
var correctCount = 0;
var time = 20;
var intervalId;

// ## Instructions
// 1. At the end of the quiz, ask the user for their name.
// 2. Store their name and score in localstorage.
// 3. Show the highscore list in descending order (You will need to reserach the sort function for Arrays)

function endQuiz() {
  clearInterval(intervalId);

  document.body.textContent = "";

  var gameOverDiv = document.createElement("div");
  gameOverDiv.setAttribute("class", "container");
  gameOverDiv.setAttribute("id", "gameOver");
  document.body.append(gameOverDiv);
  gameOverDiv.innerHTML = "Game over. You scored " + correctCount + "!";

  setTimeout(showHighScore, 2000);
  // wait 2 seconds and call showHighScore;
}

function toHighScore() {
  clearInterval(intervalId);

  document.body.textContent = "";

  var high_scores = localStorage.getItem("scores");

  if (!high_scores) {
    high_scores = [];
  } else {
    high_scores = JSON.parse(high_scores);
  }

  // high_scores.push({ name: name, score: correctCount });

  localStorage.setItem("scores", JSON.stringify(high_scores));

  high_scores.sort(function (a, b) {
    return b.score - a.score;
  });

  var bigDiv = document.createElement("div");
  bigDiv.setAttribute("class", "container");
  document.body.append(bigDiv);

  var contentUL = document.createElement("ul");
  contentUL.id = "userList";

  for (var i = 0; i < high_scores.length; i++) {
    var contentLI = document.createElement("li");
    contentLI.id = "userScore";

    contentLI.textContent =
      "Name: " + high_scores[i].name + " | " + " Score: " + high_scores[i].score;
    contentUL.appendChild(contentLI);
  }

  bigDiv.appendChild(contentUL);


  //Clear High Score button...............................
  var clearButton = document.createElement("button");
  clearButton.setAttribute("id", "clearButton");
  clearButton.textContent = "Clear High Scores";
  bigDiv.append(clearButton);
  clearButton.addEventListener("click", function () {
    localStorage.clear();
    contentUL.textContent = "";
  });

  var backButton = document.createElement("button");
  backButton.setAttribute("id", "backButton");
  backButton.textContent = "Go back";
  bigDiv.append(backButton);

  backButton = document.getElementById("backButton");
  backButton.addEventListener("click", function () {
    location.reload();
  });

}


function showHighScore() {

  document.body.textContent = "";

  var name = prompt("Please enter your name");

  var high_scores = localStorage.getItem("scores");

  if (!high_scores) {
    high_scores = [];
  } else {
    high_scores = JSON.parse(high_scores);
  }

  high_scores.push({ name: name, score: correctCount });

  localStorage.setItem("scores", JSON.stringify(high_scores));

  high_scores.sort(function (a, b) {
    return b.score - a.score;
  });

  var bigDiv = document.createElement("div");
  bigDiv.setAttribute("class", "container");
  document.body.append(bigDiv);

  var contentUL = document.createElement("ul");
  contentUL.id = "userList";

  for (var i = 0; i < high_scores.length; i++) {
    var contentLI = document.createElement("li");
    contentLI.id = "userScore";
    contentLI.textContent =
      "Name: " + high_scores[i].name + " | " + " Score: " + high_scores[i].score;
    contentUL.appendChild(contentLI);

  }

  bigDiv.appendChild(contentUL);

  var clearButton = document.createElement("button");
  clearButton.setAttribute("id", "clearButton");
  clearButton.textContent = "Clear High Scores";
  bigDiv.append(clearButton);
  clearButton.addEventListener("click", function () {
    localStorage.clear();
    contentUL.textContent = "";
  });
  
  var backButton = document.createElement("button");
  backButton.setAttribute("id", "backButton");
  backButton.textContent = "Start over";
  bigDiv.append(backButton);

  backButton = document.getElementById("backButton");
  backButton.addEventListener("click", function () {
    location.reload();
  });
}

function updateTime() {
  time--;
  timerEl.textContent = "Time: " + time;
  if (time <= 0) {
    endQuiz();
  }
}

function renderQuestion() {

  var startSection = document.querySelector(".start");
  startSection.style.display = "none";

  var questionSection = document.querySelector(".questionSection");
  questionSection.style.display = "block";

  if (time == 0) {
    updateTime();
    return;
  }

  intervalId = setInterval(updateTime, 1000);
  questionEl.textContent = questions[questionIndex].question;

  optionListEl.innerHTML = "";
  questionResultEl.innerHTML = "";

  var choices = questions[questionIndex].choices;
  var choicesLenth = choices.length;

  for (var i = 0; i < choicesLenth; i++) {
    var questionListItem = document.createElement("li");
    questionListItem.id = "questionLI";
    questionListItem.textContent = choices[i];
    optionListEl.append(questionListItem);
  }
}

function nextQuestion() {
  questionIndex++;
  if (questionIndex === questions.length) {
    time = 0;
  }
  renderQuestion();
}

function checkAnswer(event) {
  clearInterval(intervalId);
  if (event.target.matches("li")) {
    var answer = event.target.textContent;
    if (answer === questions[questionIndex].answer) {
      questionResultEl.textContent = "Correct!";
      correctCount++;
    } else {
      questionResultEl.textContent = "Incorrect!";
      time = time - 2;
      timerEl.textContent = "Time: " + time;
    }
  }
  setTimeout(nextQuestion, 2000);
}


var scoreButton = document.getElementById("highScore");
scoreButton.addEventListener("click", toHighScore);

var startButton = document.getElementById("startButton");
startButton.addEventListener("click", renderQuestion);


optionListEl.addEventListener("click", checkAnswer);
