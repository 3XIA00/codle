<script setup lang="ts">
import { onBeforeUnmount, onMounted, watch } from 'vue'
import GameBoard from '@/components/GameBoard.vue'
import OnScreenKeyboard from '@/components/OnScreenKeyboard.vue'
import { useGame, type Mode } from '@/game/useGame'

const props = defineProps<{ now?: () => Date }>()
const game = useGame(props.now)
const { mode, answer, dayNumber, guesses, current, message, status, keys } = game

// Transient messages ("Not in word list") clear themselves.
let timer: ReturnType<typeof setTimeout> | undefined
watch(message, (text) => {
  clearTimeout(timer)
  if (text) timer = setTimeout(() => (message.value = ''), 1800)
})

function onKeydown(e: KeyboardEvent) {
  if (e.ctrlKey || e.metaKey || e.altKey) return
  if (e.key === 'Enter' || e.key === 'Backspace' || /^[a-zA-Z]$/.test(e.key)) {
    // Don't let Enter also "click" a focused on-screen key.
    e.preventDefault()
    game.press(e.key)
  }
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  clearTimeout(timer)
})

const MODES: { id: Mode; label: string }[] = [
  { id: 'daily', label: 'daily' },
  { id: 'practice', label: 'practice' },
]
</script>

<template>
  <main class="app">
    <header class="header">
      <h1 class="title"><span class="prompt">&gt;_</span> codle</h1>
      <nav class="modes" aria-label="Game mode">
        <button
          v-for="m in MODES"
          :key="m.id"
          type="button"
          class="mode"
          :aria-pressed="mode === m.id"
          @click="game.setMode(m.id)"
        >
          {{ m.label }}
        </button>
      </nav>
      <p class="subtitle">
        <template v-if="mode === 'daily'">puzzle #{{ dayNumber }} · guess the CS word</template>
        <template v-else>practice · guess the CS word</template>
      </p>
    </header>

    <p class="message" role="status" aria-live="polite">
      <template v-if="message">{{ message }}</template>
      <template v-else-if="status === 'won'">compiled in {{ guesses.length }}/6 ✓</template>
      <template v-else-if="status === 'lost'">
        segfault — the word was <strong>{{ answer }}</strong>
      </template>
    </p>

    <GameBoard :guesses="guesses" :current="current" :answer="answer" />

    <button
      v-if="mode === 'practice' && status !== 'playing'"
      type="button"
      class="again"
      @click="game.newPracticeWord()"
    >
      new word
    </button>

    <OnScreenKeyboard :states="keys" @press="game.press" />
  </main>
</template>

<style scoped>
.app {
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0.5rem 1.5rem;
}

.header {
  text-align: center;
}

.title {
  margin: 0;
  font-size: 2rem;
  letter-spacing: 0.05em;
}

.prompt {
  color: var(--accent);
}

.subtitle {
  margin: 0.25rem 0 0;
  color: var(--muted);
  font-size: 0.9rem;
}

.modes {
  display: inline-flex;
  gap: 4px;
  margin-top: 0.5rem;
  padding: 3px;
  border: 1px solid var(--line);
  border-radius: 8px;
}

.mode {
  border: 0;
  border-radius: 6px;
  padding: 0.3rem 0.8rem;
  font: inherit;
  color: var(--muted);
  background: transparent;
  cursor: pointer;
}

.mode[aria-pressed='true'] {
  color: var(--fg);
  background: var(--key);
}

.message {
  min-height: 1.5rem;
  margin: 0;
  font-weight: 700;
}

.again {
  border: 1px solid var(--accent);
  border-radius: 6px;
  padding: 0.4rem 1.2rem;
  font: inherit;
  color: var(--accent);
  background: transparent;
  cursor: pointer;
}
</style>
