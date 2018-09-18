// changing the page into the 'waiting for players' state
// alerts for testing purposes

var $questionText = $("#question-text");
var $submitQuestionBtn = $("#submitQuestion");
var $setupBtn = $("#setup");
var $hostBtn = $("#host");
var $playerBtn = $("#player");
var $hostSubBtn = $("#submitHost");
var $playerSubBtn = $("#submitPlayer");
var $startGameBtn = $("#startGameBtn");
var $submitAnswers = $("#submitAnswers");
var $answerOneVote = $("#answerOneVote");
var $answerTwoVote = $("#answerTwoVote");

var hostName;
var playerName;
var gameTitle;
var timeLeft = 10;
var counter = parseInt(localStorage.counter);

localStorage.clear();
localStorage.counter = 0;
counter = 0;

var questionHeaderDisplay = $("#questionHeader");
var answerOneDisplay = $("#answerOneDisplay");
var answerTwoDisplay = $("#answerTwoDisplay");

function initWaiting() {
    if (hostName) {
        $("#playerWaitingBlock").fadeIn();
        document.getElementById("hostInfoBlock").style.display = "none";
        $("#currentPlayers").append('<li>' + hostName + '</li>');
        $("#displayGameTitle").text(gameTitle);
    } else {
        $("#playerWaitingBlock").fadeIn();
        document.getElementById("playerInfoBlock").style.display = "none";
        document.getElementById("startGameBtn").style.display = "none";
        $("#currentPlayers").append('<li>' + playerName + '</li>');
        $("#displayGameTitle").text(gameTitle);
    }
}

var revealHostInfo = function (event) {
    event.preventDefault;
    $("#hostInfoBlock").fadeIn();
    document.getElementById("playerInfoBlock").style.display = "none";
}

var revealPlayerInfo = function (event) {
    event.preventDefault;
    $("#playerInfoBlock").fadeIn();
    document.getElementById("hostInfoBlock").style.display = "none";
}

//this function changes the page from 'waiting for player' to 'game started' 
// when host clicks start game. also starts the timer for players to submit answers

var startGame = function (event) {
    event.preventDefault;
    $("#answerQuestions").fadeIn();
    document.getElementById("playerWaitingBlock").style.display = "none";
    startTimer();
    decrement();
}

//function to capture players answers to question 1 and 2

function answersToVoting() {
    $("#votingBlock").fadeIn();
    document.getElementById("answerQuestions").style.display = "none";
}

var submitHost = function (event) {
    event.preventDefault;
    hostName = $("#hostName").val().trim();
    localStorage.name = hostName;
    gameTitle = $("#hostGameTitle").val().trim();
    hideInitialInfo();
    initWaiting();
}

var submitPlayer = function (event) {
    event.preventDefault;
    playerName = $("#playerName").val().trim();
    localStorage.name = playerName;
    gameTitle = $("#playerGameTitle").val().trim();
    hideInitialInfo();
    initWaiting();
}

function hideInitialInfo() {
    document.getElementById("initialButtonsandInfo").style.display = "none";
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

var submitAnswers = function (event) {
    event.preventDefault;
    document.getElementById("submitAnswers").style.display = "none";
    $("#answerSubAlert").fadeIn();
    var answerOne = $("#answerOne").val().trim();
    var answerTwo = $("#answerTwo").val().trim();
    localStorage.answerOne = answerOne;
    localStorage.answerTwo = answerTwo;
}

var voteOne = function (event) {
    event.preventDefault;
    document.getElementById("answerOneVote").style.display = "none";
    document.getElementById("answerTwoVote").style.display = "none";
    $("#voteOneSubDisplay").fadeIn();
    localStorage.voteOne = 1;
};

var voteTwo = function (event) {
    event.preventDefault;
    document.getElementById("answerOneVote").style.display = "none";
    document.getElementById("answerTwoVote").style.display = "none";
    $("#voteTwoSubDisplay").fadeIn();
    localStorage.voteTwo = 1;
};

function revealVoteButtons() {
    localStorage.voteOne = 0;
    localStorage.voteTwo = 0;
    document.getElementById("answerOneVote").style.display = "block";
    document.getElementById("answerTwoVote").style.display = "block";
    document.getElementById("voteOneSubDisplay").style.display = "none";
    document.getElementById("voteTwoSubDisplay").style.display = "none";
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
            revealVoteButtons();
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

//function to stop timer

function stop() {
    clearInterval(intervalId);
}

startGame();

//EVENT HANDLERS


$startGameBtn.on("click", startGame);

$hostSubBtn.on("click", submitHost);
$playerSubBtn.on("click", submitPlayer);

$hostBtn.on("click", revealHostInfo);
$playerBtn.on("click", revealPlayerInfo);

$submitAnswers.on("click", submitAnswers);

$answerOneVote.on("click", voteOne);
$answerTwoVote.on("click", voteTwo);
