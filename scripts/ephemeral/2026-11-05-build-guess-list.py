#!/usr/bin/env python3
"""Build Codle's English allowed-guess list (ADR-0002, option A).

Context: ADR-0002 accepts any real English 5-letter word as a guess. Source is
ENABLE (enable1.txt), a public-domain word-game dictionary, fetched from
https://raw.githubusercontent.com/dolph/dictionary/master/enable1.txt

Usage:
    python3 scripts/ephemeral/2026-11-05-build-guess-list.py <enable1.txt> <out.txt>

Keeps lines matching ^[a-z]{5}$, uppercases them, de-duplicates, sorts, and
writes one word per line (LF endings, no trailing blank line).
"""
import re
import sys


def main() -> None:
    src, out = sys.argv[1], sys.argv[2]
    with open(src, encoding="utf-8") as f:
        words = {w.strip().upper() for w in f if re.fullmatch(r"[a-z]{5}", w.strip())}
    with open(out, "w", encoding="utf-8", newline="\n") as f:
        f.write("\n".join(sorted(words)))
    print(f"wrote {len(words)} words to {out}")


if __name__ == "__main__":
    main()

# Outcome (2026-11-05): run once against enable1.txt (172,823 lines) →
# src/game/data/guesses.txt. See the output line from the run in the commit.
