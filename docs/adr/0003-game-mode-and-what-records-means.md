<!-- adr template version: "adr 3.12.0" -->
<!--
adr teaching map: the example is not the teaching — these are the up-links from this file to what teaches its form; load them rather than winging it. (Sibling: the template-version marker dates the mold this file was minted from.)
  skill: adr-authoring
  mcp: adrs4ai
  plugin: adr@adrs4ai
-->

# ADR-0003: Game mode and what "records" means

- **Date**: 2026-11-05
- **Iteration**: 3
- **Status**: Accepted
- **Deciders**: 3XIA00, Claude Opus 5.5

**TL;DR**: Is it one shared puzzle per day or unlimited play, and does "with records" mean player stats (local or shared) or only this repo's decision record?

---

## Originating Context

**Source**: Human request (session 2026-11-05) and the repository's name, `wordle-with-records`. The request doesn't mention a game mode or player stats. "Records" in the repo name could mean either this ADR record or game records, and the two lead to very different architectures.

**Agency Grant**: Structure the decision and recommend; don't build yet.

---

## Explicitation

**What I understand**:

1. **Daily vs unlimited is the main gameplay choice.** A daily puzzle (everyone gets the same word, picked from the date) is what makes this genre social: you can compare results with a classmate. Unlimited random play is better for practice, but no two players share a puzzle.
2. **"Records" is ambiguous, and one reading needs a server.** Personal stats (games played, win %, streak, guess distribution) can live in the browser's `localStorage` with no server. A *shared* leaderboard can't. GitHub Pages only serves static files, so a leaderboard means adding a hosted backend (e.g. a Firebase or Supabase free tier), with accounts, cheating, and privacy questions attached.
3. **The day boundary matters for a daily puzzle.** If the puzzle rolls over at each player's local midnight, players in different time zones see different words for part of the day. If it rolls over at UTC midnight, the puzzle changes in the evening for US players.

**Assumptions**:

- v1 has no user accounts.
- "Records" in the repo name was at least partly a nod to the decision record. I'm not certain, so it's part of the question below.

**Confirm**: 3XIA00 — what did you mean by "records"?

---

## Questions

### QST-MODE-RECORDS: Which game mode, and what kind of player records (if any)?
- Status: answered — records half only; the game-mode half split out to QST-GAME-MODE below
- Why asking: The repo is named `wordle-with-records`, but "records" could mean this decision record, personal stats, or a shared leaderboard. GitHub Pages serves only static files, so a shared leaderboard means adding a hosted backend, while personal stats fit in the browser. The game mode (one shared daily word vs unlimited random words) decides how the answer list is used and whether results are comparable between players. Together these determine whether the project stays purely static.
- Need: pick a letter (or override — any shape answers)

Options:
- **A — Daily + practice, local stats**: One daily puzzle, the same for everyone, picked from the date (rolling over at local midnight). Plus an unlimited practice mode. Stats (played, win %, current/max streak, guess distribution) for the daily game are saved in `localStorage`, with a copy-to-clipboard emoji result grid for sharing. Fully static, no backend.
- **B — Unlimited only, local stats**: No daily puzzle. Every game is a random word, with stats in `localStorage`. Simplest, but players never share a puzzle, so results can't be compared.
- **C — Daily + shared leaderboard**: Like A, plus a global leaderboard stored in a hosted backend (Firebase or Supabase free tier). Adds accounts or nicknames, cheat-resistance (answers are in the client bundle), privacy, and a second service to keep alive. The site is no longer purely static.
- **D — Daily only, no stats**: "Records" means only this repo's decision record. v1 is just the daily game, with nothing saved between visits. Smallest scope.

**Recommendation**: (by Claude Opus 5.5, 2026-11-05)

