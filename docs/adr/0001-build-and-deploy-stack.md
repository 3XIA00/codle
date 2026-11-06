<!-- adr template version: "adr 3.12.0" -->
<!--
adr teaching map: the example is not the teaching — these are the up-links from this file to what teaches its form; load them rather than winging it. (Sibling: the template-version marker dates the mold this file was minted from.)
  skill: adr-authoring
  mcp: adrs4ai
  plugin: adr@adrs4ai
-->

# ADR-0001: Build and deploy stack

- **Date**: 2026-11-05
- **Iteration**: 2
- **Status**: Accepted
- **Deciders**: 3XIA00, Claude Opus 5.5

**TL;DR**: Your two constraints (Vue with scoped CSS, free GitHub Pages hosting) together mean we need a build step and a deploy pipeline. Which toolchain do we use?

---

## Originating Context

**Source**: Human request (session 2026-11-05), verbatim excerpt:

> I want it hosted free on GitHub Pages, built with Vue using scoped CSS so styles stay component-local.

**Agency Grant**: "Before you write any code: what are the 2–3 decisions we should settle first?" Structure the decision and recommend; don't build yet.

---

## Explicitation

**What I understand**:

1. **Scoped CSS needs a compiler.** `<style scoped>` is a feature of Vue *single-file components* (`.vue` files). The browser can't read them directly: the SFC compiler rewrites each selector to a per-component attribute (`.tile[data-v-7ba5bd90]`). So "Vue + scoped CSS" rules out the plain "load Vue from a CDN `<script>` tag" setup, unless we compile in the browser at runtime (`vue3-sfc-loader`), which is slow and unusual.
2. **GitHub Pages only serves static files.** Whatever we build has to end up as plain HTML/JS/CSS, either built by a GitHub Actions workflow or committed to a branch.
3. **Project Pages live under a subpath.** This repo will be served at `https://3XIA00.github.io/wordle-with-records/`, not at the domain root. The bundler's base path has to match, or every asset 404s. This is the most common "deployed and it's blank" bug.

**Assumptions**:

- The repo is (or will be) **public**. On a free GitHub account, Pages only works for public repos.
- Node.js is available locally (`node` and `npm` are on PATH on this machine).

**Confirm**: 3XIA00 — especially the public-repo assumption.

---

## Questions

### QST-STACK: Which build-and-deploy toolchain should the Vue app use?
- Status: answered
- Why asking: Scoped CSS requires Vue single-file components, and those need a build step. GitHub Pages serves only static files from a subpath (`/wordle-with-records/`). This choice determines the project layout, the test runner, the gate command in CLAUDE.md's Fifth Directive, and how a push becomes a live site. It's the first thing the code depends on.
- Need: pick a letter (or override — any shape answers)

Options:
- **A — Vite + TypeScript + Actions**: Scaffold with `npm create vue@latest` (Vite, Vue 3, TypeScript, Vitest). Set `base: '/wordle-with-records/'` in `vite.config`. A GitHub Actions workflow (the official `actions/deploy-pages` flow) builds and publishes on every push to `main`. No build output is committed. Types catch mistakes like mixing up guess and answer arrays, at the cost of some type syntax to read.
- **B — Vite + JavaScript + Actions**: Same as A, but plain JavaScript. Less syntax to learn and read. You lose compile-time checks, so more depends on tests.
- **C — No build step (CDN Vue)**: A single `index.html` that loads Vue from a CDN. Nothing to install and nothing to deploy beyond the files themselves. **Native scoped CSS isn't available**: you'd either load `vue3-sfc-loader` to compile `.vue` files in the browser (slow first load, uncommon) or give up scoped styles. That conflicts with a stated requirement.
- **D — Vite + manual `gh-pages` branch**: Build locally, then push `dist/` to a `gh-pages` branch with the `gh-pages` npm package. No CI to configure, but every deploy is a manual step, and the live site can drift from `main`.

**Recommendation**: (by Claude Opus 5.5, 2026-11-05)

**A — Vite + TypeScript + Actions.** *Rationale*: It's the only option that meets both stated requirements (scoped CSS via SFCs, free Pages hosting) with nothing extra to maintain. `npm create vue@latest` is Vue's officially documented scaffold, and Vitest comes with it, which the Fourth Directive's tests need. An Actions deploy makes "pushed to main" and "live" the same thing, so D's drift can't happen. I lean TypeScript over JavaScript because the game's core is a small pure function (score a guess against an answer) where types and tests reinforce each other. C fails the scoped-CSS requirement as stated. *Confidence*: 0.8 — because the requirements logic (scoped CSS needs a compiler) is firm, but the TS-vs-JS split depends on your comfort with TypeScript, which I don't know. *If wrong*: if you'd rather read and write the code without type annotations, this flips to **B**. If you decide component-local styles matter less than zero tooling, it flips to **C**.

**ANS:** (by 3XIA00)
[Go with A. Complie-time checks is definately useful.]   <!-- literal placeholder — parser-significant, do not paraphrase -->

---

## Decision

**Chosen: A — Vite + TypeScript + Actions** (3XIA00, 2026-11-05: compile-time checks are worth it).

- Scaffold from `create-vue` (Vue 3, TypeScript, Vitest) at the repo root.
- `base: '/codle/'`, because the repo is renamed to `codle` per [ADR-0005](0005-game-name.md). This supersedes `/wordle-with-records/` above.
- GitHub Actions builds and publishes to Pages on every push to `main`. No build output is committed.
- The verification gate becomes typecheck + `npm test` + `npm run build`, run from `just gate`.

---

## Open Follow-ups

- [x] Unverified assumption: the repo is public (needed for free Pages). Verified 2026-11-05: `gh repo view` reports `PUBLIC`.
- [x] Future task: once the stack is chosen, wire `npm test` and `npm run build` into the `justfile` `gate` recipe's project slot and update the Fifth Directive's **Why** paragraph.
- [x] Future task: enable Pages in the repo settings (Source: GitHub Actions). Done 2026-11-05 via `gh api` at 3XIA00's "make it live". The first deploy (run 42137089004) passed, and https://3xia00.github.io/codle/ serves the game.
- [x] Concern: that first run warned that `actions/checkout@v4`, `actions/setup-node@v4`, and `actions/upload-artifact@v4` target the deprecated Node 20 runtime (GitHub currently forces them onto Node 24, so it works). Bump to the actions' next major versions before GitHub removes Node 20 entirely. Done 2026-11-05 at 3XIA00's go-ahead: checkout v7, setup-node v7, upload-pages-artifact v5 (which runs upload-artifact v7), and deploy-pages v5, each verified to declare `node24` in its `action.yml`. Cause: Claude pinned the versions from memory without checking the current releases. Lesson: look up the latest release before pinning any action.

---

## Iterations

### Iteration 1 (2026-11-05)
- Trigger: Initial request from 3XIA00 to name the founding decisions before any code.
- Contributors: 3XIA00 (requirements), Claude Opus 5.5 (structure, recommendation)
- Changes: Created, with one open question (QST-STACK).
- Outcome: Draft

### Iteration 2 (2026-11-05)
- Trigger: 3XIA00 answered QST-STACK (A); ADR-0005 renamed the repo to `codle`.
- Contributors: 3XIA00 (decision), Claude Opus 5.5 (processing)
- Changes: Decision section added; base path set to `/codle/`.
- Outcome: Draft → Accepted

---

## Links

- Related ADRs: [ADR-0002](0002-word-and-guess-rules.md) (word data ships as static files in this build), [ADR-0003](0003-game-mode-and-what-records-means.md) (no backend is assumed here; option C there would change that)
