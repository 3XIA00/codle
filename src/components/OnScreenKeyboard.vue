<script setup lang="ts">
import type { LetterState } from '@/game/evaluate'

defineProps<{ states: Record<string, LetterState> }>()
const emit = defineEmits<{ press: [key: string] }>()

const ROWS = [
  [...'QWERTYUIOP'],
  [...'ASDFGHJKL'],
  ['ENTER', ...'ZXCVBNM', 'BACKSPACE'],
]
</script>

<template>
  <div class="keyboard" aria-label="Keyboard">
    <div v-for="(row, r) in ROWS" :key="r" class="row">
      <button
        v-for="key in row"
        :key="key"
        type="button"
        class="key"
        :class="[states[key], { wide: key.length > 1 }]"
        :aria-label="key === 'BACKSPACE' ? 'Backspace' : key === 'ENTER' ? 'Enter' : key"
        @click="emit('press', key)"
      >
        {{ key === 'BACKSPACE' ? '⌫' : key === 'ENTER' ? 'enter' : key }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.keyboard {
  display: grid;
  gap: 8px;
  width: min(100%, 31rem);
}

.row {
  display: flex;
  justify-content: center;
  gap: 6px;
}

.key {
  flex: 1;
  min-width: 0;
  height: 3.4rem;
  border: 0;
  border-radius: 6px;
  font: inherit;
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--fg);
  background: var(--key);
  cursor: pointer;
}

.key:hover {
  filter: brightness(1.15);
}

.key:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

.wide {
  flex: 1.6;
  font-size: 0.8rem;
}

.correct {
  background: var(--correct);
  color: #fff;
}

.present {
  background: var(--present);
  color: #fff;
}

.absent {
  background: var(--absent);
  color: var(--muted);
}
</style>
