let currentCase = null;
let currentPhase = "setup";

/* =========================================================
   THE HEIST
   Main Game Controller
========================================================= */


/* ---------------------------------------------------------
   SCREEN MANAGEMENT
--------------------------------------------------------- */
/* Load player system */
const screens = {

    home: document.getElementById("home-screen"),

    setup: document.getElementById("setup-screen"),

    character: document.getElementById("character-screen"),

    role: document.getElementById("role-screen"),

    game: document.getElementById("game-screen")

};


function showScreen(screenName) {

    Object.values(screens).forEach(screen => {

        screen.classList.remove("active");

    });


    screens[screenName].classList.add("active");

}


/* ---------------------------------------------------------
   HOME
--------------------------------------------------------- */

const startGameButton =
    document.getElementById("start-game-btn");


startGameButton.addEventListener("click", () => {

    showScreen("setup");

});


/* ---------------------------------------------------------
   PLAYER SETUP
--------------------------------------------------------- */

const playerList =
    document.getElementById("player-list");

const addPlayerButton =
    document.getElementById("add-player-btn");

const continueSetupButton =
    document.getElementById("continue-setup-btn");


let playerCount = 3;


addPlayerButton.addEventListener("click", () => {

    if (playerCount >= 6) {

        return;

    }


    playerCount++;


    const playerCard =
        document.createElement("div");

    playerCard.className = "player-card";


    playerCard.innerHTML = `

        <div class="player-number">
            ${String(playerCount).padStart(2, "0")}
        </div>

        <div class="player-avatar-placeholder">
            ?
        </div>

        <div class="player-input-wrapper">

            <label>
                INVESTIGATOR NAME
            </label>

            <input
                type="text"
                class="player-name-input"
                placeholder="Enter name"
                maxlength="16"
            >

        </div>

    `;


    playerList.appendChild(playerCard);


    if (playerCount === 6) {

        addPlayerButton.style.display = "none";

    }

});


/* ---------------------------------------------------------
   CHARACTER SCREEN
--------------------------------------------------------- */

continueSetupButton.addEventListener("click", () => {

    const inputs =
        document.querySelectorAll(".player-name-input");


    let valid = true;


    inputs.forEach(input => {

        if (!input.value.trim()) {

            input.focus();

            valid = false;

        }

    });


    if (!valid) {

        return;

    }


    /* Create our actual player objects */
    createPlayersFromSetup();


    showScreen("character");


    createCharacters();


    updateCharacterScreen();

});


/* ---------------------------------------------------------
   CHARACTER DATA
--------------------------------------------------------- */

const characters = [

    {
        id: "detective",
        name: "The Detective",
        emoji: "🕵️",
        accessory: "🔎",
        role: "Investigator",
        color: "character-blue"
    },

    {
        id: "scientist",
        name: "The Scientist",
        emoji: "🧑‍🔬",
        accessory: "⚗️",
        role: "Analyst",
        color: "character-cyan"
    },

    {
        id: "journalist",
        name: "The Journalist",
        emoji: "📰",
        accessory: "📝",
        role: "Reporter",
        color: "character-yellow"
    },

    {
        id: "artist",
        name: "The Artist",
        emoji: "🎨",
        accessory: "🎨",
        role: "Observer",
        color: "character-pink"
    },

    {
        id: "hacker",
        name: "The Hacker",
        emoji: "💻",
        accessory: "⌨️",
        role: "Technician",
        color: "character-purple"
    },

    {
        id: "guard",
        name: "The Guard",
        emoji: "🛡️",
        accessory: "🛡️",
        role: "Security",
        color: "character-green"
    },

    {
        id: "professor",
        name: "The Professor",
        emoji: "🎓",
        accessory: "📚",
        role: "Historian",
        color: "character-orange"
    },

    {
        id: "explorer",
        name: "The Explorer",
        emoji: "🧭",
        accessory: "🧭",
        role: "Adventurer",
        color: "character-red"
    }

];


let selectedCharacter = null;


