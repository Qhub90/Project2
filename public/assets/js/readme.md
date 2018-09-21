ASSETS/JS README

The index.js file handles the index page, which contains the welcome.
Users have the option to "host" or "join" a game, as well as post their own questions to our database.
The index also contains a "How to Play" modal, which floats above the page when selected.

The game.js file is the primary engine. It handles the following tasks:

- initializing the connection to Firebase
- getting the questions from our database
- collecting host and player info
- randomly assigning questions to players
- creating an instance of the game on Firebase
- starting the game, managing timers
- receiving player answers
- counting and displaying the votes for each player's answers.