# THE HEIST — Architecture

## 1. Overview

THE HEIST is a browser-based multiplayer social-deduction mystery game built with vanilla HTML, CSS, and JavaScript.

The game is designed around a local, deterministic game engine with an optional AI Investigator layer.

The core game must work without an AI API.

```text
                    THE HEIST
                        |
                        v
                +---------------+
                |   UI / HTML   |
                +-------+-------+
                        |
                        v
                +---------------+
                |   Game State  |
                +-------+-------+
                        |
                        v
                +---------------+
                |  Game Engine  |
                +---+-------+---+
                    |       |
                    v       v
             Case Data   Players
                    |
                    v
          Investigation Engine
                    |
                    v
          Optional AI Investigator
```
## 2. Technology

Current technology:

HTML
CSS
Vanilla JavaScript
Browser APIs

Planned/optional:

OpenAI API through a secure server-side integration
Speech-to-text for voice testimony
Text-to-speech for the AI Investigator

Avoid unnecessary dependencies and frameworks.

The project should remain lightweight and responsive.

## 3. Project Structure
```
the-heist/
├── index.html
├── README.md
├── ARCHITECTURE.md
├── GAME_DESIGN.md
├── DEVELOPMENT_PLAN.md
├── .gitignore
│
├── css/
│   └── style.css
│
├── js/
│   ├── game.js
│   ├── ui.js
│   ├── players.js
│   ├── cases.js
│   └── ai.js
│
├── data/
│   └── cases.json
│
└── assets/
    ├── characters/
    ├── icons/
    └── audio/
```


## 4. JavaScript Responsibilities

### `game.js`
The main game controller.  
**Responsible for:**
* Game phases
* Screen transitions
* Case progression
* Evidence phase
* Timeline phase
* Testimony phase
* Investigation phase
* Accusation phase
* Voting
* Scenario progression
* Win/loss
* Final reveal
* Replay

*This file controls the overall game flow.*

---

### `players.js`
Responsible for player state.  
**Handles:**
* Player creation
* Player names
* Character assignment
* Secret roles
* Private information
* Testimony
* Votes
* Scores
* Active/eliminated status
* Current player

---

### `cases.js`
Contains mystery case definitions.  
**Each case can contain:**
* Case title
* Location
* Difficulty
* Introduction
* Objective
* Timeline
* Evidence
* Investigation facts
* Scenario-specific clues
* Final solution

> **Note:** The actual thief should be determined by the game engine/case data, not by AI.

---

### `ui.js`
Reusable UI helpers.  
**Potential responsibilities:**
* Rendering cards
* Rendering evidence
* Rendering player lists
* Rendering alerts
* Rendering buttons
* UI state helpers

*Keep reusable presentation logic here when appropriate.*

---

### `ai.js`
Optional AI Investigator layer.  

**AI may:**
* Analyze testimony
* Identify possible contradictions
* Highlight unanswered questions
* Summarize evidence
* Suggest areas for further investigation

**AI must NOT:**
* Decide the actual thief
* Change the case truth
* Control voting
* Determine win/loss
* Randomly eliminate players

*The deterministic game engine always remains authoritative.*

---

## 5. Game State

The game maintains state such as:
`currentCase`, `currentPhase`, `currentScenario`, `players`, `currentPlayerIndex`, `accusationVotes`, `eliminatedPlayers`.

The exact implementation may evolve as the game becomes more complete.  
**Key Rule:** There should be one authoritative game state rather than duplicated state across many UI components.

---

## 6. Investigation Engine

The investigation engine compares player testimony against known case facts.

**Example:**
* **Known fact:** East entrance was accessed at 11:42 PM.
* **Player testimony:** *"I never went near the east entrance."*
* **Result:** Potential contradiction.

The engine should describe contradictions as investigative leads. A contradiction does not automatically prove that someone is the thief.

---

## 7. AI Architecture

The AI layer is intentionally separate from the core game.

```text
                 CASE DATA
                     |
                     v
              GAME ENGINE
                     |
          +----------+----------+
          |                     |
          v                     v
   LOCAL ANALYSIS        OPTIONAL AI
          |                     |
          +----------+----------+
                     |
                     v
              INVESTIGATION UI
```

*The game must remain playable if the AI is unavailable.*

---

## 8. API Security

Never place a real API key in:
* `index.html`
* Frontend JavaScript
* Public GitHub repositories

Use `.env` for secrets when a backend is introduced. The `.env` file is ignored by Git. An `.env.example` file may contain variable names without real secrets.

---

## 9. Design Principle

> **THE HEIST is a mystery game first and an AI game second.**

The AI should enhance investigation rather than replace the game's deduction mechanics. The player should always feel that they personally solved the case.