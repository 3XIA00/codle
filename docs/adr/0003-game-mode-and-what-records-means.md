<!-- adr template version: "adr 3.12.0" -->
<!--
adr teaching map: the example is not the teaching — these are the up-links from this file to what teaches its form; load them rather than winging it. (Sibling: the template-version marker dates the mold this file was minted from.)
  skill: adr-authoring
  mcp: adrs4ai
  plugin: adr@adrs4ai
-->

# ADR-0003: Game mode and what "records" means

- **Date**: 2026-11-05
- **Iteration**: 1
- **Status**: Draft
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
- Status: unanswered
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
[Fill this in]   <!-- literal placeholder — parser-significant, do not paraphrase -->

---

## Open Follow-ups

- [ ] Concern: what the game is *called* in the UI. "Wordle" is a trademark, and the repo name is fine as an internal label, but the page title and logo should be our own name (a pun on the CS theme?). Settle this before the first public deploy.
- [ ] Future task: if a daily mode is chosen, the answer list needs a fixed, shuffled order so tomorrow's word isn't just the next one alphabetically. Its length sets how many days pass before words repeat.

---

## Iterations

### Iteration 1 (2026-11-05)
- Trigger: Initial request from 3XIA00 to name the founding decisions before any code; the repo name's double meaning.
- Contributors: 3XIA00 (requirements), Claude Opus 5.5 (structure, recommendation)
- Changes: Created, with one open question (QST-MODE-RECORDS).
- Outcome: Draft

---

## Links

- Related ADRs: [ADR-0001](0001-build-and-deploy-stack.md) (static hosting), [ADR-0002](0002-word-and-guess-rules.md) (answer pool size bounds how long a daily game lasts)
