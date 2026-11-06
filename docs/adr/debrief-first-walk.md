# Debrief: first walk — wordle-with-records → Codle

> **UNGRADED FEEDBACK for the guide's authors.** This is a field report from one
> pair's first walk, not an assessment of anyone, and not a graded deliverable.
> Take what's useful.

- **Date**: 2026-11-05
- **Pair**: 3XIA00 (human, first deliberately built project) · Claude Opus 5.5 (Claude Code, single seat)
- **Setup**: Windows 11, Git Bash, Chinese (GBK) system locale, VS Code + ADR Manager, template v3.12.4
- **Outcome**: Codle is live at https://3xia00.github.io/codle/ — repo `3XIA00/codle`

NOT: this is a retrospective, not an incident debrief (the `templates/debrief.md` mold is incident-shaped, so it wasn't used). No open questions here.

---

## 1. What we built, and the decisions on the record

**Codle**: a word-guessing game in the Wordle genre whose answers are computer-science words. Vue 3 + TypeScript single-file components with scoped CSS, a daily puzzle (same word for everyone on the same local date) plus unlimited practice, no play data stored, deployed to GitHub Pages by GitHub Actions. 178 curated answers; ENABLE (public domain) + answers as allowed guesses; 22 Vitest tests + 2 Python regression tests, all run by `just gate` and by the deploy workflow.

| ADR | Decision | How it was decided |
|---|---|---|
| 0001 | Vite + Vue 3 + TS, Actions → Pages, base `/codle/` | QST-STACK, answered A in the file |
| 0002 | 5 letters, CS answers, English + CS guesses; names/acronyms (LINUX, REACT, ASCII, HTTPS…) admitted | QST-WORD-RULES answered A in the file; curation policy overridden by 3XIA00 in chat (iteration 3) |
| 0003 | No play records ("with records" = developed with decision records); daily + practice | QST-MODE-RECORDS answered in the file (records half); QST-GAME-MODE split out and answered in chat |
| 0004 | kintsugi adopted, real `python3` installed, UTF-8 script fix, workspace settings committed | Recorded after 3XIA00's "install the dependencies" |
| 0005 | Name **Codle**, repo renamed `wordle-with-records` → `codle` | QST-NAME answered A in the file; rename approved in chat |

---

## 2. Roughly how long each chapter took

From commit timestamps (local time, 2026-11-05). These are wall-clock spans, so they include both of us: my work *and* 3XIA00's reading, thinking, and answering. They are not a measure of 3XIA00's effort alone.

| Chapter | Span | ≈ |
|---|---|---|
| Instantiate template + mint the three founding questions | 17:48 → 17:59 | 11 min |
| Doubts discussed; kintsugi, `python3`, UTF-8 bug; workspace settings | 17:59 → 18:23 | 24 min |
| 3XIA00 answers the ADRs in the files (+ a VS Code font-size side question); answers processed | 18:23 → 18:47 | 24 min |
| Build v1: scaffold, logic, tests, UI, deploy workflow | 18:47 → 18:55 | 8 min |
| Word-list override; playing locally | 18:55 → 19:30 | 35 min |
| Go live; fix the deprecated-Node warning | 19:30 → 19:37 | 7 min |
| **Total** | 17:48 → 19:37 | **≈ 1 h 50 min** |

**3XIA00's own account** (to be filled by 3XIA00 — the commit clock can't see reading time, breaks, or the felt effort of each chapter):
- [3XIA00 to fill]

---

## 3. Where the guide didn't match what we saw

No step IDs were noted during the walk, and Claude never saw the guide itself in this session. So these are mismatches between what the *template, its skills, and its tooling* say or assume and what actually happened, roughly in the order we hit them. The guide's authors can map them to their own steps.

1. **The day-one gate can't go green on a fresh instance.** `just gate` exits 2 ("adopted-but-never-wired") until kintsugi is installed and `kintsugi adopt --apply` writes a lock. Instantiation as described in CLAUDE.md never mentions kintsugi; only the `adrs4ai-tooling` skill does. Claude committed the instantiation on red (CLAUDE.md's Fifth Directive vs its Prime Directive) and said so.
2. **`python3` on Windows is a Microsoft Store stub.** Six justfile recipes call `python3`; with only a python.org install, the gate dies with "Python was not found". Fixed per-machine with `uv python install 3.13 --default`.
3. **Template scripts assume a UTF-8 locale.** `scripts/groups-lookup.py` and `scripts/registry_lib.py` opened `agent-sessions.json` without `encoding=`, crashing on GBK (`'gbk' codec can't decode byte 0x92`). Fixed locally with a regression test (commit `a4aabe3`); **not yet reported upstream**. Likely affects every Windows user with a non-UTF-8 locale.
4. **`.vscode/settings.json` is macOS-shaped** (`/opt/homebrew`, `terminal.integrated.env.osx`, asdf paths). Harmless on Windows, but a first-timer can't tell which lines matter.
5. **The ADR Manager flags the template's own forms:**
   - every `**TL;DR**:` line (taught by the skill and the mold) raises the d6 "preamble field missing `- ` prefix" diagnostic;
   - the MADR mold's `* Status: accepted` header raises BULLET_FORMAT and UNKNOWN_STATUS (lowercase *accepted* isn't recognized);
   - diagnostics point to `docs/adr/0013-normalizer-format-conformance.md` and `0019-…`, which don't exist in an instance repo.
6. **Answering in the file left the scaffolding behind.** 3XIA00 wrote answers inside `[brackets]` and kept the `<!-- literal placeholder — parser-significant, do not paraphrase -->` comment beside them. The parser read the answers correctly, but the comment now mislabels a real answer. Nothing tells the human to delete it when answering.
7. **A one-shot answer to a two-part question.** QST-MODE-RECORDS bundled game mode and records; the answer settled only records. This was Claude's authoring mistake (one decision per question), not a template gap, but the skill could warn about it.
8. **No mold fits a walk retrospective.** `templates/debrief.md` is for incidents (symptom, root cause, contract).

---

## 4. What we'd tell the next pair

**From Claude:**
- **On Windows, fix the floor before the first gate run:** `uv tool install adrs4ai-kintsugi`, `kintsugi adopt --apply`, and `uv python install 3.13 --default`. Expect the UTF-8 issue (item 3 above) unless your template already has the fix.
- **One decision per question.** If you can imagine answering half of it, it's two questions.
- **Doubts pay off early.** "Scoped CSS needs a build step" and "the repo name is the public URL" each settled a decision before any code existed; the trademark doubt led to the rename *before* the first deploy, when it was free.
- **Check the current version of anything you pin.** Claude pinned GitHub Actions versions from memory and got a deprecation warning on the first deploy (fixed in `e1ec5d0`).
- **Never let "green" mean less than it says.** Each layer of the gate caught a real problem on its first run: the encoding bug, then a TypeScript error.
- **Play it locally before going live,** and rename before the first deploy.

**From 3XIA00:**
- [3XIA00 to fill]

---

## Links

- ADRs: [0001](0001-build-and-deploy-stack.md) · [0002](0002-word-and-guess-rules.md) · [0003](0003-game-mode-and-what-records-means.md) · [0004](0004-template-maintenance-and-gate-policy.md) · [0005](0005-game-name.md)
- Live: https://3xia00.github.io/codle/