function createCharacters() {

    const grid =
        document.getElementById("character-grid");


    grid.innerHTML = "";


    characters.forEach(character => {

        const card =
            document.createElement("div");


        card.className = "character-card";


        card.innerHTML = `

            <div class="mini-character ${character.color}">

                <div class="character-accessory">
                    ${character.accessory}
                </div>

                <div class="character-head">

                    <div class="character-eyes">

                        <span class="character-eye"></span>
                        <span class="character-eye"></span>

                    </div>

                </div>

                <div class="character-hair"></div>

                <div class="character-body">

                    <div class="character-detail"></div>

                </div>

                <div class="character-legs">

                    <span class="character-leg"></span>
                    <span class="character-leg"></span>

                </div>

            </div>

            <div class="character-name">
                ${character.name}
            </div>

            <div class="character-role">
                ${character.role}
            </div>

            <div class="character-selected-badge">
                SELECTED
            </div>

        `;


    card.addEventListener("click", () => {

    document
        .querySelectorAll(".character-card")
        .forEach(card => {

            card.classList.remove("selected");

        });


    card.classList.add("selected");


    selectedCharacter = character;


    setPlayerCharacter(character);

});

    grid.appendChild(card);

    });

}
function updateCharacterScreen() {

    const player =
        getCurrentPlayer();


    const heading =
        document.querySelector(
            "#character-screen .section-heading h2"
        );


    if (!heading || !player) {

        return;

    }


    heading.innerHTML = `

        Choose your
        <span>investigator.</span>

    `;


    const description =
        document.querySelector(
            "#character-screen .section-heading p"
        );


    if (description) {

        description.textContent =
            `${player.name}, choose the character everyone will see.`;

    }

}

/* ---------------------------------------------------------
   CONFIRM CHARACTER
--------------------------------------------------------- */

const confirmCharacterButton =
    document.getElementById("confirm-character-btn");


confirmCharacterButton.addEventListener("click", () => {

    if (!selectedCharacter) {

        return;

    }


    setPlayerCharacter(selectedCharacter);


    selectedCharacter = null;


    /* Move to the next player */

    if (currentPlayerIndex < players.length - 1) {

        nextPlayer();


        updateCharacterScreen();


        document
            .querySelectorAll(".character-card")
            .forEach(card => {

                card.classList.remove("selected");

            });


        return;

    }


    /* Everyone has chosen */

    resetCurrentPlayer();


    showScreen("game");


    updatePlayerHeader();


    loadRoleReveal();

});


/* ---------------------------------------------------------
   TEMPORARY GAME OPENING
--------------------------------------------------------- */

function loadOpeningScene() {
    currentCase = getRandomCase();
    currentPhase = "briefing";

    const gameContent = document.getElementById("game-content");

    gameContent.innerHTML = `
        <section class="case-intro">
            <div class="case-kicker">CASE FILE 001</div>

            <h1>${currentCase.title}</h1>

            <div class="case-meta">
                <span>${currentCase.location}</span>
                <span>${currentCase.difficulty}</span>
            </div>

            <div class="case-divider"></div>

            <p class="case-introduction">
                ${currentCase.intro}
            </p>

            <div class="case-objective">
                <div class="case-objective-label">YOUR OBJECTIVE</div>
                <p>${currentCase.objective}</p>
            </div>

            <button id="begin-investigation-btn" class="primary-button">
                BEGIN INVESTIGATION
            </button>
        </section>
    `;

    document
        .getElementById("begin-investigation-btn")
        .addEventListener("click", beginInvestigation);
}

/* ---------------------------------------------------------
   TEMPORARY INVESTIGATION
--------------------------------------------------------- */

function beginInvestigation() {
    currentPhase = "evidence";

    renderEvidencePhase();
}

function renderEvidencePhase() {
    const gameContent = document.getElementById("game-content");

    gameContent.innerHTML = `
        <section class="investigation-section">

            <div class="section-heading">
                <div>
                    <div class="case-kicker">INVESTIGATION PHASE</div>
                    <h1>EXAMINE THE EVIDENCE</h1>
                </div>

                <div class="evidence-count">
                    ${currentCase.evidence.length} ITEMS
                </div>
            </div>

            <p class="phase-instruction">
                Examine the evidence carefully. Not every clue tells the whole story.
            </p>

            <div class="evidence-grid">
                ${currentCase.evidence.map((item, index) => `
                    <article class="evidence-card">

                        <div class="evidence-number">
                            0${index + 1}
                        </div>

                        <div class="evidence-type">
                            ${item.type}
                        </div>

                        <h2>${item.title}</h2>

                        <p>${item.description}</p>

                        <div class="evidence-clue">
                            <span>CLUE</span>
                            ${item.clue}
                        </div>

                    </article>
                `).join("")}
            </div>

            <button id="continue-evidence-btn" class="primary-button">
                CONTINUE
            </button>

        </section>
    `;

    document
        .getElementById("continue-evidence-btn")
        .addEventListener("click", loadTestimonyPhase);
}
    
