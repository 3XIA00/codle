import { ANSWERS } from './answers'

// Daily puzzle (ADR-0003, QST-GAME-MODE): every player gets the same word for
// the same *local* calendar date. Puzzle #1 is 2026-11-05.
const EPOCH_UTC = Date.UTC(2026, 10, 5)
const DAY_MS = 86_400_000
const SHUFFLE_SEED = 0xc0d1e

/** Puzzle number for a date: 1 on the epoch, +1 per local calendar day. */
export function puzzleNumber(date: Date): number {
  // Rebuild the *local* Y/M/D as a UTC midnight so DST shifts can't produce
  // 23- or 25-hour "days".
  const localMidnight = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  return Math.round((localMidnight - EPOCH_UTC) / DAY_MS) + 1
}

// mulberry32: tiny deterministic PRNG, so the shuffle is identical everywhere.
function mulberry32(seed: number): () => number {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4_294_967_296
  }
}

function shuffled(words: readonly string[], seed: number): string[] {
  const out = [...words]
  const rand = mulberry32(seed)
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1))
    ;[out[i], out[j]] = [out[j]!, out[i]!]
  }
  return out
}

const DAILY_ORDER = shuffled(ANSWERS, SHUFFLE_SEED)

/** The day's answer. Cycles through every answer once before any repeats. */
export function dailyAnswer(date: Date): string {
  const n = DAILY_ORDER.length
  const i = (((puzzleNumber(date) - 1) % n) + n) % n
  return DAILY_ORDER[i]!
}

/** A random answer for practice mode, avoiding `exclude` when possible. */
export function practiceAnswer(exclude?: string, rand: () => number = Math.random): string {
  const pool = ANSWERS.length > 1 ? ANSWERS.filter((w) => w !== exclude) : ANSWERS
  return pool[Math.floor(rand() * pool.length)]!
}
