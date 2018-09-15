
// VARIABLES

// The API object contains methods for each kind of request we'll make
var API = {
  saveQuestion: function(question) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/questions",
      data: JSON.stringify(question)
    });
  }
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var submitNewQuestion = function(event) {
  event.preventDefault();

  var question = {
    quest_text: $questionText.val().trim(),
  };

  if (!(question.quest_text)) {
    alert("You must enter a question!");
    return;
  }

  API.saveQuestion(question)

  $questionText.val("");
  console.log("submitted Q to db");
};

// button variables

var $questionText = $("#question-text");
var $submitQuestionBtn = $("#submitQuestion");
var $setupBtn = $("#setup")
var $hostBtn = $("#host");
var $playerBtn = $("#player");
var $hostSubBtn = $("#submitHost");
var $playerSubBtn = $("#submitPlayer");
var $startGameBtn = $("#startGameBtn");
var $submitAnswers = $("#submitAnswers");

// blank variables we're going to define in functions

var hostName;
var playerName;
var gameTitle;
var timeLeft = 10;
var counter = parseInt(localStorage.counter);

// display variables for our switch case

var questionHeaderDisplay = $("#questionHeader");
var answerOneDisplay = $("#answerOneDisplay");
var answerTwoDisplay = $("#answerTwoDisplay");

//clearing localStorage on each reload and setting counter
// to 0 for testing

localStorage.clear();
localStorage.counter = 0;
counter = 0;


// FUNCTIONS

// function to submit a new question to our database


// hiding the initial buttons and submit question block when the page is
// 'waiting for players' or playing the game

function hideInitialInfo() {
  document.getElementById("initialButtonsandInfo").style.display = "none";
}

// revealing the 'name' and 'game title' submit options for host and player separately

var revealHostInfo = function (event) {
  event.preventDefault;
  document.getElementById("playerInfoBlock").style.display = "none";
  document.getElementById("hostInfoBlock").style.display = "block";
}

var revealPlayerInfo = function (event) {
  event.preventDefault;
  document.getElementById("playerInfoBlock").style.display = "block";
  document.getElementById("hostInfoBlock").style.display = "none";
}

// the individual submit options for host and player to capture
// player name and game title

var submitHost = function (event) {
  event.preventDefault;
  hostName = $("#hostName").val().trim();
  localStorage.name = hostName;
  gameTitle = $("#hostGameTitle").val().trim();
  hideInitialInfo();
  alert("Hosting Game As " + hostName)
  initWaiting();
}

var submitPlayer = function (event) {
  event.preventDefault;
  playerName = $("#playerName").val().trim();
  localStorage.name = playerName;
  gameTitle = $("#playerGameTitle").val().trim();
  hideInitialInfo();
  alert("Joining Game As " + playerName)
  initWaiting();
}

//function to capture players answers to question 1 and 2

var submitAnswers = function (event) {
  event.preventDefault;
  var answerOne = $("#answerOne").val().trim();
  var answerTwo = $("#answerTwo").val().trim();
  localStorage.answerOne = answerOne;
  localStorage.answerTwo = answerTwo;
}

function answersToVoting() {
  document.getElementById("answerQuestions").style.display = "none";
  document.getElementById("votingBlock").style.display = "block";
}

//simple start timer function

function startTimer() {
  intervalId = setInterval(decrement, 1000);
}

//function to decrease time left in all timers

function decrement() {
  timeLeft--;
  $("#time-left").text("Time Left: " + timeLeft);
  $("#voting-time-left").text("Time Left: " + timeLeft);
  if (timeLeft === 0) {
    timeUp();
  }
}

// function that triggers when timeLeft = 0. changes the counter value
// in localstorage. depending on that value we cycle through questions
// from the database and display player responses. eventually display
// scores at the end of the game

function timeUp() {
  stop();
  alert("TIME'S UP!")
  counter++;
  localStorage.counter = counter
  counterCheck();
}

//simple function to return the counter value in localStorage
//for use in a switch case with counterSwitch var

function counterCheck() {
  switch (counter) {
    case 1:
      alert("QUESTION 1");
      answersToVoting();
      questionHeaderDisplay.text("What is the strangest place you made whoopie?");
      answerOneDisplay.text(localStorage.answerOne);
      answerTwoDisplay.text("In a dumpster!");
      timeLeft = 10;
      startTimer();
      decrement();
      break

    case 2:
      alert("QUESTION 2");
      questionHeaderDisplay.text("What is your favorite food?");
      answerOneDisplay.text("This question sucks!");
      answerTwoDisplay.text(localStorage.answerTwo);
      timeLeft = 10;
      startTimer();
      decrement();
      break

    case 3:
      alert("GAME OVER!")
  }
}

//EVENT HANDLERS

$setupBtn.on("click", setup)
$submitAnswers.on("click", submitAnswers);
$submitQuestionBtn.on("click", submitNewQuestion);

