DROP DATABASE IF EXISTS exampledb;
CREATE DATABASE exampledb;

CREATE TABLE questions (
    id INT AUTO_INCREMENT NOT NULL,
    quest_text VARCHAR(255) NOT NULL,
    blanks INT NOT NULL DEFAULT 1,
    tag1 VARCHAR(64) NOT NULL,
    tag2 VARCHAR(64) DEFAULT "",
    tag3 VARCHAR(64) DEFAULT "",
    tag4 VARCHAR(64) DEFAULT "",
    tag5 VARCHAR(64) DEFAULT "",
    PRIMARY KEY (id)
);

CREATE TABLE players (
    player_id INT AUTO_INCREMENT NOT NULL,
    player_name VARCHAR(255) NOT NULL,
    games_played INT,
    game_score INT DEFAULT 0,
    PRIMARY KEY (player_id)
)