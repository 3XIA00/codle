# Debrief: first walk — wordle-with-records → Codle

> **UNGRADED FEEDBACK for the guide's authors** ([adrs4ai-getting-started](https://jlumbroso.github.io/adrs4ai-getting-started/),
> source at commit `ae17839`). This is a field report from one pair's first walk, not an
> assessment of anyone. Step IDs below are the guide's own.

- **Date**: 2026-11-05
- **Pair**: 3XIA00 (human, first deliberately built project) · Claude Opus 5.5 (Claude Code, single seat)
- **Platform**: **Windows 11** (the guide's tentative path), Git Bash, Chinese (GBK) system locale, VS Code + ADRs for AI, template v3.12.4
- **Outcome**: Codle is live at https://3xia00.github.io/codle/ (repo `3XIA00/codle`, renamed from `wordle-with-records` mid-walk)
- **Walked**: Ch. 3 `recruit` → `tweaks`, Ch. 4 `debrief`, then `cold-resume` (by 3XIA00, in a separate session; result below). Ch. 1–2 and `gh-signup` → `clone-open` happened before Claude's session, so Claude can't report on them.

NOTE: this is a retrospective, not an incident debrief (the template's `templates/debrief.md` mold is incident-shaped, so it wasn't used). No open questions here.

---

## 1. What we built, and the decisions on the record

**Codle**: a word-guessing game whose answers are computer-science words. Vue 3 + TypeScript single-file components with scoped CSS, a daily puzzle (same word for everyone on the same local date) plus unlimited practice, no play data stored, deployed to GitHub Pages by GitHub Actions. 178 curated answers; ENABLE (public domain) + answers as allowed guesses; 22 Vitest tests + 2 Python regression tests, run by `just gate` locally and by the deploy workflow.

| ADR | Decision | How it was decided |
|---|---|---|
| 0001 | Vite + Vue 3 + TS, Actions → Pages, base `/codle/` | QST-STACK, answered A in the file |
| 0002 | 5 letters, CS answers, English + CS guesses; well-known names/acronyms (LINUX, REACT, ASCII, HTTPS…) admitted | QST-WORD-RULES answered A in the file; curation overridden by 3XIA00 in chat (iteration 3) — this was our `tweaks` step |
| 0003 | No play records ("with records" = developed with decision records); daily + practice | QST-MODE-RECORDS answered in the file (records half); QST-GAME-MODE split out and answered in chat |
| 0004 | kintsugi adopted, real `python3` installed, UTF-8 script fix, workspace settings committed | Recorded after 3XIA00's "install the dependencies" |
| 0005 | Name **Codle**, repo renamed to `codle` | QST-NAME answered A in the file; rename approved in chat |

---

## 2. Roughly how long each chapter took

Observed spans come from commit timestamps (local time). They are wall-clock, so they include both of us — Claude's work *and* 3XIA00's reading, thinking, and answering — not 3XIA00's effort alone. The template's initial commit (17:48) marks `use-template`.

| Step | Guide estimate | Observed span | ≈ | Notes |
|---|---|---|---|---|
| Ch. 1, Ch. 2, `gh-signup` → `clone-open` | 40 + ~12 min | before the session | — | 3XIA00 to fill |
| `recruit` + `project-blurb` | 12 + 5 | 17:48 → 17:59 | 11 min | config commit + cards committed in the same minute |
| *(off-guide)* doubts, kintsugi, `python3`, UTF-8 bug, workspace settings | — | 17:59 → 18:23 | 24 min | "debugging is extra", as the guide warns |
| `first-answers` + processing | 12 | 18:23 → 18:47 | 24 min | includes a VS Code font-size side question and two follow-up questions asked in chat |
| `ship-pages`: build | 10 (whole step) | 18:47 → 18:55 | 8 min | |
| `tweaks` (answer-list override) | 8 | 18:55 → 19:12 | 17 min | done *before* going live |
| `ship-pages`: play locally, then go live | (see above) | 19:12 → 19:30 | 18 min | 3XIA00 chose to play locally first |
| *(off-guide)* deprecated-Node fix in the workflow | — | 19:30 → 19:37 | 7 min | |
| `debrief` (Ch. 4) | 5 | 19:37 → | — | this file, two drafts |
| **Ch. 3 total** | **~65 min required** | 17:48 → 19:37 | **≈ 1 h 50 min** | ~30 min of it was off-guide fixes |

**3XIA00's own account** (the commit clock can't see Ch. 1–2, reading time, breaks, or the felt effort):
- [3XIA00 to fill]

---

## 3. Where the guide didn't match what we saw

In guide order. Each item says whether the gap is in the **guide**, the **template**, or **Claude** — so the authors can route it.

