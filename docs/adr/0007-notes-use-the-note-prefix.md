<!-- adr template version: "adr-madr 3.12.0" -->
<!-- kept in deliberate homage to MADR — Markdown Architectural Decision Records, the lineage this template family descends from. This is the simple-decisions form: use it when a decision needs recording, not discussion. The deliberation-native form is adr.md. Mint with `just adr "<title>" madr`. (Ruling: QST-MADR-FATE, 2026-08-13 — "keeping the template, acknowledging it, is good form.") -->

# ADR-0007: Notes use the `NOTE:` prefix, not the template's `NOT:`

- **Date**: 2026-11-05
- **Status**: Implemented
- **Deciders**: 3XIA00, Claude Opus 5.5

**TL;DR**: This project writes notes as `NOTE:`, because the template's `NOT:` reads as negation to a first-time reader.

Technical Story: Reading ADR-0003, 3XIA00 asked whether the two notes on lines 86 and 88 meant "NOTE:". They were the template's notes code, `NOT:` (CLAUDE.md's navigation codes: `NOT:  # Notes, remarks, comments, observations`). 3XIA00, in chat: *"So the template give the prefix of note as not? Can we change the prefix to NOTE?"*

## Context and Problem Statement

The template's navigation codes are three letters each (`QST`, `ANS`, `COD`, `API`, `FIL`, `DOC`, `NOT`). For notes, the three-letter form is also an English word with the opposite force: "NOT: The reason differs from the recommendation" can read as "it is *not* the case that the reason differs". The decider is the reader who matters most, and the decider misread it.

## Considered Options

* Rename to `NOTE:` in this project's records and house rules (chosen)
* Keep `NOT:` for template consistency, and only report the problem upstream
* Keep `NOT:` and disambiguate each line, e.g. `NOT: (note) …`

## Decision Outcome

Chosen option: "rename to `NOTE:`", because the records exist to be read correctly by 3XIA00 and by future readers, and the prefix has no machine role that the rename breaks.

* **Checked before renaming:** the parser (`docket outline`) does not treat inline `NOT:` lines as structure; ADR-0003's outline was identical. The one special form the template's skill teaches, `NOT: no open questions — <why>` under `## Questions`, isn't used anywhere in this repo.
* **Renamed:** ADR-0003 (two notes), ADR-0005 (one), `debrief-first-walk.md` (one), and the code list in `CLAUDE.md`, which now explains the change.
* **Not renamed:** the template's own files (`docs/adr/templates/*.md`, `.claude/skills/adr-authoring/**`). kintsugi manages them, and editing them would create drift against the template. They still teach `NOT:`, and CLAUDE.md tells every session to write `NOTE:` anyway.

### Negative Consequences

* This project's notes no longer match the template's search (`grep '^NOT:'`); use `grep '^NOTE:'` here.
* If the template keeps `NOT:`, every future template update will teach the old form again. Only CLAUDE.md's note guards against it.
* If the "no open questions" form is ever needed, check whether the tools also accept `NOTE:` there before using it.

## Links

* Feedback: [debrief-first-walk.md](debrief-first-walk.md), reported upstream as template feedback
* First seen in: [ADR-0003](0003-game-mode-and-what-records-means.md), QST-GAME-MODE notes
