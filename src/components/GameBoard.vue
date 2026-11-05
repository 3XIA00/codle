<script setup lang="ts">
import { computed } from 'vue'
import { evaluateGuess, MAX_GUESSES, WORD_LENGTH, type LetterState } from '@/game/evaluate'

const props = defineProps<{
  guesses: string[]
  current: string
  answer: string
}>()

type Tile = { letter: string; state: LetterState | 'typing' | 'empty' }

const rows = computed<Tile[][]>(() =>
  Array.from({ length: MAX_GUESSES }, (_, r) => {
    const guess = props.guesses[r]
    if (guess !== undefined) {
      const states = evaluateGuess(guess, props.answer)
      return [...guess].map((letter, i) => ({ letter, state: states[i]! }))
    }
    const typing = r === props.guesses.length ? props.current : ''
    return Array.from({ length: WORD_LENGTH }, (_, i) => {
      const letter = typing[i] ?? ''
      return { letter, state: letter ? 'typing' : 'empty' }
    })
  }),
)

const LABEL: Record<Tile['state'], string> = {
  correct: 'correct', present: 'in the word', absent: 'not in the word', typing: '', empty: 'empty',
}
</script>

<template>
  <div class="board" role="grid" aria-label="Guesses">
    <div v-for="(row, r) in rows" :key="r" class="row" role="row">
      <div
        v-for="(tile, i) in row"
        :key="i"
        class="tile"
        :class="tile.state"
        :style="{ transitionDelay: `${i * 90}ms` }"
        role="gridcell"
        :aria-label="tile.letter ? `${tile.letter} ${LABEL[tile.state]}`.trim() : LABEL.empty"
      >
        {{ tile.letter }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.board {
  display: grid;
  grid-template-rows: repeat(6, 1fr);
  gap: 6px;
}

.row {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 6px;
}

.tile {
  width: min(15vw, 3.6rem);
  aspect-ratio: 1;
  display: grid;
  place-items: center;
  font-size: 1.7rem;
  font-weight: 700;
  border: 2px solid var(--line);
  border-radius: 6px;
  color: var(--fg);
  background: var(--bg);
  transition: background-color 250ms ease, border-color 250ms ease;
}

.typing {
  border-color: var(--line-strong);
}

.correct,
.present,
.absent {
  color: #fff;
}

.correct {
  background: var(--correct);
  border-color: var(--correct);
}

.present {
  background: var(--present);
  border-color: var(--present);
}

.absent {
  background: var(--absent);
  border-color: var(--absent);
}

@media (prefers-reduced-motion: reduce) {
  .tile {
    transition: none;
  }
}
</style>