function loadTestimonyPhase() {
    currentPhase = "testimony";

    const gameContent = document.getElementById("game-content");

    gameContent.innerHTML = `
        <section class="investigation-section">

            <div class="case-kicker">NEXT PHASE</div>

            <h1>TIME TO TALK</h1>

            <p class="phase-instruction">
                Each player will give their account of what happened.
                Listen carefully. Contradictions may reveal the thief.
            </p>

            <div class="timeline-box">
                <div class="timeline-title">KNOWN TIMELINE</div>

                ${currentCase.timeline.map(event => `
                    <div class="timeline-item">
                        <span></span>
                        <p>${event}</p>
                    </div>
                `).join("")}
            </div>

            <button id="start-testimony-btn" class="primary-button">
                START TESTIMONY
            </button>

        </section>
    `;

    document
        .getElementById("start-testimony-btn")
        .addEventListener("click", startTestimony);
}
function startTestimony() {

    currentPhase = "testimony";

    currentPlayerIndex = 0;

    showTestimonyPrompt();

}
function getTestimonyPrompt(player) {

    if (player.isThief) {

        return {
            title: "PROTECT YOUR STORY",
            instruction:
                "Explain where you were when the diamond disappeared. Keep your story believable and avoid drawing attention to yourself."
        };

    }

    const prompts = {

        "SECURITY GUARD":
            "Describe what you were doing around 11:42 PM and anything unusual you noticed near the entrances.",

        "CURATOR":
            "Explain your connection to the diamond and who you believe could have accessed the vault.",

        "JOURNALIST":
            "Describe what you were investigating and anything you heard before the alarm sounded.",

        "PHOTOGRAPHER":
            "Describe what you were photographing and anything unusual that appeared in your photos.",

        "TECHNICIAN":
            "Explain what you know about the alarm system and whether the alarm behavior looked normal.",

        "HISTORIAN":
            "Explain what you know about the diamond display and anything unusual about the museum tonight."
    };

    return {
        title: "GIVE YOUR TESTIMONY",
        instruction:
            prompts[player.role] ||
            "Explain what you saw, heard, or remember from tonight."
    };

}

function showTestimonyPrompt() {

    const player = getCurrentPlayer();

    const prompt = getTestimonyPrompt(player);

    const gameContent =
        document.getElementById("game-content");

    gameContent.innerHTML = `

        <section class="testimony-section">

            <div class="testimony-classified">
                PRIVATE INSTRUCTIONS
            </div>

            <div class="testimony-player">

                <div class="testimony-avatar">
                    ${player.character.emoji}
                </div>

                <div>

                    <div class="case-kicker">
                        PLAYER ${currentPlayerIndex + 1}
                    </div>

                    <h1>
                        ${player.name.toUpperCase()}
                    </h1>

                </div>

            </div>

            <div class="testimony-card">

                <div class="testimony-label">
                    YOUR ROLE
                </div>

                <h2>
                    ${player.role}
                </h2>

                <div class="testimony-divider"></div>

                <div class="testimony-label">
                    YOUR SECRET
                </div>

                <p class="testimony-secret">
                    ${player.secret}
                </p>

            </div>

            <div class="testimony-prompt">

                <div class="testimony-label">
                    YOUR QUESTION
                </div>

                <p>
                    ${prompt.instruction}
                </p>

            </div>

            <div class="testimony-warning">
                🔒 Keep this information private.
                Do not show your role or secret to the other players.
            </div>

            <button
                id="ready-testimony-btn"
                class="primary-button"
            >
                I'M READY TO SPEAK
            </button>

        </section>

    `;

    document
        .getElementById("ready-testimony-btn")
        .addEventListener(
            "click",
            showPublicTestimonyScreen
        );

}
function showPublicTestimonyScreen() {

    const player = getCurrentPlayer();

    const gameContent =
        document.getElementById("game-content");

    gameContent.innerHTML = `

        <section class="testimony-section">

            <div class="case-kicker">
                PUBLIC TESTIMONY
            </div>

            <h1>
                ${player.name.toUpperCase()}
                IS SPEAKING
            </h1>

            <p class="phase-instruction">
                Everyone may listen now.
            </p>

            <div class="speak-card">

                <div class="speak-icon">
                    🎙
                </div>

                <h2>
                    Tell the group your story.
                </h2>

                <p>
                    Explain where you were, what you saw,
                    and anything you think the investigators
                    should know.
                </p>

            </div>

            <button
                id="testimony-finished-btn"
                class="primary-button"
            >
                TESTIMONY COMPLETE
            </button>

        </section>

    `;

    document
        .getElementById("testimony-finished-btn")
        .addEventListener(
            "click",
            finishTestimony
        );

}
function finishTestimony() {

    if (currentPlayerIndex < players.length - 1) {

        currentPlayerIndex++;

        showTestimonyPrompt();

        return;

    }

    currentPlayerIndex = 0;

    showTestimonySummary();

}
function showTestimonySummary() {

    const gameContent =
        document.getElementById("game-content");

    gameContent.innerHTML = `

        <section class="investigation-section">

            <div class="case-kicker">
                TESTIMONY COMPLETE
            </div>

            <h1>
                EVERYONE HAS SPOKEN
            </h1>

            <p class="phase-instruction">
                Now compare what everyone said.
                Look for contradictions, suspicious details,
                and stories that don't match the evidence.
            </p>

            <button
                id="continue-investigation-btn"
                class="primary-button"
            >
                REVIEW THE CASE
            </button>

        </section>

    `;

}