**A — Daily + practice, local stats.** *Rationale*: A keeps the whole project on static GitHub Pages hosting (ADR-0001) while keeping both things that make the genre fun: a shared daily word you can compare with friends, and practice when you want more than one game a day. Local stats are a small addition (a single `localStorage` key), and the deterministic date-to-word choice is a pure function we can test. C's leaderboard can't be trustworthy while the answers ship in the client bundle (ADR-0002's assumption), so it costs a backend without delivering fair records. *Confidence*: 0.65 — because it depends entirely on what you meant by "records", which only you know. *If wrong*: if "records" was meant as a shared competitive leaderboard, this flips to **C**, and ADR-0001 gains a backend. If it only meant the decision record and you want the smallest v1, it flips to **D**.

**ANS:** (by 3XIA00)
[the name with records actually means the game is developed with ADR records. So do not worry about the recording part. We do not record any play status.]   <!-- literal placeholder — parser-significant, do not paraphrase -->

---

### QST-GAME-MODE: With no play status stored, which puzzles do players get?
- Status: answered — picked from a menu in chat; reason added after the cold-resume test, 2026-11-05
- Why asking: The answer to QST-MODE-RECORDS settled records (none: "records" means this decision record) but not the game mode. Nothing is stored between visits, so refreshing the page restarts the current game either way. The remaining choice is whether players share a daily word, get unlimited random words, or both.
- Need: pick a letter (or override — any shape answers)

Options:
- **A — Daily + practice**: One shared word per day, picked from the date, plus a "new word" button for unlimited practice. Nothing saved.
- **B — Unlimited only**: Every game is a random CS word. Simplest; players never share a puzzle.
- **C — Daily only**: One word per day, nothing else. Smallest scope; nothing to play after finishing.

**Recommendation**: (by Claude Opus 5.5, 2026-11-05)

**A — Daily + practice.** *Rationale*: The daily word is the only thing that lets classmates compare results. With stats ruled out, comparing is the genre's remaining social hook, and the date-to-word choice is a small pure function we can test. Practice costs one button and reuses the same game. *Confidence*: 0.7 — because both halves are cheap, but whether you care about sharing is your call. *If wrong*: if sharing a puzzle doesn't matter to you, this flips to **B**.

**ANS:** (by 3XIA00, 2026-11-05)
A. "I picked A because the daily game is a mature game mode tested out by wordle for years (I am not sure exactly how long but definately long enough). It is lightweight. I agreed to add practice because it is helpful on testing and for the ones want to play multiple times a day."

---

NOTE: **Provenance of this answer.** At the time, 3XIA00 picked A from an interactive menu in chat, which had no room for a reason. Claude then recorded the answer as "Daily + practice." — Claude's words under 3XIA00's byline, with no why. A cold-resume run (a fresh session with no memory and no `git log`) recovered the pick but could not recover the reason, because none was written. Claude asked in plain chat, and the quote above is 3XIA00's reply, verbatim.

NOTE: **The reason differs from the recommendation.** Claude's rationale was social: classmates can compare results. 3XIA00's reasons are a proven mode (years of play in the genre), lightweight, and practice for testing and replay. Without the quote, a reader would have mistaken Claude's rationale for the decider's. Reopen accordingly: if the daily mode stops being lightweight (e.g. it needs a server), or practice stops serving testing and replay, revisit — the recommendation's falsifier ("if sharing doesn't matter, flip to B") is Claude's, not the decider's.

---

## Decision

- **Records**: none. "With records" in the repo name means *developed with decision records*; the game stores no play status (3XIA00).
- **Mode**: daily + practice (QST-GAME-MODE, A) — daily because it's a mode proven over years of play and lightweight; practice for testing and for players who want more than one game a day (3XIA00). Daily word = shuffled answer list indexed by days since a fixed epoch, using the player's **local** date. Practice draws a random answer. Nothing goes in `localStorage`.

---

## Open Follow-ups

- [x] Concern: what the game is *called* in the UI — moved to and settled in [ADR-0005](0005-game-name.md) ("Codle").
- [x] Future task: if a daily mode is chosen, the answer list needs a fixed, shuffled order so tomorrow's word isn't just the next one alphabetically. Its length sets how many days pass before words repeat. Done: seeded shuffle in `src/game/daily.ts`, tested to use every answer once before repeating.

---

## Iterations

### Iteration 1 (2026-11-05)
- Trigger: Initial request from 3XIA00 to name the founding decisions before any code; the repo name's double meaning.
- Contributors: 3XIA00 (requirements), Claude Opus 5.5 (structure, recommendation)
- Changes: Created, with one open question (QST-MODE-RECORDS).
- Outcome: Draft

### Iteration 2 (2026-11-05)
- Trigger: 3XIA00 answered QST-MODE-RECORDS (records part); the game-mode half asked in chat.
- Contributors: 3XIA00 (decisions), Claude Opus 5.5 (processing)
- Changes: Minted QST-GAME-MODE for the unanswered half, recorded the chat answer (A), added a Decision section.
- Outcome: Draft → Accepted

### Iteration 3 (2026-11-05)
- Trigger: 3XIA00's cold-resume test — the fresh session found the QST-GAME-MODE pick but no reason for it.
- Contributors: 3XIA00 (reason, in plain chat), Claude Opus 5.5 (repair)
- Changes: Replaced Claude's paraphrase in the ANS with 3XIA00's verbatim reason; added provenance notes; Decision line now carries the decider's why; shuffle follow-up ticked. Process rule recorded in [ADR-0006](0006-decisions-carry-the-deciders-reason.md).
- Outcome: Accepted (unchanged)

---

## Links

- Related ADRs: [ADR-0001](0001-build-and-deploy-stack.md) (static hosting), [ADR-0002](0002-word-and-guess-rules.md) (answer pool size bounds how long a daily game lasts)