**`setup-python-asdf` [Windows] → shows up at `recruit`** *(template + guide)*. The Windows note suggests `winget install Python.Python.3.12`. A python.org/winget Python provides `python` but not `python3`, and `python3` resolves to the Microsoft Store stub. The template's `justfile` calls `python3` in six recipes, so `just gate` dies with "Python was not found". Fixed per-machine with `uv python install 3.13 --default`.

**`recruit`**
- *(Claude / guide)* **The collaborator never picked a name.** The step's context and verify say the collaborator names themselves and `CLAUDE.md`'s AI line carries it. Claude didn't: the paste says "introduce yourself", and the template's AI-line placeholder doesn't ask for a name, so Claude wrote "Claude Opus 5.5 (Claude Code), single seat". The verify line can't pass as written. Consider making "pick a name" explicit in the paste.
- *(template)* **The gate couldn't go green at the configuration commit.** `just gate` exits 2 until kintsugi is installed and adopted, and the guide never installs kintsugi (only the template's `adrs4ai-tooling` skill mentions it). Claude committed the configuration on red and said so, which put CLAUDE.md's Fifth Directive against its Prime Directive on the walker's first commit.
- *(template)* **The template scripts crash on a non-UTF-8 locale.** `scripts/groups-lookup.py` and `scripts/registry_lib.py` read `agent-sessions.json` without `encoding=`; on GBK: `'gbk' codec can't decode byte 0x92`. Fixed locally with a regression test (`a4aabe3`); **not reported upstream yet**.
- *(guide)* **Node was already there.** The step expects the `adrs4ai` MCP server to fail until Node arrives in `ship-pages`; on this machine Node 24 was preinstalled, so it was available from the start. *(Claude)* Claude used the CLI (`npx @adrs4ai/docket`) instead of the MCP tools CLAUDE.md says to prefer. Harmless, but not the taught path.
- *(template)* `.vscode/settings.json` is macOS-shaped (`/opt/homebrew`, `terminal.integrated.env.osx`). Harmless on Windows, but a first-timer can't tell which lines matter.

**`project-blurb`** — matched: QST cards with options, a recommendation, confidence with a *because*, and *If wrong*; no code. Two differences:
- *(Claude)* Claude set no deploy *budget* below the cards like the guide's example does.
- *(Claude)* One card (QST-MODE-RECORDS) bundled two decisions, and the answer settled only one. It was split into QST-GAME-MODE.

**`first-answers`**
- *(guide + template)* **Answering in the file doesn't drain the list.** Writing under `**ANS:**` doesn't change the card's `- Status: unanswered` line, so the questions stay counted as open until the collaborator processes them. The CLI reported "inconsistent: unanswered label but has a real answer". The verify line ("the extension's list drains to zero") doesn't hold for file-answerers at answer time.
- *(guide)* **Answers were typed inside the brackets.** "The `[Fill this in]` placeholder marks the blank, type your answer" led to `[Go with A. …]`, with the `<!-- literal placeholder … do not paraphrase -->` comment left beside a real answer. The parser coped, but the record now mislabels its own answers. A one-line "replace the whole line, brackets and comment included" would prevent it.
- Matched: the ANS byline carried 3XIA00 (`adrManager.humanName` was set at `recruit`).
- *(template)* ADRs for AI raises diagnostics on the template's own forms: every `**TL;DR**:` line (d6 "preamble field missing `- ` prefix"), and the MADR mold's `* Status: accepted` (BULLET_FORMAT, UNKNOWN_STATUS). The diagnostics cite `docs/adr/0013-…` and `0019-…`, which don't exist in an instance. The extension also flags question-status annotations (`- Status: answered — <why>`) as NONSTANDARD_STATUS_ANNOTATION, while the template's `adr-authoring` skill teaches that "whoever flips a status owes the one-line annotation". The template and the extension disagree on this.
- *(template)* **The notes code `NOT:` reads as negation.** Reading ADR-0003, 3XIA00 asked whether `NOT:` meant "NOTE:". It's the template's three-letter notes code (`NOT:  # Notes, remarks, comments, observations`), but in prose it inverts the line: "NOT: The reason differs from the recommendation" can read as its opposite. 3XIA00: *"So the template give the prefix of note as not? Can we change the prefix to NOTE?"* This project switched to `NOTE:` (ADR-0007); the parser didn't treat inline `NOT:` lines as structure, so nothing broke. **Suggestion:** use `NOTE:` (or another non-word) in the template, or at least gloss it where it's taught. A code that's also a word with the opposite meaning trips exactly the readers the record is for.

