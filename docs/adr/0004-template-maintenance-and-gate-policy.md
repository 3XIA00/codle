<!-- adr template version: "adr-madr 3.12.0" -->
<!-- kept in deliberate homage to MADR — Markdown Architectural Decision Records, the lineage this template family descends from. This is the simple-decisions form: use it when a decision needs recording, not discussion. The deliberation-native form is adr.md. Mint with `just adr "<title>" madr`. (Ruling: QST-MADR-FATE, 2026-08-13 — "keeping the template, acknowledging it, is good form.") -->

# ADR-0004: Template maintenance (kintsugi) and a gate that can actually go green

- **Date**: 2026-11-05
- **Status**: Implemented
- **Deciders**: 3XIA00, Claude Opus 5.5

**TL;DR**: Install kintsugi and adopt the template lock, make `python3` real on this Windows machine, and fix the template's UTF-8 bug, so that `just gate` goes green on its merits.

Technical Story: At instantiation (commit `80c8636`), `just gate` failed for a reason outside the work: `kintsugi.yaml` existed, but kintsugi wasn't installed and no `kintsugi.lock` had been written. Claude committed on red and said so openly. That broke the Fifth Directive in order to keep the Prime Directive. 3XIA00, in chat, 2026-11-05: *"go ahead and install the dependencies."*

## Context and Problem Statement

A gate that's always red for reasons nobody can fix teaches everyone to ignore it. The Fifth Directive's own **Why** says that lesson spreads. Fixing it uncovered three stacked failures, each hidden behind the one before:

1. **kintsugi not installed or adopted.** `instantiate-check` exited 2 with the "adopted-but-never-wired" warning.
2. **`python3` was the Microsoft Store stub** (`%LOCALAPPDATA%\Microsoft\WindowsApps\python3`). The real Python 3.13 install only provides `python`. Six justfile recipes call `python3`.
3. **The template's scripts read `agent-sessions.json` using the machine's locale encoding.** On this machine that's GBK, so `groups-lookup.py --validate` crashed with `UnicodeDecodeError: 'gbk' codec can't decode byte 0x92`. A UTF-8 locale (most macOS and Linux machines) never sees this bug.

## Considered Options

* Install kintsugi, fix the machine, fix the scripts (chosen)
* Delete `kintsugi.yaml` and give up template updates
* Weaken the gate (ignore exit code 2, skip registry validation)

## Decision Outcome

Chosen option: "install kintsugi, fix the machine, fix the scripts", because it's the only option where green means something.

* `uv tool install adrs4ai-kintsugi` (0.12.3). `kintsugi status`: instance is current at template v3.12.4. `kintsugi adopt --apply` wrote the baseline lock (commit `d89f32c`, 35 artifacts).
* `uv python install 3.13 --default` puts a real `python3.exe` in `~/.local/bin`, which comes before the Store stub on PATH. This is a machine-level fix with no repo edits, so other machines with a working `python3` are unaffected.
* `scripts/groups-lookup.py` and `scripts/registry_lib.py` now pass `encoding="utf-8"` to `open()`. Regression tests in `tests/test_template_scripts.py` run both scripts under `-X warn_default_encoding -W error::EncodingWarning`, so the bug is caught on any OS, not only on GBK machines.
* The `gate` recipe's project slot now runs `python3 -m unittest discover -s tests`, until the Vue app's `npm test` and `npm run build` join it (ADR-0001).

### Negative Consequences

* `justfile` and two `scripts/` files are now local changes to template-managed files. kintsugi will show them as drift and ask keep/take/merge at the next `kintsugi update`. Keep ours unless the template ships the same fix.
* The `python3` fix lives on this machine only. A new Windows machine needs the same `uv python install 3.13 --default` (or the App-execution-alias toggle in Windows Settings plus a real `python3`).

## Links

* Related: [ADR-0001](0001-build-and-deploy-stack.md) (the gate's future npm commands)
* Upstream: the UTF-8 bug affects every Windows user with a non-UTF-8 locale. Worth reporting to the template (ADRs4AI/human-ai-collaboration-template-A) if 3XIA00 agrees.
