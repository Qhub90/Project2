OVERVIEW
--------

Game Setup

FunnyGuy is a web-based multiplayer game modeled after the Jackbox game "Quiplash." 
(It is similar to "Cards Against Humanity" or "Apples to Apples" for those familiar.)
In this version, the game is for four players who know in advance they will play together.
Future versions will add a "waiting room" function for playing with random opponents and different-sized games.

One player serves as the "host," and sets up the game by receiving and distributing a "game ID" to the other players.
Players join by submitting their names and the name of the game they received from their "host."

For every round of the game, each player is given fill-in-the-blank question or statement to answer (secretly). 
Each player answers one question in common with one other player, so players will vote on whose answer was funniest.
Example: in a four-player game, question 1 would be answered by player A and player B, question 2 by players B and C, question 3 by players C and D, and so on.

After each player has submitted their answers, the question-and-answer pairs are displayed one at a time, and each player casts a vote. The votes are counted, and the player with the most votes in favor of his answer "wins" the round.
In this version, there are two rounds, so each player answers two questions.

Players can also submit their own questions to the pre-populated database, even if they are not playing in a game.


App Setup
---------

Questions are stored permanently on a MySQL database run by sequelize.
Express handles the routing, and Firebase hosts each instance of the game.
(In this version, the only permanent data are the questions, so each instance of the game and players disappears at the end of the game. Future versions will allow players to create persistent profiles, store their game stats (W/L), and may preserve overall game data.)

The views are supported by Handlebars and designed with HTML, CSS bootstrap and Google Fonts.
