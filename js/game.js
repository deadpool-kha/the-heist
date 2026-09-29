let currentCase = null;
let currentPhase = "setup";
let currentRound = 1;
let accusationVotes = [];

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

function assignGameRoles() {

    if (players.length === 0) {
        console.error("No players available.");
        return;
    }

    const shuffledPlayers = [...players]
        .sort(() => Math.random() - 0.5);

    const thiefPlayer = shuffledPlayers[0];

    const innocentRoles = roles.filter(role => !role.thief);

    const shuffledRoles = [...innocentRoles]
        .sort(() => Math.random() - 0.5);

    players.forEach((player, index) => {

        player.isThief = player.id === thiefPlayer.id;

        if (player.isThief) {

            const thiefRole = roles.find(
                role => role.id === "thief"
            );

            player.role = thiefRole.name;
            player.secret = thiefRole.secret;
            player.privateClue = thiefRole.clue;

        } else {

            const role = shuffledRoles[index % shuffledRoles.length];

            player.role = role.name;
            player.secret = role.secret;
            player.privateClue = role.clue;

        }

    });

    console.log("Roles assigned.");
}
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

    assignGameRoles();

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
    currentRound = 1;
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

function findNextActivePlayer(startIndex = 0) {

    for (let i = startIndex; i < players.length; i++) {

        if (!players[i].isEliminated) {
            return i;
        }

    }

    return -1;
}

