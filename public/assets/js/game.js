// Initialize Firebase
var config = {
    apiKey: "AIzaSyBYenqHsWI5qZoTGbTbIZAg6aCAJtzYnco",
    authDomain: "project-2-23ed1.firebaseapp.com",
    databaseURL: "https://project-2-23ed1.firebaseio.com",
    projectId: "project-2-23ed1",
    storageBucket: "project-2-23ed1.appspot.com",
    messagingSenderId: "881504267339"
};
firebase.initializeApp(config);
var database = firebase.database();
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
var $answerOneVote = $("#answerOneButton");
var $answerTwoVote = $("#answerTwoButton");
var $answerQuestionBtn = $("#answerQuestionBtn");
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
var currentPlayers = 0;
var currentArray = [];
var updated = false;
var randomQuestions = [];
var question1;
var question2;
var question3;
var question4;
var questionsDisplayed = false;
var playerId;
var answer11;
var answer12;
var answer21;
var answer22;
var answer31;
var answer32;
var answer41;
var answer42;
var bird = false;
var answerPush = 0;

function initWaiting(gameTitle) {
    $("#displayGameTitle").text('Game Title:' + gameTitle);
    // Updating the html when aa child is added to firebase
    database.ref(gameTitle).on("child_added", function (childSnapshot) {
        if (childSnapshot.val().player === "start") {
            $("#answerQuestions").fadeIn();
            document.getElementById("playerWaitingBlock").style.display = "none";
            startTimer();
            decrement();
        } else {
            console.log(childSnapshot.val().id)
            console.log(childSnapshot.val().gameName);
            console.log(childSnapshot.val().player);
            if (childSnapshot.val().player) {
                $("#currentPlayers").append("<li>" + childSnapshot.val().player + "</li>");
            }
        };
    })


    if (hostName) {
        $("#playerWaitingBlock").fadeIn();
        document.getElementById("hostInfoBlock").style.display = "none";
    } else {
        $("#playerWaitingBlock").fadeIn();
        document.getElementById("playerInfoBlock").style.display = "none";
        document.getElementById("startGameBtn").style.display = "none";

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
    database.ref(gameTitle).push({
        gameName: gameTitle,
        player: "start"
    })
};
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
    function writeHostData(userId, gameName) {
        database.ref(gameName + "/" + userId).set({
            gameName: gameTitle,
            player: hostName,
            id: 1
        });
        playerId = 1;

    }
    writeHostData(hostName, gameTitle);

    hideInitialInfo();
    // passing arguments just incase
    initWaiting(gameTitle, hostName);
}
var submitPlayer = function (event) {
    event.preventDefault;
    playerName = $("#playerName").val().trim();
    localStorage.name = playerName;
    gameTitle = $("#playerGameTitle").val().trim();
    database.ref(gameTitle).on("child_added", function (childSnapshot) {
        console.log(childSnapshot.val().id);
        if (!updated) {
            currentPlayers++;
            console.log(currentPlayers);
            function writePlayerData(userId, gameName) {
                database.ref(gameName + "/" + userId).set({
                    gameName: gameTitle,
                    player: playerName,
                    id: currentPlayers
                })
                playerId = currentPlayers;
            }
            pullQuestions();
            questionDisplay();
            writePlayerData(playerName, gameTitle);
            updated = true;
        }
    })



    // sending new players data to firebase
    // function writePlayerData(userId, gameName) {
    //     database.ref(gameName + "/" + userId).set({
    //         gameName: gameTitle,
    //         player: playerName,
    //         id: currentPlayers,

    //     });
    // }
    // writePlayerData(playerName, gameTitle);
    hideInitialInfo();
    initWaiting(gameTitle, playerName);
}

function pushQuestions() {
    database.ref(gameTitle + "/questions").set({
        question1: randomQuestions[0],
        question2: randomQuestions[1],
        question3: randomQuestions[2],
        question4: randomQuestions[3],
    })
};

