import { describe, expect, it } from 'vitest'
import { ANSWERS } from '../answers'
import { dailyAnswer, practiceAnswer, puzzleNumber } from '../daily'
import { evaluateGuess, keyboardStates, WORD_LENGTH } from '../evaluate'
import { isAllowedGuess } from '../words'

describe('evaluateGuess', () => {
  it('marks every letter correct when the guess is the answer', () => {
    expect(evaluateGuess('STACK', 'STACK')).toEqual(Array(5).fill('correct'))
  })

  it('marks letters in the word but in the wrong spot as present', () => {
    // TASKS vs STACK: T, A, S, K all appear in STACK but none in place;
    // STACK has only one S, so the second S is gray.
    expect(evaluateGuess('TASKS', 'STACK')).toEqual([
      'present', 'present', 'present', 'present', 'absent',
    ])
  })

  it('colors only as many repeated letters as the answer contains', () => {
    // QUEUE has two E's; EERIE has three. The last E is in place (green),
    // so only ONE more E may be yellow — the first — and the second is gray.
    expect(evaluateGuess('EERIE', 'QUEUE')).toEqual([
      'present', 'absent', 'absent', 'absent', 'correct',
    ])
  })

  it('lets exact matches claim a letter before earlier yellows can', () => {
    // ERROR vs RARER: both R's at positions 2 and 4 are green, which leaves
    // one R in ERROR for the leading R to be yellow. A one-pass scorer
    // would spend that R on position 0 first and get position 4 wrong.
    expect(evaluateGuess('RARER', 'ERROR')).toEqual([
      'present', 'absent', 'correct', 'present', 'correct',
    ])
  })

  it('grays a repeated guess letter once the answer runs out of it', () => {
    // ARRAY has two R's: one green at index 2, one left over for index 0;
    // the R at index 4 must be gray.
    expect(evaluateGuess('RARER', 'ARRAY')).toEqual([
      'present', 'present', 'correct', 'absent', 'absent',
    ])
  })
})

describe('keyboardStates', () => {
  it('never downgrades a key that was already green', () => {
    // First guess puts S green (pos 0); second guess has S in a wrong spot.
    const states = keyboardStates(['SHELL', 'TASKS'], 'STACK')
    expect(states.S).toBe('correct')
    expect(states.H).toBe('absent')
    expect(states.T).toBe('present')
  })
})

describe('allowed guesses', () => {
  it('accepts ordinary English words so players can probe letters', () => {
    expect(isAllowedGuess('HOUSE')).toBe(true)
  })

  it('accepts CS answers that are missing from the English dictionary', () => {
    expect(isAllowedGuess('MUTEX')).toBe(true)
    expect(isAllowedGuess('CONST')).toBe(true)
  })

  it('rejects letter-fishing non-words', () => {
    expect(isAllowedGuess('AEIOU')).toBe(false)
  })

  it('is case-insensitive', () => {
    expect(isAllowedGuess('queue')).toBe(true)
  })
})

describe('answer list integrity', () => {
  it('contains only five uppercase letters per word', () => {
    const bad = ANSWERS.filter((w) => !new RegExp(`^[A-Z]{${WORD_LENGTH}}$`).test(w))
    expect(bad).toEqual([])
  })

  it('has no duplicates (a duplicate would repeat a daily word early)', () => {
    expect(new Set(ANSWERS).size).toBe(ANSWERS.length)
  })

  it('has every answer accepted as a guess (otherwise the puzzle is unwinnable)', () => {
    expect(ANSWERS.filter((w) => !isAllowedGuess(w))).toEqual([])
  })
})

describe('daily puzzle', () => {
  it('numbers the launch day as puzzle #1', () => {
    expect(puzzleNumber(new Date(2026, 10, 5, 9, 0))).toBe(1)
  })

  it('gives the same word all day, from just after midnight to just before', () => {
    expect(dailyAnswer(new Date(2026, 11, 1, 0, 1))).toBe(dailyAnswer(new Date(2026, 11, 1, 23, 59)))
  })

  it('advances exactly one puzzle across a DST change', () => {
    // US clocks spring forward on 2027-03-14; that day is only 23 hours long.
    const before = puzzleNumber(new Date(2027, 2, 13, 12, 0))
    const after = puzzleNumber(new Date(2027, 2, 14, 12, 0))
    const next = puzzleNumber(new Date(2027, 2, 15, 12, 0))
    expect([after - before, next - after]).toEqual([1, 1])
  })

  it('uses every answer once before repeating any', () => {
    const days = ANSWERS.map((_, i) => dailyAnswer(new Date(2026, 10, 5 + i, 12, 0)))
    expect(new Set(days).size).toBe(ANSWERS.length)
  })
})

describe('practice mode', () => {
  it('does not hand back the word the player just finished', () => {
    for (let i = 0; i < 50; i++) {
      expect(practiceAnswer('STACK')).not.toBe('STACK')
    }
  })
})