function startTestimony() {

    currentPhase = "testimony";

    currentPlayerIndex = findNextActivePlayer(0);

    if (currentPlayerIndex === -1) {

        console.error("No active players available.");
        return;

    }

    showTestimonyPrompt();

}
function getTestimonyPrompt(player) {

    if (player.isThief) {

        const thiefPrompts = {

            1:
                "Explain where you were when the diamond disappeared. Keep your story believable and avoid drawing attention to yourself.",

            2:
                "New access records have appeared. Explain your movements around the east entrance and why your story still makes sense.",

            3:
                "The investigators have uncovered serious contradictions. Give your final account and explain anything that could make you look suspicious."
        };

        return {
            title: "PROTECT YOUR STORY",
            instruction:
                thiefPrompts[currentRound] ||
                thiefPrompts[1]
        };

    }

    const prompts = {

        "SECURITY GUARD": {

            1:
                "Describe what you were doing around 11:42 PM and anything unusual you noticed near the entrances.",

            2:
                "The investigation found an access event at the east entrance. Explain what you saw there and who could have entered.",

            3:
                "The final evidence suggests someone manipulated the security system. Explain what you now believe happened."
        },

        "CURATOR": {

            1:
                "Explain your connection to the diamond and who you believe could have accessed the vault.",

            2:
                "New access records have surfaced. Explain who had legitimate access to the restricted areas and whether anything seems unusual.",

            3:
                "The display mechanism may have been opened without breaking the case. Explain who would have known about this."
        },

        "JOURNALIST": {

            1:
                "Describe what you were investigating and anything you heard before the alarm sounded.",

            2:
                "The investigation has uncovered new information about the east entrance. Explain anything you noticed that could help identify the person responsible.",

            3:
                "Several accounts now contradict each other. Explain which story you believe is false and why."
        },

        "PHOTOGRAPHER": {

            1:
                "Describe what you were photographing and anything unusual that appeared in your photos.",

            2:
                "Investigators believe your photographs may contain evidence about the east entrance. Explain what you remember seeing.",

            3:
                "The final evidence suggests someone was inside the restricted hall. Explain anything your photographs can tell us."
        },

        "TECHNICIAN": {

            1:
                "Explain what you know about the alarm system and whether the alarm behavior looked normal.",

            2:
                "The investigation found a gap in the east entrance camera recording. Explain how that could have happened and who could have caused it.",

            3:
                "The alarm was manually interrupted. Explain what access would have been required and who could have performed it."
        },

        "HISTORIAN": {

            1:
                "Explain what you know about the diamond display and anything unusual about the museum tonight.",

            2:
                "Investigators discovered new information about the restricted exhibition area. Explain who might have known how to reach it.",

            3:
                "The display contains a hidden release mechanism. Explain who would have known about it and how it could have been used."
        }
    };

    const rolePrompts = prompts[player.role];

    return {

        title: "GIVE YOUR TESTIMONY",

        instruction:
            rolePrompts?.[currentRound] ||
            rolePrompts?.[1] ||
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

    const gameContent = document.getElementById("game-content");

    gameContent.innerHTML = `
        <section class="testimony-section">

            <div class="case-kicker">PUBLIC TESTIMONY</div>

            <h1>${player.name.toUpperCase()} IS SPEAKING</h1>

            <p class="phase-instruction">
                Everyone may listen now. Give your account of what happened.
            </p>

            <div class="speak-card">

                <div class="speak-icon">🎙</div>

                <h2>Tell the group your story.</h2>

                <p>
                    Explain where you were, what you saw,
                    and anything you think the investigators
                    should know.
                </p>

                <textarea
                    id="testimony-input"
                    class="testimony-input"
                    maxlength="500"
                    placeholder="Type your testimony here..."
                ></textarea>

                <div class="testimony-character-count">
                    <span id="testimony-count">0</span>/500
                </div>

            </div>

            <button id="testimony-finished-btn" class="primary-button">
                SUBMIT TESTIMONY
            </button>

        </section>
    `;

    const input = document.getElementById("testimony-input");
    const count = document.getElementById("testimony-count");

    input.addEventListener("input", () => {
        count.textContent = input.value.length;
    });

    document
        .getElementById("testimony-finished-btn")
        .addEventListener("click", finishTestimony);
}

function finishTestimony() {

    const input =
        document.getElementById("testimony-input");

    const testimony =
        input ? input.value.trim() : "";

    if (!testimony) {

        input.focus();
        return;

    }

    const player = getCurrentPlayer();

    player.testimony = testimony;

    const nextIndex =
        findNextActivePlayer(currentPlayerIndex + 1);

    if (nextIndex !== -1) {

        currentPlayerIndex = nextIndex;

        showTestimonyPrompt();

        return;
    }

    currentPlayerIndex = findNextActivePlayer(0);

    showTestimonySummary();

}

function showTestimonySummary() {
    const gameContent = document.getElementById("game-content");

    gameContent.innerHTML = `
        <section class="investigation-section">
            <div class="case-kicker">TESTIMONY COMPLETE</div>
            <h1>EVERYONE HAS SPOKEN</h1>
            <p class="phase-instruction">
                Now compare what everyone said.
                Look for contradictions, suspicious details,
                and stories that don't match the evidence.
            </p>

            <button id="continue-investigation-btn" class="primary-button">
                REVIEW THE CASE
            </button>
        </section>
    `;

    document
        .getElementById("continue-investigation-btn")
        .addEventListener("click", showInvestigationBoard);
}

/* =========================================================
   CONTRADICTION ENGINE
========================================================= */

function normalizeTestimony(text) {
    return text
        .toLowerCase()
        .replace(/[.,!?;:"']/g, "")
        .replace(/\s+/g, " ")
        .trim();
}

function testimonyContainsAny(text, keywords) {
    return keywords.some(keyword => text.includes(keyword));
}

function analyzePlayerTestimony(player) {
    if (!player.testimony || !currentCase.investigationFacts) {
        return [];
    }

    const testimony = normalizeTestimony(player.testimony);
    const findings = [];

    currentCase.investigationFacts.forEach(fact => {

        const mentionsFact = testimonyContainsAny(
            testimony,
            fact.keywords
        );

        if (!mentionsFact) {
            return;
        }

        /*
         * The game currently identifies statements
         * that directly conflict with known facts.
         */

        if (
            fact.id === "east-entrance" &&
            (
                testimony.includes("never") ||
                testimony.includes("wasnt") ||
                testimony.includes("wasn't") ||
                testimony.includes("did not") ||
                testimony.includes("didn't") ||
                testimony.includes("not near")
            )
        ) {
            findings.push({
                player: player.name,
                severity: "HIGH",
                fact: fact,
                reason:
                    "The testimony appears to deny being near the east entrance, while the case records activity there at 11:42 PM."
            });
        }

        if (
            fact.id === "alarm-interruption" &&
            (
                testimony.includes("automatic") ||
                testimony.includes("system failure") ||
                testimony.includes("failed on its own") ||
                testimony.includes("malfunction")
            )
        ) {
            findings.push({
                player: player.name,
                severity: "MEDIUM",
                fact: fact,
                reason:
                    "The testimony describes the alarm as an automatic failure, while the evidence indicates that it was manually interrupted."
            });
        }

        if (
            fact.id === "display-condition" &&
            (
                testimony.includes("broken before") ||
                testimony.includes("already broken") ||
                testimony.includes("was broken at 11:40") ||
                testimony.includes("was already damaged")
            )
        ) {
            findings.push({
                player: player.name,
                severity: "MEDIUM",
                fact: fact,
                reason:
                    "The testimony places the display damage earlier than the known timeline."
            });
        }
    });

    return findings;
}

function analyzeAllTestimonies() {
    const findings = [];

    players.forEach(player => {
        const playerFindings = analyzePlayerTestimony(player);

        playerFindings.forEach(finding => {
            findings.push(finding);
        });
    });

    return findings;
}

function resetRoundTestimonies() {

    players.forEach(player => {

        if (!player.isEliminated) {
            player.testimony = null;
        }

    });

}


function analyzeCase() {
    const findings = analyzeAllTestimonies();

    const gameContent = document.getElementById("game-content");

    gameContent.innerHTML = `
        <section class="analysis-section">

            <div class="case-kicker">INVESTIGATION ANALYSIS</div>

            <h1>INVESTIGATION FINDINGS</h1>

            <p class="phase-instruction">
                Player testimony has been compared against
                the known facts of the case. Review each finding
                before making an accusation.
            </p>

            ${findings.length === 0
            ? `
                        <div class="analysis-empty">
                            <div class="analysis-icon">✓</div>
                            <h2>NO DIRECT CONTRADICTIONS</h2>
                            <p>
                                No testimony directly conflicts with
                                the currently known evidence.
                            </p>
                        </div>
                    `
            : `
                        <div class="analysis-summary">
                            <span>ITEMS REQUIRING ATTENTION</span>
                            <strong>${findings.length}</strong>
                        </div>

                        <div class="analysis-list">

                          ${findings.map((finding, index) => {

                const player = players.find(
                    player => player.name === finding.player
                );

                return `
                            <article class="analysis-card">

                                <div class="analysis-number">
                                    ${String(index + 1).padStart(2, "0")}
                                </div>

                                <div class="analysis-content">

                                    <div class="analysis-player-label">
                                        PLAYER ${player
                        ? String(player.id).padStart(2, "0")
                        : "?"
                    }
                                    </div>

                                    <div class="analysis-player-name">
                                        ${finding.player}
                                    </div>

                                    <div class="analysis-topline">

                                        <h2>
                                            ${finding.fact.category}
                                            CONTRADICTION
                                        </h2>

                                        <span class="
                                            analysis-severity
                                            ${finding.severity.toLowerCase()}
                                        ">
                                            ${finding.severity}
                                        </span>

                                    </div>

                                    <p class="analysis-reason">
                                        ${finding.reason}
                                    </p>

                                    <div class="analysis-fact">

                                        <span>KNOWN FACT</span>

                                        ${finding.fact.description}

                                    </div>

                                </div>

                            </article>
                        `;
            }).join("")}

                        </div>
                    `
        }

            <div class="analysis-footer">

                <div>
                    <span>IMPORTANT</span>
                    <p>
                        A contradiction is a lead, not proof of guilt.
                    </p>
                </div>

                <button
                    id="continue-analysis-btn"
                    class="primary-button"
                >
                    CONTINUE
                </button>

            </div>

        </section>
    `;

    document
        .getElementById("continue-analysis-btn")
        .addEventListener("click", () => {

            if (currentRound > 1) {

                resetRoundTestimonies();

                startTestimony();

                return;
            }

            showAccusationPhase();

        });
}
function showAccusationPhase() {
    currentPhase = "accusation";
    currentPlayerIndex = 0;
    accusationVotes = [];

    showPrivateAccusation();
}

function showPrivateAccusation() {
    const player = getCurrentPlayer();

    const suspects = players.filter(
        suspect =>
            suspect.id !== player.id &&
            !suspect.isEliminated
    );

    const gameContent = document.getElementById("game-content");

    gameContent.innerHTML = `
        <section class="accusation-section">

            <div class="accusation-classified">
                PRIVATE ACCUSATION
            </div>

            <div class="accusation-player">

                <div class="accusation-avatar">
                    ${player.character ? player.character.emoji : "?"}
                </div>

                <div>
                    <div class="case-kicker">
                        PLAYER ${String(player.id).padStart(2, "0")}
                    </div>

                    <h1>${player.name.toUpperCase()}</h1>
                </div>

            </div>

            <div class="accusation-instruction">

                <span>FINAL DECISION</span>

                <h2>
                    WHO STOLE THE DIAMOND?
                </h2>

                <p>
                    Choose the player you believe is responsible.
                    Your vote will remain hidden until everyone
                    has made their accusation.
                </p>

            </div>

            <div class="suspect-grid">

                ${suspects.map(suspect => `
                    <button
                        class="suspect-card"
                        data-player-id="${suspect.id}"
                    >

                        <div class="suspect-avatar">
                            ${suspect.character
            ? suspect.character.emoji
            : "?"
        }
                        </div>

                        <div class="suspect-info">

                            <span>
                                PLAYER ${String(suspect.id).padStart(2, "0")}
                            </span>

                            <strong>
                                ${suspect.name}
                            </strong>

                        </div>

                        <div class="suspect-check">
                            ✓
                        </div>

                    </button>
                `).join("")}

            </div>

            <div class="accusation-warning">
                🔒 Your accusation is private.
                Do not reveal your choice to the other players.
            </div>

            <button
                id="submit-accusation-btn"
                class="primary-button"
                disabled
            >
                CONFIRM ACCUSATION
            </button>

        </section>
    `;

    let selectedSuspectId = null;

    const suspectCards =
        document.querySelectorAll(".suspect-card");

    const submitButton =
        document.getElementById("submit-accusation-btn");

    suspectCards.forEach(card => {

        card.addEventListener("click", () => {

            suspectCards.forEach(item => {
                item.classList.remove("selected");
            });

            card.classList.add("selected");

            selectedSuspectId =
                Number(card.dataset.playerId);

            submitButton.disabled = false;
        });

    });

    submitButton.addEventListener("click", () => {

        if (!selectedSuspectId) return;

        accusationVotes.push({
            voterId: player.id,
            suspectId: selectedSuspectId
        });

        finishPrivateAccusation();
    });
}

function finishPrivateAccusation() {

    let nextIndex = currentPlayerIndex + 1;

    while (
        nextIndex < players.length &&
        players[nextIndex].isEliminated
    ) {
        nextIndex++;
    }

    if (nextIndex < players.length) {

        currentPlayerIndex = nextIndex;
        showAccusationPassScreen();
        return;
    }

    currentPlayerIndex = 0;
    showVoteReveal();
}

function showAccusationPassScreen() {

    const gameContent =
        document.getElementById("game-content");

    const nextPlayer = getCurrentPlayer();

    gameContent.innerHTML = `
        <section class="pass-screen">

            <div class="pass-icon">
                🔒
            </div>

            <div class="case-kicker">
                ACCUSATION RECORDED
            </div>

            <h1>
                PASS THE DEVICE
            </h1>

            <p>
                The previous accusation has been locked.
                Do not reveal the vote.
            </p>

            <div class="next-player-card">

                <span>
                    NEXT INVESTIGATOR
                </span>

                <strong>
                    ${nextPlayer.name.toUpperCase()}
                </strong>

            </div>

            <button
                id="next-accusation-btn"
                class="primary-button"
            >
                I'M READY
            </button>

        </section>
    `;

    document
        .getElementById("next-accusation-btn")
        .addEventListener("click", showPrivateAccusation);
}

function countVotes(votes) {

    const voteCounts = {};

    for (const player of players) {
        voteCounts[player.id] = 0;
    }

    let skipVotes = 0;

    for (const vote of votes) {

        if (vote.voteType === "skip") {
            skipVotes++;
        } else {
            voteCounts[vote.suspectId]++;
        }
    }

    voteCounts.skip = skipVotes;

    return voteCounts;
}

function calculateVoteResult(voteCounts) {

    const playerVoteCounts = [];

    for (const player of players) {

        playerVoteCounts.push({
            playerId: player.id,
            votes: voteCounts[player.id]
        });

    }
    const skipVotes = voteCounts.skip;

    const allVoteCounts = [
        ...playerVoteCounts.map(item => item.votes), skipVotes];

    const highestVotes =
        Math.max(...allVoteCounts);

    const leaders =
        playerVoteCounts.filter(
            item => item.votes === highestVotes
        );


    if (skipVotes === highestVotes && leaders.length === 0) {

        return {
            type: "skip"
        };

    }

    if (leaders.length === 1) {

        return {
            type: "eliminate",
            playerId: leaders[0].playerId
        };

    }

    if (leaders.length > 1) {

        return {
            type: "draw"
        };

    }

}

function handleVoteResult(result) {

    if (result.type === "skip") {

        showVoteOutcome(
            "NO ACCUSATION",
            "The players chose not to eliminate anyone.",
            "The investigation continues."
        );

        return;
    }

    if (result.type === "draw") {

        showVoteOutcome(
            "VOTE DRAW",
            "The players could not reach a decision.",
            "No one is eliminated. The investigation continues."
        );

        return;
    }

    if (result.type === "eliminate") {

        const selectedPlayer = players.find(
            player => player.id === result.playerId
        );

        if (!selectedPlayer) {
            console.error("Selected player not found.");
            return;
        }

        if (selectedPlayer.isThief) {

            showVoteOutcome(
                "THE THIEF WAS CAUGHT",
                `${selectedPlayer.name} was the thief.`,
                "The investigation is complete."
            );

            return;
        }

        selectedPlayer.isEliminated = true;

        showVoteOutcome(
            "WRONG ACCUSATION",
            `${selectedPlayer.name} was innocent.`,
            "They have been eliminated. The investigation continues."
        );

        return;
    }
}

function showVoteOutcome(title, message, submessage) {

    const gameContent =
        document.getElementById("game-content");

    gameContent.innerHTML = `
        <section class="vote-outcome">

            <div class="case-kicker">
                VOTE RESULT
            </div>

            <h1>
                ${title}
            </h1>

            <p class="vote-outcome-message">
                ${message}
            </p>

            <p class="vote-outcome-submessage">
                ${submessage}
            </p>

            <button
                id="vote-outcome-continue"
                class="primary-button"
            >
                CONTINUE
            </button>

        </section>
    `;

    document
        .getElementById("vote-outcome-continue")
        .addEventListener("click", () => {
            if (currentRound < 3) {

                currentRound++;
                showInvestigationBoard();

            } else {

                showFinalInvestigation();

            }

        });
}

function showFinalInvestigation() {

    currentPhase = "final";

    const gameContent =
        document.getElementById("game-content");

    gameContent.innerHTML = `
        <section class="vote-outcome">

            <div class="case-kicker">
                FINAL INVESTIGATION
            </div>

            <h1>
                FINAL ACCUSATION
            </h1>

            <p class="vote-outcome-message">
                The investigation has reached its final stage.
            </p>

            <p class="vote-outcome-submessage">
                Review everything you discovered and make your final decision.
            </p>

            <button
                id="final-accusation-btn"
                class="primary-button"
            >
                MAKE FINAL ACCUSATION
            </button>

        </section>
    `;

    document
        .getElementById("final-accusation-btn")
        .addEventListener("click", showPrivateAccusation);
}

function showVoteReveal() {

    currentPhase = "vote-reveal";

    const voteCounts = countVotes(accusationVotes);

    const result = calculateVoteResult(voteCounts);

    console.log("Vote counts:", voteCounts);
    console.log("Vote result:", result);

    handleVoteResult(result);
}

function showInvestigationBoard() {

    currentPhase = "review";

    const roundData = getCurrentRoundData();

    console.log("Current round:", currentRound);
    console.log("Round data:", roundData);

    const gameContent =
        document.getElementById("game-content");

    gameContent.innerHTML = `
        <section class="board-section">

            <div class="board-header">
                <div>
                    <div class="case-kicker">CASE REVIEW</div>
                    <h1>
                        ${roundData ? roundData.title : "INVESTIGATION BOARD"}
                    </h1>
                    <p>
                    Round ${currentRound} of the investigation.
                    Review the new evidence and determine what changed.
                    </p>
                </div>

                <div class="board-status">
                    <span>CASE</span>
                    <strong>001</strong>
                </div>
            </div>

            <div class="board-grid">

                <!-- EVIDENCE -->
                <div class="board-panel evidence-panel">
                    <div class="board-panel-header">
                        <div>
                            <span class="board-label">01</span>
                            <h2>EVIDENCE</h2>
                        </div>
                        <span class="board-count">
                            ${roundData ? roundData.evidence.length : currentCase.evidence.length} ITEMS
                        </span>
                    </div>

                    <div class="board-evidence-list">
                        ${(roundData ? roundData.evidence : currentCase.evidence).map((item, index) => `
                            <article class="board-evidence-card">
                                <div class="board-evidence-number">
                                    0${index + 1}
                                </div>

                                <div class="board-evidence-content">
                                    <span>${item.type}</span>
                                    <h3>${item.title}</h3>
                                    <p>${item.clue}</p>
                                </div>
                            </article>
                        `).join("")}
                    </div>
                </div>

                <!-- TIMELINE -->
                <div class="board-panel timeline-panel">
                    <div class="board-panel-header">
                        <div>
                            <span class="board-label">02</span>
                            <h2>TIMELINE</h2>
                        </div>
                    </div>

                    <div class="board-timeline">
                        ${currentCase.timeline.map((event, index) => `
                            <div class="board-timeline-item">
                                <div class="timeline-marker">
                                    ${String(index + 1).padStart(2, "0")}
                                </div>
                                <p>${event}</p>
                            </div>
                        `).join("")}
                    </div>
                </div>

                <!-- TESTIMONY -->
                <div class="board-panel testimony-panel">
                    <div class="board-panel-header">
                        <div>
                            <span class="board-label">03</span>
                            <h2>TESTIMONY</h2>
                        </div>
                        <span class="board-count">
                            ${players.length} PLAYERS
                        </span>
                    </div>

                    <div class="board-testimony-list">
                        ${players.map((player, index) => `
                            <article class="board-testimony-card">

                                <div class="board-player-avatar">
                                    ${player.character ? player.character.emoji : "?"}
                                </div>

                                <div class="board-testimony-content">
                                    <span>PLAYER ${index + 1}</span>
                                    <h3>${player.name}</h3>

                                    <p>
                                        ${player.testimony
            ? `"${player.testimony}"`
            : "No recorded testimony yet."
        }
                                    </p>
                                </div>

                            </article>
                        `).join("")}
                    </div>
                </div>

            </div>

            <div class="board-action">

                <div class="board-warning">
                    <span>INVESTIGATOR NOTE</span>
                    <p>
                        The truth may be hidden between the evidence
                        and what people claim happened.
                    </p>
                </div>

                <button id="analyze-case-btn" class="primary-button">
                    ANALYZE CASE
                </button>

            </div>

        </section>
    `;

    document
        .getElementById("analyze-case-btn")
        .addEventListener("click", analyzeCase);
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
            "You left your security post for several minutes during the night.",

        clue:
            "You saw someone enter through the east entrance at exactly 11:42 PM.",

        thief: false

    },

    {
        id: "curator",

        name: "CURATOR",

        description:
            "You are responsible for the museum's most valuable collection.",

        secret:
            "You secretly moved one of the diamond display documents earlier that evening.",

        clue:
            "Only three people had legitimate access to the diamond's restricted display area.",

        thief: false

    },

    {
        id: "journalist",

        name: "JOURNALIST",

        description:
            "You were investigating the museum before the theft occurred.",

        secret:
            "You entered a restricted area without permission while investigating the museum.",

        clue:
            "You heard glass breaking shortly before the alarm sounded.",

        thief: false

    },

    {
        id: "photographer",

        name: "PHOTOGRAPHER",

        description:
            "You were documenting the museum's private exhibition tonight.",

        secret:
            "You deleted one photograph because it revealed something you were not supposed to photograph.",

        clue:
            "One of your photographs captured a blurry figure near the east entrance at 11:42 PM.",

        thief: false

    },

    {
        id: "technician",

        name: "TECHNICIAN",

        description:
            "You maintain the museum's alarms and security systems.",

        secret:
            "You accessed the security system earlier that night without recording the maintenance session.",

        clue:
            "The alarm was manually interrupted. It could not have stopped that way because of an ordinary system failure.",

        thief: false

    },

    {
        id: "historian",

        name: "HISTORIAN",

        description:
            "You were researching the history of the museum's diamond collection.",

        secret:
            "You entered the restricted exhibition area earlier that night while researching the collection.",

        clue:
            "You discovered that the display mechanism contains a hidden release switch that can open the case without breaking it.",

        thief: false

    },

    {
        id: "thief",

        name: "THE THIEF",

        description:
            "You stole the diamond. Nobody can know it was you.",

        secret:
            "You stole the diamond. Your goal is to make another player look responsible.",

        clue:
            "You know exactly how the diamond was removed, but revealing too much could expose you.",

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


    const privateClue =
        document.getElementById(
            "role-private-clue"
        );


    avatar.textContent =
        player.character.emoji;


    name.textContent =
        player.name.toUpperCase();


    title.textContent =
        player.role;


    secret.textContent =
        player.secret;


    privateClue.textContent =
        player.privateClue;


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
    document.getElementById("role-continue-btn");

if (roleContinueButton) {

    roleContinueButton.addEventListener("click", () => {

        console.log("I UNDERSTAND clicked");

        if (currentPlayerIndex < players.length - 1) {

            currentPlayerIndex++;

            showRoleForCurrentPlayer();

            return;
        }

        // Everyone has seen their role
        resetCurrentPlayer();

        showScreen("game");

        updatePlayerHeader();

        loadOpeningScene();
    });

} else {

    console.error("role-continue-btn was not found.");
}

function getCurrentRoundData() {

    if (!currentCase.rounds) {
        return null;
    }

    return currentCase.rounds.find(
        round => round.round === currentRound
    );
}

function getCurrentTestimonyPrompt() {

    const roundData = getCurrentRoundData();

    if (roundData && roundData.testimonyPrompt) {
        return roundData.testimonyPrompt;
    }

    return "Describe what you saw and where you were during the incident.";
}

// ================================
// DEV TEST MODE
// ================================

function devTestElimination() {

    players = [
        {
            id: 1,
            name: "Alex",
            character: { emoji: "🕵️" },
            isThief: false,
            isEliminated: false
        },
        {
            id: 2,
            name: "Sam",
            character: { emoji: "👤" },
            isThief: false,
            isEliminated: true
        },
        {
            id: 3,
            name: "Jordan",
            character: { emoji: "🔍" },
            isThief: true,
            isEliminated: false
        },
        {
            id: 4,
            name: "Taylor",
            character: { emoji: "📸" },
            isThief: false,
            isEliminated: false
        }
    ];

    currentPlayerIndex = 0;

    showPrivateAccusation();

}