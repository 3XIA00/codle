export const WORD_LENGTH = 5
export const MAX_GUESSES = 6

export type LetterState = 'correct' | 'present' | 'absent'

/**
 * Color a guess against the answer (ADR-0002, Explicitation item 3).
 *
 * Two passes, so repeated letters are counted correctly:
 *   1. exact-position matches are `correct` and use up that answer letter;
 *   2. left to right, a letter is `present` only while unmatched copies of it
 *      remain in the answer — otherwise `absent`.
 * Both words must already be uppercase and the same length.
 */
export function evaluateGuess(guess: string, answer: string): LetterState[] {
  const result: LetterState[] = Array(guess.length).fill('absent')
  const remaining = new Map<string, number>()

  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === answer[i]) {
      result[i] = 'correct'
    } else {
      const a = answer[i]!
      remaining.set(a, (remaining.get(a) ?? 0) + 1)
    }
  }

  for (let i = 0; i < guess.length; i++) {
    if (result[i] === 'correct') continue
    const g = guess[i]!
    const left = remaining.get(g) ?? 0
    if (left > 0) {
      result[i] = 'present'
      remaining.set(g, left - 1)
    }
  }

  return result
}

const RANK: Record<LetterState, number> = { absent: 0, present: 1, correct: 2 }

/**
 * Fold every scored guess into one state per letter for the on-screen
 * keyboard. A letter keeps its best state: once green, never downgraded.
 */
export function keyboardStates(
  guesses: readonly string[],
  answer: string,
): Record<string, LetterState> {
  const states: Record<string, LetterState> = {}
  for (const guess of guesses) {
    evaluateGuess(guess, answer).forEach((state, i) => {
      const letter = guess[i]!
      const prev = states[letter]
      if (prev === undefined || RANK[state] > RANK[prev]) states[letter] = state
    })
  }
  return states
}
