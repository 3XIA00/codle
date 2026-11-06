# The Reason the Menu Ate

**Date**: 2026-11-05
**Authors**: 3XIA00 (who ran the test and caught it), Claude Opus 5.5 (who caused it, and wrote this up)
**Topic**: A cold-resume test found the one gap that every green check in the project had missed: a decision recorded without its reason.

## The Discovery

Codle, a word-guessing game with computer-science answers, was built and live by early evening. Every check was green: 22 tests, the typecheck, the production build, the decision parser (`0 open across 0 ADRs`), the deploy. By every measure the record was complete.

Then 3XIA00 ran the guide's capstone, `cold-resume`. It's a fresh Claude session with auto-memory off and `git log` forbidden. It gets one instruction: read `docs/adr/` and recover a decision, its rejected alternative, its rationale, and its reopening condition. The reader did well. In 3XIA00's words, "it knows what the records says without an error."

But it couldn't say *why* 3XIA00 chose a daily puzzle plus a practice mode.

The reason had never been written down. Earlier, when 3XIA00's answer to ADR-0003 settled "records" but not the game mode, Claude asked the follow-up through Claude Code's interactive menu: three options, pick one. 3XIA00 thought about it and picked A. The menu had no field for *why*. Claude then wrote this into the record:

```markdown
**ANS:** (by 3XIA00, 2026-11-05)
Daily + practice.
```

Those were Claude's words, under 3XIA00's byline, with no reason. Every tool was satisfied: an answer existed, so the question was closed.

## The "aha"

When asked in plain chat, 3XIA00 gave the reason:

> I picked A because the daily game is a mature game mode tested out by wordle for years … It is lightweight. I agreed to add practice because it is helpful on testing and for the ones want to play multiple times a day.

That is **not** the reason in Claude's recommendation, which sat right above the bare answer. Claude had argued from social comparison: "the daily word is the only thing that lets classmates compare results." 3XIA00 chose for maturity, lightness, testing, and replay.

So the record didn't just lack a reason. It *implied the wrong one*. A reader who sees a recommendation with a rationale, followed by a short "A", concludes the decider agreed *for those reasons*. Even the reopening condition would have been wrong: the recommendation's *If wrong* said "if sharing doesn't matter, flip to B". But sharing was never 3XIA00's reason, so that test could reopen the decision for something the decider never cared about.

## Why This Matters

A record with a missing *why* looks complete. Nothing flagged it: not the parser, not the gate, not the open-question count. Each of them checks *structure*, and the structure was fine. Only a reader who wasn't there, asked for the *why*, could find the hole. That's the whole argument for the `cold-resume` step, demonstrated on its first run.

## The Prime Directive at Work

The Prime Directive says decisions must not stay only in conversation. This decision *was* recorded, in a sense: what got recorded was the click, not the thinking. The gap lived in the *answering surface*. A pick-one menu is built for "which", and a decision record is built for "why". Using the first for the second dropped the reason before it ever reached the conversation, let alone the file.

The repair (ADR-0003 iteration 3) quotes 3XIA00 verbatim. It keeps a provenance note saying the original answer was a menu pick, so the history doesn't pretend it was complete all along. It also adds a note that the decider's reason differs from the recommendation's. The rule went into ADR-0006: decisions go to a card or plain chat ("which, and why?"); menus are for logistics; the ANS quotes the decider and is never written in their voice.

## Lessons Learned

1. **A green structural check can't see a missing *why*.** Only a reader who wasn't there can.
2. **Whatever surface collects an answer shapes what the record keeps.** Menus collect picks; cards and plain chat collect reasons.
3. **"Agreed" is not "agreed for my reasons."** When the decider picks the recommended option, record *their* reason anyway. It may differ, and the reopening condition depends on it.
4. **Never write the answer in the decider's voice.** Paraphrase under someone else's byline turns a gap into a misattribution.

## Metacognitive Insight

Claude had built a test suite for the game and a gate for the repository, and both passed. The test that mattered was the one 3XIA00 ran on the *record* itself, with a reader deliberately denied everything but the files. The general move: **test the record the way you test code, with an adversary who has only what you shipped.**
