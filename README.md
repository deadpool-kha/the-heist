# THE HEIST

> Someone stole it. Someone knows the truth. Someone is lying.

THE HEIST is a multiplayer social-deduction mystery game where players investigate fictional crimes, examine evidence, give testimony, identify contradictions, and attempt to uncover the hidden thief.

The game is designed for 3–6 players using one shared device.

---

## Gameplay

Each player receives:

1. An investigator character
2. A secret role
3. Private information
4. A testimony prompt

Players then:

1. Review the case
2. Examine evidence
3. Study the timeline
4. Give testimony
5. Compare everyone's stories
6. Investigate contradictions
7. Vote on suspects
8. Unlock deeper evidence
9. Make a final accusation
10. Reveal the truth

---

## Core Features

- 3–6 player pass-and-play gameplay
- Secret roles
- Hidden thief
- Original investigator characters
- Mystery case system
- Evidence investigation
- Case timeline
- Player testimony
- Contradiction detection
- Investigation board
- Private accusation voting
- Skip / Not Enough Evidence option
- Player elimination
- Multi-scenario investigation
- Final reveal
- Replay system

---

## AI Investigator

AI is designed as an optional investigation assistant rather than the game engine.

The AI may help:
- Analyze testimony
- Identify contradictions
- Highlight unanswered questions
- Summarize evidence
- Suggest areas for further investigation

The deterministic game engine controls the actual truth, roles, voting, and win/loss.

The game should remain playable without AI.

---

## Technology

- HTML
- CSS
- Vanilla JavaScript
- Browser APIs

### Potential Future Technologies
- Secure server-side AI integration
- Speech-to-text
- Text-to-speech

---

## Project Structure

```text
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

---

## Development Status

🚧 **THE HEIST is currently in active development.**

The core player, character, role, case, testimony, investigation, contradiction, and voting systems are being developed incrementally.

---

## Design Philosophy

**THE HEIST is a mystery game first and an AI game second.**

- The goal is to make players feel like they personally solved the case.
- AI should enhance the investigation rather than replace deduction.
- The game should remain lightweight, responsive, replayable, and easy to understand.