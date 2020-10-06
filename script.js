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
  var body = document.body;
  body.innerHTML = "Game over, You scored " + correctCount + "!";

  setTimeout(showHighScore, 2000);
  // wait 2 seconds and call showHighScore;
}

function showHighScore() {
  // write code here
  var user = prompt("What is your name?");
  var userArray = [];

  localStorage.setItem("user", user);
  localStorage.setItem("highScore", correctCount);

  var userObj = {
    name: user,
    score: correctCount
  }

  userArray.push(userObj);
  userArraysort((a,b)=>a-b);

  console.log(userArray);

}

function updateTime() {
  time--;
  timerEl.textContent = "Time: " + time;
  if (time <= 0) {
    endQuiz();
  }
}

function renderQuestion() {
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

renderQuestion();
optionListEl.addEventListener("click", checkAnswer);