/* =========================================================
   ROLE SYSTEM
========================================================= */


/* ---------------------------------------------------------
   AVAILABLE ROLES
--------------------------------------------------------- */

const roles = [

    {
        id: "guard",

        name: "SECURITY GUARD",

        description:
            "You were watching the museum when the diamond disappeared.",

        secret:
            "You saw someone near the east entrance at exactly 11:42 PM.",

        thief: false

    },

    {
        id: "curator",

        name: "CURATOR",

        description:
            "You are responsible for the museum's most valuable collection.",

        secret:
            "Only three people had access to the diamond vault tonight.",

        thief: false

    },

    {
        id: "journalist",

        name: "JOURNALIST",

        description:
            "You were investigating the museum before the theft occurred.",

        secret:
            "You heard glass breaking shortly before the alarm sounded.",

        thief: false

    },
    {
        id: "photographer",

        name: "PHOTOGRAPHER",

        description:
            "You were documenting the museum's private exhibition tonight.",

        secret:
            "You captured a blurry photograph showing someone near the east entrance.",

        thief: false
    },

    {
        id: "technician",

        name: "TECHNICIAN",

        description:
            "You maintain the museum's alarms and security systems.",

        secret:
            "The alarm was manually interrupted rather than triggered by a system failure.",

        thief: false
    },

    {
        id: "historian",

        name: "HISTORIAN",

        description:
            "You were researching the history of the museum's diamond collection.",

        secret:
            "You discovered that the diamond's display mechanism has a hidden release switch.",

        thief: false
    },
    {
        id: "thief",

        name: "THE THIEF",

        description:
            "You stole the diamond. Nobody can know it was you.",

        secret:
            "Convince the investigators that another player is responsible. Keep your story consistent.",

        thief: true

    }

];

/* ---------------------------------------------------------
   ASSIGN ROLES
--------------------------------------------------------- */

function assignRoles() {

    const thiefRole =
        roles.find(role => role.thief);

    const civilianRoles =
        roles.filter(role => !role.thief);

    const shuffledCivilians =
        [...civilianRoles].sort(
            () => Math.random() - 0.5
        );

    const selectedRoles = [
        thiefRole,
        ...shuffledCivilians.slice(0, players.length - 1)
    ];

    const shuffledFinalRoles =
        selectedRoles.sort(
            () => Math.random() - 0.5
        );

    players.forEach((player, index) => {

        const role =
            shuffledFinalRoles[index];

        player.role =
            role.name;

        player.secret =
            role.secret;

        player.isThief =
            role.thief;

    });

}



/* ---------------------------------------------------------
   ROLE REVEAL
--------------------------------------------------------- */

function loadRoleReveal() {

    assignRoles();


    currentPlayerIndex = 0;


    showRoleForCurrentPlayer();

}
function showRoleForCurrentPlayer() {

    const player =
        getCurrentPlayer();


    const roleScreen =
        document.getElementById("role-screen");


    const avatar =
        document.getElementById(
            "role-player-avatar"
        );


    const name =
        document.getElementById(
            "role-player-name"
        );


    const title =
        document.getElementById(
            "role-title"
        );


    const description =
        document.getElementById(
            "role-description"
        );


    const secret =
        document.getElementById(
            "role-secret-text"
        );


    avatar.textContent =
        player.character.emoji;


    name.textContent =
        player.name.toUpperCase();


    title.textContent =
        player.role;


    secret.textContent =
        player.secret;


    const roleData =
        roles.find(
            role => role.name === player.role
        );


    description.textContent =
        roleData.description;


    if (player.isThief) {

        roleScreen.classList.add("thief");

    } else {

        roleScreen.classList.remove("thief");

    }


    showScreen("role");

}
const roleContinueButton =
    document.getElementById(
        "role-continue-btn"
    );


roleContinueButton.addEventListener(
    "click",
    () => {

        if (
            currentPlayerIndex <
            players.length - 1
        ) {

            currentPlayerIndex++;


            showRoleForCurrentPlayer();


            return;

        }


        /*
         * Everyone has seen their role.
         * Start the actual investigation.
         */

        resetCurrentPlayer();


        showScreen("game");


        updatePlayerHeader();


        loadOpeningScene();

    }
);