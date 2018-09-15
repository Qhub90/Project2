DROP DATABASE IF EXISTS exampledb;
CREATE DATABASE exampledb;

CREATE TABLE questions (
    id INT AUTO_INCREMENT NOT NULL,
    quest_text VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE players (
    player_id INT AUTO_INCREMENT NOT NULL,
    player_name VARCHAR(255) NOT NULL,
    games_played INT,
    game_score INT DEFAULT 0,
    PRIMARY KEY (player_id)
)