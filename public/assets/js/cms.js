$(document).ready(function() {
    // Gets an optional query string from our url (i.e. ?post_id=23)
    var url = window.location.search;
    var postId;
    // Sets a flag for whether or not we're updating a post to be false initially
    var updating = false;

    var questionInput = $("#question-text");
    var questionButton = $("#submitQuestion");
    var questionForm = $("#submitQBlock")

    $(questionForm).on("submit", function handleFormSubmit(event) {
        event.preventDefault();
        // Wont submit the post if we are missing a body or a title
        if (!questionInput.val().trim()) {
        return;
        }
        // Constructing a newPost object to hand to the database
        var newQuestion = {
        quest_text: questionInput.val().trim()
        };

        console.log(newQuestion);

        // If we're updating a post run updatePost to update a post
        // Otherwise run submitPost to create a whole new post
        if (updating) {
        newQuestion.id = QuestionId;
        updateQuestion(newQuestion);
        }
        else {
        submitQuestion(newQuestion);
        }
    });

    // Submits a new quesion and brings user to blog page upon completion
    function submitQuestion(Question) {
        $.post("/api/questions/", Question, function() {
        window.location.href = "/";
        });
    }
});