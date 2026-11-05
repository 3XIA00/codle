<!-- adr template version: "adr 3.12.0" -->
<!--
adr teaching map: the example is not the teaching — these are the up-links from this file to what teaches its form; load them rather than winging it. (Sibling: the template-version marker dates the mold this file was minted from.)
  skill: adr-authoring
  mcp: adrs4ai
  plugin: adr@adrs4ai
-->

# ADR-0002: Word and guess rules

- **Date**: 2026-11-05
- **Iteration**: 2
- **Status**: Accepted
- **Deciders**: 3XIA00, Claude Opus 5.5

**TL;DR**: The answers are CS words, but how long are they, and what is the player allowed to type as a guess?

---

## Originating Context

**Source**: Human request (session 2026-11-05), verbatim excerpt:

> a Wordle variant — guess the word, colored feedback per letter — with a twist: the answers are computer science words (ARRAY, STACK, QUEUE, CACHE, TOKEN…)

**Agency Grant**: Structure the decision and recommend; don't build yet.

---

## Explicitation

**What I understand**:

1. **Every example is five letters.** ARRAY, STACK, QUEUE, CACHE, TOKEN all fit a fixed 5-wide board. But many good CS words don't: HEAP, NODE (4), LAMBDA, BINARY (6), POINTER, COMPILE (7).
2. **The answer list and the guess list are separate.** The answer list is what the game picks from. The guess list is what it accepts as input. In this variant the answer list is small and specialized. If the guess list is equally small, the player has to already know our private vocabulary to make any guess at all.
3. **Repeated letters need a precise coloring rule.** With answer QUEUE and guess EERIE, only as many E's turn yellow or green as QUEUE actually has (two). I'm assuming the standard two-pass rule: mark exact matches green first, then mark yellows left to right while unmatched copies of that letter remain. This isn't up for decision, but it's the classic bug in this genre and will get regression tests.

**Assumptions**:

- The game's **name, look, and art are our own**. We use the genre's mechanic (hidden word, colored per-letter feedback), not the original game's branding.
- Word lists ship as static JSON in the client bundle (see ADR-0001), so a determined player can read them. That's acceptable for a casual game.

**Confirm**: 3XIA00

---

## Questions

### QST-WORD-RULES: What length are the words, and what counts as a valid guess?
- Status: answered
- Why asking: The answers are computer-science words (your examples ARRAY, STACK, QUEUE, CACHE, TOKEN are all five letters, but many CS words aren't). The game has two word lists: *answers* (what it picks from) and *allowed guesses* (what it accepts as typed input). This choice sets the board layout, how big the curated CS list must be, whether we need an English dictionary file (with a license to check), and how fair the game feels to someone who doesn't share our exact vocabulary.
- Need: pick a letter (or override — any shape answers)

Options:
- **A — Five letters, CS answers, English guesses**: Fixed 5-letter board. Answers come only from a curated CS list. Guesses are accepted if they're any real English 5-letter word *or* a CS word, so players can open with ordinary words to probe letters. Needs an English word-list file (around 10k words, permissively licensed).
- **B — Five letters, CS-only guesses**: Fixed 5-letter board. Answers and guesses both come from the CS list only. The theme feels stronger and there's no dictionary file, but players get "not in word list" on ordinary words and have to guess our vocabulary to make any move. That's frustrating unless the list is large or visible.
- **C — Five letters, anything goes**: Fixed 5-letter board, CS answers, any five letters accepted as a guess. Simplest to build, but players can type non-words like AEIOU to fish for letters, which removes most of the puzzle.
- **D — Variable length**: Each puzzle's board width matches its answer (say 4–7 letters), so HEAP, LAMBDA, and POINTER all qualify. Guesses are validated against CS and English words of that length. Gives the richest answer pool, but needs a variable-width board, dictionaries for every length, and the length itself becomes a clue.

**Recommendation**: (by Claude Opus 5.5, 2026-11-05)

**A — Five letters, CS answers, English guesses.** *Rationale*: All five of your examples are 5 letters, so you're already picturing a 5-wide board. Five letters still leaves a usable CS pool (ARRAY, STACK, QUEUE, CACHE, TOKEN, MUTEX, GRAPH, PARSE, CLASS, FLOAT, CONST, DEBUG, LOGIC, MERGE, SHELL, FETCH, BYTES, SCOPE…). Accepting English guesses keeps the game fair to players who don't know our vocabulary, while the answers stay on theme. B punishes those players, C kills the puzzle, and D roughly triples the UI and data work for a v1. *Confidence*: 0.7 — because the length choice is well supported by your examples, but whether the curated pool reaches enough words (I'd want at least ~150 for a daily game to last months) is a count I haven't done yet. *If wrong*: if a careful curation pass finds fewer than ~100 good 5-letter CS words, this flips to **D** (variable length). If you'd rather the theme be strict even at some cost to fairness, it flips to **B**.

**ANS:** (by 3XIA00)
[Go with A. It is exactly what I am thinking.]   <!-- literal placeholder — parser-significant, do not paraphrase -->

---

## Decision

**Chosen: A — Five letters, CS answers, English guesses** (3XIA00, 2026-11-05: "exactly what I am thinking").

- Answers: a curated list of 5-letter computer-science words (`src/game/answers.ts`).
- Allowed guesses: the answer list plus a permissively licensed English 5-letter word list.
- Coloring follows the two-pass rule in Explicitation item 3, with regression tests for repeated letters.

---

## Open Follow-ups

- [ ] Concern: what counts as a "CS word"? Acronyms (ASCII, REGEX), jargon (MUTEX, NONCE), language or product names (LINUX, REACT, RUST?). This is a curation policy to settle when we build the list, not before the stack.
- [ ] Future task: find a permissively licensed English 5-letter word list if A (or D) is chosen, and record its license.
- [ ] Future task: regression tests for repeated-letter coloring (e.g. QUEUE vs EERIE, ARRAY vs RARER).

---

## Iterations

### Iteration 1 (2026-11-05)
- Trigger: Initial request from 3XIA00 to name the founding decisions before any code.
- Contributors: 3XIA00 (requirements), Claude Opus 5.5 (structure, recommendation)
- Changes: Created, with one open question (QST-WORD-RULES).
- Outcome: Draft

### Iteration 2 (2026-11-05)
- Trigger: 3XIA00 answered QST-WORD-RULES (A).
- Contributors: 3XIA00 (decision), Claude Opus 5.5 (processing)
- Changes: Decision section added.
- Outcome: Draft → Accepted

---

## Links

- Related ADRs: [ADR-0001](0001-build-and-deploy-stack.md), [ADR-0003](0003-game-mode-and-what-records-means.md) (a daily mode draws on this answer list one word per day, so pool size matters there)
