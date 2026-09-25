# THE HEIST — Development Plan

## Status

THE HEIST is currently in active development.

The core game loop exists, but the accusation/scenario system is still being expanded.

---

## Completed

### Project Setup
- [x] Project folder created
- [x] HTML structure
- [x] CSS structure
- [x] JavaScript structure
- [x] Git repository
- [x] `.gitignore`
- [x] README

### Player System
- [x] Player setup
- [x] 3–6 player support
- [x] Player names
- [x] Current player tracking
- [x] Pass-and-play flow

### Characters
- [x] Character selection
- [x] Original investigator characters
- [x] Character display
- [x] Current-player avatar

### Roles
- [x] Secret role assignment
- [x] Thief role
- [x] Civilian/investigator roles
- [x] Private role reveal
- [x] Role-specific testimony prompts

### Case System
- [x] Case structure
- [x] Museum diamond case
- [x] Case briefing
- [x] Evidence
- [x] Timeline
- [x] Investigation facts

### Testimony
- [x] Private testimony prompt
- [x] Testimony input
- [x] Character counter
- [x] Testimony storage
- [x] Public testimony display
- [x] Testimony summary

### Investigation
- [x] Investigation board
- [x] Evidence display
- [x] Timeline display
- [x] Player testimony display
- [x] Deterministic contradiction detection
- [x] Investigation findings UI
- [x] Player name shown on contradiction
- [x] Severity levels

### Voting
- [x] Private accusation
- [x] Pass-device voting flow
- [x] No self-voting
- [x] Vote counting
- [x] Vote reveal
- [x] Tie detection

---

## Currently Building

### Scenario-Based Accusation System

#### Immediate tasks
- [ ] Add SKIP / NOT ENOUGH EVIDENCE
- [ ] Handle skip majority
- [ ] Handle skip/suspect ties
- [ ] Handle suspect ties
- [ ] Implement correct accusation
- [ ] Implement wrong accusation
- [ ] Implement final reveal
- [ ] Implement player elimination
- [ ] Add scenario state
- [ ] Add Scenario 2
- [ ] Add deeper evidence
- [ ] Add Scenario 3
- [ ] Implement final accusation

---

## Testing Checklist

### Voting
- [ ] 1–1–1 tie
- [ ] 2–1 clear vote
- [ ] 3–1 clear vote
- [ ] Multiple-suspect tie
- [ ] Skip majority
- [ ] Skip/suspect tie
- [ ] No self-voting
- [ ] All valid players can vote

### Three-Player Game
- [ ] Correct accusation
- [ ] Wrong accusation
- [ ] Tie
- [ ] Skip
- [ ] Scenario 2
- [ ] Final scenario
- [ ] Final reveal

### Five/Six-Player Game
- [ ] Correct accusation
- [ ] Wrong accusation
- [ ] Player elimination
- [ ] Remaining players continue
- [ ] Eliminated player cannot vote
- [ ] Tie after elimination
- [ ] Final three-player state
- [ ] Final accusation

---

## Roadmap & Milestones

### MILESTONE 1 — Complete Core Game Loop

**Goal:** A player can start a game and play from beginning to end without unfinished screens.

```text
START
 ↓
SETUP
 ↓
CHARACTERS
 ↓
ROLES
 ↓
CASE
 ↓
EVIDENCE
 ↓
TIMELINE
 ↓
TESTIMONY
 ↓
INVESTIGATION
 ↓
VOTE
 ↓
SCENARIO RESULT
 ↓
DEEPER INVESTIGATION
 ↓
FINAL ACCUSATION
 ↓
REVEAL
 ↓
PLAY AGAIN
```

### MILESTONE 2 — Deeper Mystery Design
- [ ] Scenario-specific clues
- [ ] More sophisticated contradiction relationships
- [ ] Case solution chain
- [ ] Stronger final reveal
- [ ] Multiple cases
- [ ] Case difficulty levels

### MILESTONE 3 — AI Investigator
- [ ] `ai.js` architecture
- [ ] Secure API integration
- [ ] Compact prompts
- [ ] Contradiction analysis
- [ ] Evidence analysis
- [ ] AI fallback logic
- [ ] Token/cost controls

*Target: Maximum approximately one AI request per scenario.*

### MILESTONE 4 — Voice (Optional)
- [ ] Voice testimony
- [ ] Speech-to-text integration
- [ ] AI transcript analysis
- [ ] AI Investigator voice narration

*Note: Text input remains the baseline.*

### MILESTONE 5 — Polish
- [ ] Responsive mobile layout
- [ ] Desktop polish
- [ ] Transitions & micro-interactions
- [ ] Sound effects
- [ ] Case-file visual style
- [ ] Loading & error states
- [ ] Accessibility review
- [ ] Replay testing

### MILESTONE 6 — Competition Preparation
- [ ] Final case design
- [ ] Multiple cases ready
- [ ] Final UI polish
- [ ] Performance testing
- [ ] Mobile testing
- [ ] Error testing
- [ ] README update
- [ ] Demo preparation
- [ ] Project description
- [ ] Cover image
- [ ] Final submission