function pullQuestions() {
    database.ref(gameTitle).on("child_added", function (childSnapshot) {
        if (childSnapshot.val().question1) {
            question1 = childSnapshot.val().question1;
        }
        if (childSnapshot.val().question2) {
            question2 = childSnapshot.val().question2;
        }
        if (childSnapshot.val().question3) {
            question3 = childSnapshot.val().question3;
        }
        if (childSnapshot.val().question4) {
            question4 = childSnapshot.val().question4;
        }
    });
};

function pullAnswers() {
    database.ref(gameTitle +"/answers").on("child_added", function (childSnapshot) {
        if (answerPush === 0) {
        answer11 = childSnapshot.val().answerOne,
        answer12 = childSnapshot.val().answerTwo,
        answerPush++
        } else if (answerPush === 1) {
        answer21 = childSnapshot.val().answerOne,
        answer22 = childSnapshot.val().answerTwo,
        answerPush++
        } else if (answerPush === 2) {
        answer31 = childSnapshot.val().answerOne,
        answer32 = childSnapshot.val().answerTwo,
        answerPush++ 
        } else if (answerPush === 3) {
        answer41 = childSnapshot.val().answerOne,
        answer42 = childSnapshot.val().answerTwo,
        answerPush++
        } else if (answerPush === 4) {
        console.log("answer 11:" + answer11);
        console.log("answer 12:" + answer12);
        console.log("answer 21:" + answer21)
        console.log("answer 22:" + answer22);
        console.log("answer 31:" + answer31);
        console.log("answer 32" + answer32)
        console.log("answer 41" + answer41);
        console.log("answer 42" + answer42);
        }
    });
}

function questionDisplay() {
    database.ref(gameTitle).on("child_added", function (childSnapshot) {
        if (childSnapshot.val().player === playerName || childSnapshot.val().player === hostName) {
            if (childSnapshot.val().id === 1) {
                $("#question1").text(question1)
                $("#question2").text(question2)
            } else if (childSnapshot.val().id === 3) {
                $("#question1").text(question2)
                $("#question2").text(question3)
            } else if (childSnapshot.val().id === 4) {
                $("#question1").text(question3)
                $("#question2").text(question4)
            } else if (childSnapshot.val().id === 5) {
                $("#question1").text(question1)
                $("#question2").text(question4)
            }
        }
    })
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
        if (!bird) {
        database.ref(gameTitle).push({
            gameName: gameTitle,
            player: "bird"});
        }
        bird = true;
        timeUp();
    }
}
var submitAnswers = function (event) {
    event.preventDefault;
    document.getElementById("submitAnswers").style.display = "none";
    $("#answerSubAlert").fadeIn();
    var answerOne = $("#answerOne").val().trim();
    var answerTwo = $("#answerTwo").val().trim();

    function pushAnswers() {
        if (playerId === 1) {
            database.ref(gameTitle + "/answers/question1").update({
                answerOne: answerOne
            });
            database.ref(gameTitle + "/answers/question2").update({
                answerOne: answerTwo
            });
        }
        if (playerId === 3) {
            database.ref(gameTitle + "/answers/question2").update({
                answerTwo: answerOne
            });
            database.ref(gameTitle + "/answers/question3").update({
                answerOne: answerTwo
            });
        }
        if (playerId === 4) {
            database.ref(gameTitle + "/answers/question3").update({
                answerTwo: answerOne
            });
            database.ref(gameTitle + "/answers/question4").update({
                answerOne: answerTwo
            });
        }
        if (playerId === 5) {
            database.ref(gameTitle + "/answers/question4").update({
                answerTwo: answerTwo
            });
            database.ref(gameTitle + "/answers/question1").update({
                answerTwo: answerOne
            });
        }
    }
    pushAnswers();

    database.ref(gameTitle).on("child_added", function (childSnapshot) {
    if (childSnapshot.val().player === "bird") {
        pullAnswers();
    }
})
}
var voteAnswerOne = function (event) {
    event.preventDefault;
    var vote1 = 1;
    var vote2 = 0;
    localStorage.vote1 = vote1;
    localStorage.vote2 = vote2;
    document.getElementById("answerOneButton").style.display = "none";
    document.getElementById("answerTwoButton").style.display = "none";
    $("#voteOneSubDisplay").fadeIn();
}
var voteAnswerTwo = function (event) {
    event.preventDefault;
    var vote1 = 0;
    var vote2 = 1;
    localStorage.vote1 = vote1;
    localStorage.vote2 = vote2;
    document.getElementById("answerOneButton").style.display = "none";
    document.getElementById("answerTwoButton").style.display = "none";
    $("#voteTwoSubDisplay").fadeIn();
}


