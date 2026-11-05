import { computed, ref } from 'vue'
import { dailyAnswer, practiceAnswer, puzzleNumber } from './daily'
import { keyboardStates, MAX_GUESSES, WORD_LENGTH } from './evaluate'
import { isAllowedGuess } from './words'

export type Mode = 'daily' | 'practice'
export type Status = 'playing' | 'won' | 'lost'

/**
 * One game of Codle. Nothing is persisted (ADR-0003): a refresh starts over.
 * `now` is injectable so tests can pin the daily word.
 */
export function useGame(now: () => Date = () => new Date()) {
  const mode = ref<Mode>('daily')
  const answer = ref(dailyAnswer(now()))
  const dayNumber = ref(puzzleNumber(now()))
  const guesses = ref<string[]>([])
  const current = ref('')
  const message = ref('')

  const status = computed<Status>(() => {
    if (guesses.value[guesses.value.length - 1] === answer.value) return 'won'
    if (guesses.value.length >= MAX_GUESSES) return 'lost'
    return 'playing'
  })

  const keys = computed(() => keyboardStates(guesses.value, answer.value))

  function reset(nextAnswer: string) {
    answer.value = nextAnswer
    guesses.value = []
    current.value = ''
    message.value = ''
  }

  function setMode(next: Mode) {
    if (next === mode.value) return
    mode.value = next
    if (next === 'daily') {
      dayNumber.value = puzzleNumber(now())
      reset(dailyAnswer(now()))
    } else {
      reset(practiceAnswer(answer.value))
    }
  }

  function newPracticeWord() {
    reset(practiceAnswer(answer.value))
  }

  function submit() {
    if (current.value.length < WORD_LENGTH) {
      message.value = 'Not enough letters'
      return
    }
    if (!isAllowedGuess(current.value)) {
      message.value = 'Not in word list'
      return
    }
    guesses.value = [...guesses.value, current.value]
    current.value = ''
  }

  /** Handle one key: a letter A–Z, 'ENTER', or 'BACKSPACE'. */
  function press(key: string) {
    if (status.value !== 'playing') return
    const k = key.toUpperCase()
    if (k === 'ENTER') submit()
    else if (k === 'BACKSPACE') current.value = current.value.slice(0, -1)
    else if (/^[A-Z]$/.test(k) && current.value.length < WORD_LENGTH) current.value += k
  }

  return {
    mode, answer, dayNumber, guesses, current, message, status, keys,
    press, setMode, newPracticeWord,
  }
}
