/* =========================================================
   THE HEIST
   PLAYER SYSTEM
========================================================= */


/* ---------------------------------------------------------
   GAME PLAYERS
--------------------------------------------------------- */

let players = [];


/* ---------------------------------------------------------
   CURRENT PLAYER
--------------------------------------------------------- */

let currentPlayerIndex = 0;


/* ---------------------------------------------------------
   CREATE PLAYERS
--------------------------------------------------------- */

function createPlayersFromSetup() {

    const inputs =
        document.querySelectorAll(".player-name-input");


    players = [];


    inputs.forEach((input, index) => {

        const name =
            input.value.trim();


        players.push({

            id: index + 1,

            name: name,

            character: null,

            role: null,

            secret: null,

            testimony: null,

            vote: null,

            score: 0,

            isThief: false

        });

    });


    currentPlayerIndex = 0;

}


/* ---------------------------------------------------------
   GET CURRENT PLAYER
--------------------------------------------------------- */

function getCurrentPlayer() {

    return players[currentPlayerIndex];

}


/* ---------------------------------------------------------
   SET CHARACTER
--------------------------------------------------------- */

function setPlayerCharacter(character) {

    const player =
        getCurrentPlayer();


    player.character = character;

}


/* ---------------------------------------------------------
   MOVE TO NEXT PLAYER
--------------------------------------------------------- */

function nextPlayer() {

    currentPlayerIndex++;

}


/* ---------------------------------------------------------
   RESET CURRENT PLAYER
--------------------------------------------------------- */

function resetCurrentPlayer() {

    currentPlayerIndex = 0;

}


/* ---------------------------------------------------------
   UPDATE HEADER
--------------------------------------------------------- */

function updatePlayerHeader() {

    const player =
        getCurrentPlayer();


    if (!player) {

        return;

    }


    const nameElement =
        document.getElementById(
            "current-player-name"
        );


    if (nameElement) {

        nameElement.textContent =
            player.name.toUpperCase();

    }


    const avatarElement =
        document.getElementById(
            "current-player-avatar"
        );


    if (avatarElement && player.character) {

        avatarElement.textContent =
            player.character.emoji;

    }

}