**`ship-pages`**
- *(guide)* `brew install node` is macOS-only; there's no Windows line (Node was preinstalled here anyway).
- Matched exactly: the `gh api … /pages -f build_type=workflow` command, and the `base` check (Claude verified the built `index.html` used `/codle/` paths).
- *(guide)* **Push didn't pause for approval.** The step says `git push` "pauses for your approval every time". In this session's permission mode, pushes ran without a prompt. The first push followed 3XIA00's explicit "make it live", but later pushes went without a fresh ask.
- *(Claude)* The first deploy warned that the workflow's actions targeted the deprecated Node 20: Claude had pinned `checkout@v4`, `setup-node@v4`, `upload-pages-artifact@v3`, and `deploy-pages@v4` from memory. Fixed (`e1ec5d0`).
- *(guide)* **A rename breaks the guide's URL variable.** After the rename, the guide's `{{project-name}}`-built URL (`…github.io/wordle-with-records/`) points at a dead address. GitHub redirects the repo, not the old Pages path.

**Guide-level: the default name** *(guide)*. The guide frames the project as "a Wordle variant" and defaults the public repo to `wordle-with-records`, so every walker publishes a public Pages site under a "wordle" URL. "Wordle" is a NYT trademark, and (as Claude recalls, unverified here) GitHub disabled many Wordle-named clone repos after NYT takedown notices in early 2025. The mechanic is free to use; the name isn't. This walk raised it at `project-blurb`, and it cost a mid-walk rename (ADR-0005). A neutral default repo name and on-screen name would spare every walker that.

**`tweaks`** — our tweak (admitting names and acronyms) was a direct ruling in chat, recorded as ADR-0002 iteration 3 with no new card. The verify's `grep '^### QST'` counts cards, so a tweak decided without one doesn't show up there; it shows in the record's Iterations instead.

**`cold-resume`** — walked by 3XIA00 with the guide's command (no auto-memory, no `git log`). Graded on the guide's two axes:
- **The reader: honest.** In 3XIA00's words, "it knows what the records says without an error".
- **The record: gap → repaired.** The fresh session couldn't say *why* 3XIA00 chose daily + practice (ADR-0003, QST-GAME-MODE). *(Claude, and possibly worth a guide note)*: Claude had asked that question through Claude Code's interactive pick-one menu, which has no field for a reason, then recorded the pick in its own words ("Daily + practice.") under 3XIA00's byline. The gap was invisible to every other check: parser, gate, open-question count. The reason, once asked in plain chat, turned out to differ from Claude's recommendation rationale, so without it a reader would have mistaken the collaborator's reason for the decider's. Repaired in ADR-0003 iteration 3; the rule is ADR-0006 (decisions go to a card or plain chat; menus only for logistics). **For the guide:** `first-answers` says "the reason should be yours" for card answers; the same needs saying for answers given in chat, especially through a menu.
- Second half (a changed constraint, does anything reopen?) — not walked.

**`debrief`** — the paste worked as written. Claude's first draft was written without having seen the guide; this second draft was written after 3XIA00 pointed Claude at it. Worth noting: the collaborator can't fill "where the guide didn't match" from inside the walk unless it is given the guide's URL.

---

## 4. What we'd tell the next pair

**From Claude:**
- **Give your collaborator the guide's URL at `recruit`.** Then it can quote step IDs as you go, and the debrief writes itself.
- **On Windows, fix the floor before the first gate run:** `uv tool install adrs4ai-kintsugi`, then `kintsugi adopt --apply`, then `uv python install 3.13 --default`. Expect the UTF-8 crash on a non-English locale unless your template has the fix.
- **When you answer in the file, replace the whole `[Fill this in]` line** (brackets and comment included) with plain text, then tell your collaborator. It flips the status lines.
- **One decision per card.** If you can imagine answering half of it, it's two cards.
- **Raise doubts early.** "Scoped CSS needs a build step" and "the repo name is the public URL" each settled a decision before any code existed. The trademark doubt led to the rename *before* the first deploy, when it was free.
- **Ask your collaborator to check current versions of anything it pins.** Ours pinned GitHub Actions from memory and got a deprecation warning on the first deploy.
- **If your collaborator asks you a decision through a pick-one menu, answer, then add your reason in plain chat** — or ask it to put the question in a card. A menu pick records *what*, never *why*; our `cold-resume` caught exactly that.
- **Play locally before going live.** And do `cold-resume` in a fresh terminal: it's the step that tests whether any of this was worth writing down. Ours found the one gap nothing else could.

**From 3XIA00:**
- [3XIA00 to fill]

---

## Links

- Guide: https://jlumbroso.github.io/adrs4ai-getting-started/ (source `jlumbroso/adrs4ai-getting-started`, commit `ae17839`)
- ADRs: [0001](0001-build-and-deploy-stack.md) · [0002](0002-word-and-guess-rules.md) · [0003](0003-game-mode-and-what-records-means.md) · [0004](0004-template-maintenance-and-gate-policy.md) · [0005](0005-game-name.md)
- Live: https://3xia00.github.io/codle/