// function that triggers when timeLeft = 0. changes the counter value
// in localstorage. depending on that value we cycle through questions
// from the database and display player responses. eventually display
// scores at the end of the game
function timeUp() {
    stop();
    counter++;
    localStorage.counter = counter
    counterCheck();
}

// *
// *
// THIS SECTION generates a random series of questions, 
// then assigns TWO questions to each player
// Each player shares one question with each other player
// This is hard-coded at the function beginning at 178
var questions = [];
var getQuestion = function (event) {
    event.preventDefault;
    var randomArray = [];
    var players = 4; // this is determined by the number of players in our game
    var totQuestions = 31; // this refers to the number of questions in our primary questions table
    var randomQuest = function () {
        for (var r = 0; randomArray.length < players; r++) {
            var random = Math.floor(Math.random() * totQuestions);
            if (randomArray.indexOf(random) === -1) {
                randomArray.push(random);
            }
            else {
                randomQuest();
            }
        }
    }
    randomQuest()
    $.get("/api/questions", function (data) {
        questions = data;
        for (var q = 0; q < 4; q++) {
            randomQuestions.push(questions[randomArray[q]].quest_text);
            // console.log(questions[randomArray[q]].quest_text);
        }
        console.log("Our array: ", randomQuestions);
        // function to assign random questions to each player

        pushQuestions();
        pullQuestions();
        questionDisplay();
    });
}
// *
// *
function switchVoteButtons() {
    document.getElementById("answerOneButton").style.display = "block";
    document.getElementById("answerTwoButton").style.display = "block";
    document.getElementById("voteOneSubDisplay").style.display = "none";
    document.getElementById("voteTwoSubDisplay").style.display = "none";
}

//simple function to return the counter value in localStorage
//for use in a switch case with counterSwitch var
function counterCheck() {
    switch (counter) {
        case 1:
            answersToVoting();
            $("#questionHeader").text(question1);
            answerOneDisplay.text(answer11);
            answerTwoDisplay.text(answer12);
            timeLeft = 10;
            startTimer();
            decrement();
            break
        case 2:
            questionHeaderDisplay.text(question2);
            switchVoteButtons();
            answerOneDisplay.text(answer21);
            answerTwoDisplay.text(answer22);
            timeLeft = 10;
            startTimer();
            decrement();
            break
        case 3:
            questionHeaderDisplay.text(question3);
            switchVoteButtons();
            answerOneDisplay.text(answer31);
            answerTwoDisplay.text(answer32);
            timeLeft = 10;
            startTimer();
            decrement();
            break
        case 4:
            questionHeaderDisplay.text(question4);
            switchVoteButtons();
            answerOneDisplay.text(answer41);
            answerTwoDisplay.text(answer42);
            timeLeft = 10;
            startTimer();
            decrement();
            break
    }
}
function switchVoteButtons() {
    document.getElementById("answerOneButton").style.display = "block";
    document.getElementById("answerTwoButton").style.display = "block";
    document.getElementById("voteOneSubDisplay").style.display = "none";
    document.getElementById("voteTwoSubDisplay").style.display = "none";
};

//function to stop timer
function stop() {
    clearInterval(intervalId);
}
//EVENT HANDLERS
$startGameBtn.on("click", startGame);

$hostSubBtn.on("click", getQuestion);
$hostSubBtn.on("click", submitHost);


$playerSubBtn.on("click", submitPlayer);
$hostBtn.on("click", revealHostInfo);
$playerBtn.on("click", revealPlayerInfo);

$submitAnswers.on("click", submitAnswers);
$answerOneVote.on("click", voteAnswerOne);
$answerTwoVote.on("click", voteAnswerTwo);

$answerQuestionBtn.on("click", getQuestion);