import guessesRaw from './data/guesses.txt?raw'
import { ANSWERS } from './answers'

// Allowed guesses (ADR-0002, option A): any English 5-letter word from ENABLE
// (public domain; built by scripts/ephemeral/2026-11-05-build-guess-list.py)
// plus every answer — some CS words (MUTEX, CONST) are not in ENABLE.
const ALLOWED = new Set<string>([
  ...guessesRaw.split('\n').map((w) => w.trim()).filter(Boolean),
  ...ANSWERS,
])

export function isAllowedGuess(word: string): boolean {
  return ALLOWED.has(word.toUpperCase())
}
