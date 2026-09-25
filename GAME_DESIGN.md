# THE HEIST — Game Design

## 1. Game Identity

**Title:** THE HEIST

**Tagline:**
> Someone stole it. Someone knows the truth. Someone is lying.

THE HEIST is a multiplayer social-deduction mystery game.

Players investigate fictional crimes, examine evidence, share testimony, identify contradictions, discuss suspects, and vote to determine who the hidden thief is.

The game is inspired by the tension of social-deduction games but uses an original mystery/investigation structure.

---

## 2. Players

**Supported player count:** 3–6 players

Players share one device using pass-and-play.

Each player receives:
- A character
- A secret role
- Private information
- A testimony prompt

*One player is secretly the thief.*

---

## 3. Core Gameplay Loop

```text
START
  ↓
PLAYER SETUP
  ↓
CHARACTER SELECTION
  ↓
SECRET ROLE REVEAL
  ↓
CASE BRIEFING
  ↓
EVIDENCE
  ↓
TIMELINE
  ↓
TESTIMONY
  ↓
INVESTIGATION BOARD
  ↓
CONTRADICTION ANALYSIS
  ↓
VOTING
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

---

## 4. Characters

**Current characters:**
- The Detective
- The Scientist
- The Journalist
- The Artist
- The Hacker
- The Guard
- The Professor
- The Explorer

Characters are primarily visual identities. The secret role determines the player's relationship to the case.

---

## 5. Secret Roles

**Current role pool includes:**
- Security Guard
- Curator
- Journalist
- Photographer
- Technician
- Historian
- Thief

The game always contains **exactly one thief**. The remaining players receive non-thief roles.

**Roles may provide:**
- Secret information
- Relevant knowledge
- Testimony prompts
- Potential alibis
- Access-related information

---

## 6. The Thief

**The thief:**
- Knows they are the thief.
- Receives private information.
- Must provide testimony.
- Can attempt to mislead other players.
- Tries to avoid being identified.

The thief should not have overwhelming special powers. The game should primarily be about reasoning and deception.

---

## 7. Evidence

Evidence is divided into categories such as:
- Physical
- Digital
- Audio
- Documentary
- Timeline
- Access records

Evidence should provide concrete information that players can reason about. Evidence should **not** directly say: `"PLAYER X IS THE THIEF."` Players should have to connect clues.

---

## 8. Testimony

Every player gives testimony. Testimony is private while the player prepares it. The final testimony becomes visible to everyone during the investigation phase.

**Players should be able to:**
- Explain where they were
- Describe what they saw
- Explain their actions
- Respond to the testimony prompt

Testimony is one of the primary sources for contradiction analysis.

---

## 9. Contradictions

The deterministic investigation engine compares testimony against known facts.

### Example:
* **KNOWN FACT:** The east entrance was accessed at 11:42 PM.
* **TESTIMONY:** *"I never went near the east entrance."*
* **RESULT:** `LOCATION CONTRADICTION`

Contradictions are investigative leads. They are not automatic proof of guilt.

---

## 10. Investigation Scenarios

The game has a maximum of three major scenarios.

### Scenario 1 — THE INCIDENT
Players receive the initial evidence.
* **Goal:** Establish what happened, when it happened, who had opportunity, initial alibis, and suspicious testimony.
* *Players then vote.*

### Scenario 2 — THE TRACE
The investigation becomes deeper. New evidence is revealed based on the case.
* **Examples:** Recovered security logs, maintenance records, hidden access records, additional physical evidence, reconstructed timeline, re-examined testimony.
* The new evidence should connect to information from Scenario 1; it should not feel like a random collection of clues.

### Scenario 3 — THE REVEAL
The final investigation. Players receive the strongest available evidence.
* **Possible features:** Final timeline reconstruction, important contradiction, access information, hidden evidence, AI Investigator analysis, final testimony review.
* *Players then make the final accusation. The game must resolve after the final accusation.*

---

## 11. Voting

Players vote privately. A player cannot vote for themselves.

**Players can choose:**
- `SUSPECT`
- `SKIP / NOT ENOUGH EVIDENCE`

Skipping is a legitimate strategic choice. Players should not be forced to accuse someone when they do not have enough confidence.

---

## 12. Voting Outcomes

### Clear Suspect
If one player receives the most votes, the group has selected a suspect.

* **If that suspect is the thief:**
  * `THIEF CAUGHT` — The investigators win.
* **If the suspect is NOT the thief:**
  * **4–6 Player Game:** The suspect is eliminated. The investigation continues.
  * **3 Player Game:** A wrong accusation ends the game. The thief wins.

---

## 13. Ties

If multiple suspects have the same highest vote count:
- `NO CONSENSUS`
- Nobody is eliminated.
- The investigation continues with deeper evidence.

---

## 14. Skip Majority

If `SKIP` receives the highest number of votes:
- `NO ACCUSATION`
- Nobody is eliminated.
- The case progresses to deeper investigation.

---

## 15. Skip Tie

If `SKIP` ties with a suspect:
- `NO CONSENSUS`
- Nobody is eliminated.
- The case progresses.

---

## 16. Elimination

Elimination is used primarily in games with more than three players.

```text
5 players
   ↓
wrong accusation
   ↓
suspect eliminated
   ↓
4 players remain
```

The eliminated player should remain visible in the case history as an archived suspect. They should no longer participate in future votes.

---

## 17. Maximum Scenarios

The game should not loop indefinitely.
- **Maximum:** 3 scenarios
- The third scenario ends with a final accusation and reveal.

---

## 18. Scenario Progression

Scenario progression should feel meaningful.

```text
SCENARIO 1
Who accessed the east entrance?
   ↓
SCENARIO 2
Who had access to the maintenance override?
   ↓
SCENARIO 3
Who could have used the override and interrupted the alarm?
```

Each scenario should narrow the possible explanation.

---

## 19. AI Investigator

The AI Investigator is an enhancement.

**It can:**
- Identify meaningful contradictions
- Highlight suspicious inconsistencies
- Summarize evidence
- Identify unanswered questions
- Suggest what players should investigate next

*Constraint:* It must **NOT** determine the thief. The actual thief is always known by the deterministic game engine.

---

## 20. AI Cost Strategy

AI should not analyze the entire game state repeatedly. Use compact requests containing only relevant facts, testimony, and new evidence.

- **Target:** At most one AI call per scenario.
- **Maximum:** Approximately 3 AI calls per game.
- The game must have a deterministic fallback if AI fails.

---

## 21. Win Conditions

* **Investigators Win:** The final accusation correctly identifies the thief.
* **Thief Wins:** The investigators make an incorrect final accusation (or if the game reaches a state where the investigators can no longer correctly identify them according to the final game rules).

---

## 22. Final Reveal

The final reveal should show:
- Thief's character
- Thief's player name
- Their secret role
- Key evidence
- Important contradictions
- Timeline explanation
- How the crime was committed

The reveal should make the solution understandable.

---

## 23. Replay

After the game, selecting `PLAY AGAIN` should reset the game state. Eventually, the game should support multiple mystery cases.

---

## 24. Future Features

**Possible future additions:**
- Multiple cases
- AI Investigator integrations
- Voice testimony
- Speech-to-text
- AI voice narration
- Advanced investigation board
- More complex roles
- Case difficulty levels
- Scoring & Statistics
- Replay variations

Future features should not compromise the core gameplay.