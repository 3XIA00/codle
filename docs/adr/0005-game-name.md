<!-- adr template version: "adr 3.12.0" -->
<!--
adr teaching map: the example is not the teaching — these are the up-links from this file to what teaches its form; load them rather than winging it. (Sibling: the template-version marker dates the mold this file was minted from.)
  skill: adr-authoring
  mcp: adrs4ai
  plugin: adr@adrs4ai
-->

# ADR-0005: Game name

- **Date**: 2026-11-05
- **Iteration**: 1
- **Status**: Draft
- **Deciders**: 3XIA00, Claude Opus 5.5

**TL;DR**: "Wordle" is the New York Times' trademark, and being non-commercial doesn't make it safe. What do we call the game on screen, and does the repo name change too?

---

## Originating Context

**Source**: Conversation 2026-11-05. Claude raised the naming doubt (first noted as a follow-up in ADR-0003). 3XIA00 asked: *"we cannot name it wordle even if we do not use the game for commerce?"*

**Agency Grant**: Explain, recommend; 3XIA00 decides.

---

## Explicitation

**What I understand** (not legal advice — a summary to decide on):

1. **Trademarks protect names and branding, not game mechanics.** "Guess a 5-letter word with colored feedback" is a free-to-use genre. Hundreds of variants exist (Nerdle, Quordle, Heardle…), and they all use *different names*. The NYT owns the "Wordle" trademark, and the risk comes from using the name and look, not the idea.
2. **Non-commercial does not mean safe.** Trademark law turns on likely consumer confusion, not only on sales. More practically: as I recall, in early 2025 the NYT sent DMCA takedown notices to GitHub targeting Wordle clones that used the name, and GitHub disabled many such repos. A *public* GitHub Pages site called "Wordle" is exactly what those notices targeted. The real-world risk is a takedown notice, not a lawsuit.
3. **The repo name is lower-risk than the page title, but not risk-free.** `wordle-with-records` describes what the project is ("a Wordle-like, with decision records"), which is closer to fair descriptive use. A page that *presents itself* as "Wordle" is not. Our URL would be `3XIA00.github.io/wordle-with-records/`, though, so the repo name is also the public address.

**Assumptions**:

- The repo will be public (ADR-0001's assumption), since that's needed for free Pages.
- We also avoid the original's look: our own color palette, logo, and layout details, not a pixel copy.

---

## Questions

### QST-NAME: What should the game be called, and does the repo rename too?
- Status: unanswered
- Why asking: "Wordle" is a NYT trademark. Copycats on GitHub have received takedowns even when non-commercial, and our site will be public at `3XIA00.github.io/<repo-name>/`. The name appears in the page title, the header, and the shared-result text. A repo rename changes the Pages URL and the Vite `base` path (ADR-0001), so it's cheapest to do before the first deploy.
- Need: pick a letter, and propose a name if you have one (or override — any shape answers)

Options:
- **A — Own name in the UI, rename the repo before the first deploy**: Pick an original CS-themed name (candidates: *Bytele*, *Stackle*, *Compile*, *Guess the Glossary*, *Lexicache*). Use it everywhere a player sees, and rename the repo to match, so the public URL carries no trademark at all. The decision record stays in the renamed repo.
- **B — Own name in the UI, keep the repo name**: Same original name on screen. Keep `wordle-with-records` as the repo and URL, relying on it being a descriptive label rather than a brand. Zero renaming work, small residual risk.
- **C — Call it Wordle**: Use "Wordle" (or "CS Wordle") on screen. Lowest effort, highest takedown risk, and it ties the project's identity to someone else's brand.

**Recommendation**: (by Claude Opus 5.5, 2026-11-05)

**A — Own name in the UI, rename the repo before the first deploy.** *Rationale*: The difference between A and B is a single rename (GitHub redirects old clone URLs automatically), done now while ADR-0001's `base` path is still unwritten. After the first deploy, links in the wild would break. A means nothing public carries the trademark, and an original name is also simply better identity for your first deliberately built project. I'm also not going to build this as a copy of the original under its name or look; the genre mechanic is fine, and an original name and look is the version I can help with fully. *Confidence*: 0.75 — because the takedown pattern is real, but my memory of its details (date, scale) is from news reporting I can't check here, and a course project may never draw attention either way. *If wrong*: if 3XIA00 prefers the repo URL stay stable (e.g. it's already been submitted for a course), this flips to **B**.

**ANS:** (by 3XIA00)
[Fill this in]   <!-- literal placeholder — parser-significant, do not paraphrase -->

---

## Iterations

### Iteration 1 (2026-11-05)
- Trigger: 3XIA00's question in chat about non-commercial use of the name.
- Contributors: 3XIA00, Claude Opus 5.5
- Changes: Created, with one open question (QST-NAME). Supersedes the naming bullet in ADR-0003's Open Follow-ups.
- Outcome: Draft

---

## Links

- Related ADRs: [ADR-0001](0001-build-and-deploy-stack.md) (Vite `base` path = repo name), [ADR-0003](0003-game-mode-and-what-records-means.md) (where the doubt was first noted)
