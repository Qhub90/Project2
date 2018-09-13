// Get references to page elements
var $questionText = $("#question-text");
var $submitQuestionBtn = $("#submitQuestion");
var $hostBtn = $("#host");
var $playerBtn = $("#player");
var $hostSubBtn = $("#submitHost");
var $playerSubBtn = $("#submitPlayer");
var $startGameBtn = $("#startGameBtn");
var $submitAnswers = $("#submitAnswers");
var hostName;
var playerName;
var gameTitle;
var timeLeft = 30;

var submitNewQuestion = function(event) {
  event.preventDefault();
  var newQuestion = {
    text: $questionText.val().trim(),
  };
  if (!(newQuestion.text)) {
    alert("Nice try but submit a real question");
    return;
  }
  $questionText.val("");
  alert("Question submitted. Thanks!")
};

function hideInitialInfo() {
  document.getElementById("initialButtonsandInfo").style.display = "none" ;
}

function initWaiting() {
  if (hostName) {
    alert("you're the host!");
    document.getElementById("playerWaitingBlock").style.display = "block";
    $("#currentPlayers").append('<li>' + hostName + '</li>');
    $("#displayGameTitle").text(gameTitle);
  } else {
    alert("you're a player!");
    document.getElementById("playerWaitingBlock").style.display = "block";
    document.getElementById("startGameBtn").style.display = "none";
    $("#currentPlayers").append('<li>' + playerName + '</li>');
    $("#displayGameTitle").text(gameTitle);
  }
}

var revealHostInfo = function(event) {
  event.preventDefault;
  document.getElementById("playerInfoBlock").style.display = "none" ;
  document.getElementById("hostInfoBlock").style.display = "block" ;
}

var revealPlayerInfo = function(event) {
  event.preventDefault;
  document.getElementById("playerInfoBlock").style.display = "block" ;
  document.getElementById("hostInfoBlock").style.display = "none" ;
}

var submitHost = function(event) {
  event.preventDefault;
  hostName = $("#hostName").val().trim();
  localStorage.name = hostName;
  gameTitle = $("#hostGameTitle").val().trim();
  hideInitialInfo();
  alert("Hosting Game As " + hostName)
  initWaiting();
}

var submitPlayer = function(event) {
  event.preventDefault;
  playerName = $("#playerName").val().trim();
  localStorage.name = playerName;
  gameTitle = $("#playerGameTitle").val().trim();
  hideInitialInfo();
  alert("Joining Game As " + playerName)
  initWaiting();
}

var startGame = function(event) {
  event.preventDefault;
  alert("button works");
  document.getElementById("playerWaitingBlock").style.display = "none";
  document.getElementById("gameQuestion").style.display = "block" ;
  startTimer();
  decrement();
}

var submitAnswers = function(event) {
 event.preventDefault;
 var answerOne = $("#answerOne").val().trim();
 var answerTwo = $("#answerTwo").val().trim();
 localStorage.answerOne = answerOne;
 localStorage.answerTwo = answerTwo;
}

function startTimer() {
  intervalId = setInterval(decrement, 1000);
}

function decrement() {
  timeLeft--;
  $("#time-left").text("Time Left: " + timeLeft);
  if (timeLeft === 0) {
      stop();
      outOfTime();
  }
}

function stop() {
  clearInterval(intervalId);
}

$submitAnswers.on("click", submitAnswers);
$startGameBtn.on("click", startGame);

$hostSubBtn.on("click", submitHost);
$playerSubBtn.on("click", submitPlayer);

$hostBtn.on("click", revealHostInfo);
$playerBtn.on("click", revealPlayerInfo);

$submitQuestionBtn.on("click", submitNewQuestion);
