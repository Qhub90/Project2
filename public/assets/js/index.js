// VARIABLES

// button variables

var $questionText = $("#question-text");
var $submitQuestionBtn = $("#submitQuestion");
var $howToPlay = $("#howToPlayButton")
var modal = document.getElementById('howToPlayModal');


localStorage.clear();
localStorage.counter = 0;
counter = 0;


// FUNCTIONS

// function to submit a new question to our database

var submitNewQuestion = function (event) {
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

  // Constructing a newPost object to hand to the database
  var newQuestion = {
    quest_text: $questionText.val().trim()
  };

  console.log(newQuestion);

  submitQuestion(newQuestion);
};

// Submits a new quesion and brings user to blog page upon completion
function submitQuestion(Question) {
  $.post("/api/questions/", Question, function () {
    window.location.href = "/";
  });
}

var displayModal = function(event) {
  event.preventDefault;
  $("#howToPlayModal").fadeIn();
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    $("#howToPlayModal").fadeOut();
  }
}

//EVENT HANDLERS

$submitQuestionBtn.on("click", submitNewQuestion);
$howToPlay.on("click", displayModal)


