<!-- adr template version: "adr-madr 3.12.0" -->
<!-- kept in deliberate homage to MADR — Markdown Architectural Decision Records, the lineage this template family descends from. This is the simple-decisions form: use it when a decision needs recording, not discussion. The deliberation-native form is adr.md. Mint with `just adr "<title>" madr`. (Ruling: QST-MADR-FATE, 2026-08-13 — "keeping the template, acknowledging it, is good form.") -->

# ADR-0006: Every recorded decision carries the decider's own reason

- **Date**: 2026-11-05
- **Status**: Accepted
- **Deciders**: 3XIA00, Claude Opus 5.5

**TL;DR**: Decisions are asked in a question card or in plain chat ("which, and why?"), never through a pick-one menu alone. The record quotes the decider; the collaborator never writes an answer in the decider's voice.

Technical Story: 3XIA00's cold-resume test (the guide's `cold-resume` step). A fresh session with no memory and no `git log` read the record accurately, but it could not say *why* 3XIA00 chose daily + practice in ADR-0003. Claude had asked that question through Claude Code's interactive menu, which has no room for a reason, and then recorded "Daily + practice." under 3XIA00's byline.

## Context and Problem Statement

The record exists so that someone who wasn't there can recover the *why*. A menu pick records *what* but not *why*. Worse, the gap was invisible: the parser, the gate, and the open-question count were all satisfied, because an answer existed. And the recommendation's rationale sat right above the bare pick, so a reader would naturally take Claude's reason as 3XIA00's. Here they differed: social comparison (Claude) vs. a proven, lightweight mode plus practice for testing and replay (3XIA00).

## Considered Options

* Questions that decide something go to a card or plain chat; menus only for logistics (chosen)
* Keep menus, and always follow up with "why?" before recording
* Keep menus, and record bare picks as `Adopted, unevaluated: X`

## Decision Outcome

Chosen option: "cards or plain chat for decisions; menus only for logistics", because it captures the reason at the moment it exists instead of reconstructing it later.

* **Decisions** (anything a future reader would ask "why?" about) are asked as a `### QST` card in the record, or in plain chat as "which, and why?".
* **The interactive menu** is for logistics only: approving an action (rename, push), supplying a value (a name), choosing among equivalents with no project consequence.
* **If a decision arrives without a reason** anyway, Claude asks "why?" before recording it. If 3XIA00 prefers not to give one, it is recorded as `Adopted, unevaluated: X` (the guide's marker), so the record says honestly that it wasn't weighed.
* **The ANS slot holds the decider's words.** Claude quotes or links them; Claude never writes answer prose under someone else's byline.

### Positive Consequences

* A cold reader can tell the recommendation's rationale apart from the decider's reason.
* Reopening conditions come from the decider, not just from the recommendation's *If wrong*.

### Negative Consequences

* One more message per decision asked in chat.
* Pre-2026-11-05 answers aren't re-audited. The others in ADR-0001/0002/0005 were written by 3XIA00 in the files, with reasons, so this is the only known instance.

## Links

* Repairs: [ADR-0003](0003-game-mode-and-what-records-means.md) iteration 3 (QST-GAME-MODE)
* Feedback: [debrief-first-walk.md](debrief-first-walk.md), `cold-resume`
