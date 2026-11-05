import { afterEach, describe, expect, it } from 'vitest'
import { mount, type VueWrapper } from '@vue/test-utils'
import { nextTick } from 'vue'
import App from '../App.vue'
import { dailyAnswer } from '../game/daily'

// Pin "today" so the daily word is known.
const TODAY = new Date(2026, 10, 5, 10, 0)
const ANSWER = dailyAnswer(TODAY)

let wrapper: VueWrapper | undefined
afterEach(() => wrapper?.unmount())

async function type(word: string) {
  for (const key of [...word, 'Enter']) {
    window.dispatchEvent(new KeyboardEvent('keydown', { key }))
  }
  await nextTick()
}

function rowLetters(row: number): string {
  return wrapper!.findAll('.row')[row]!.findAll('.tile').map((t: { text(): string }) => t.text()).join('')
}

describe('playing a daily game with the physical keyboard', () => {
  it('rejects a non-word without using up a row', async () => {
    wrapper = mount(App, { props: { now: () => TODAY }, attachTo: document.body })
    await type('AEIOU')
    expect(wrapper.find('.message').text()).toBe('Not in word list')
    // The letters stay in the first row so the player can fix them.
    expect(rowLetters(0)).toBe('AEIOU')
    expect(wrapper.findAll('.tile.correct, .tile.present, .tile.absent')).toHaveLength(0)
  })

  it('wins when the daily answer is typed', async () => {
    wrapper = mount(App, { props: { now: () => TODAY }, attachTo: document.body })
    await type(ANSWER)
    expect(wrapper.findAll('.row')[0]!.findAll('.tile.correct')).toHaveLength(5)
    expect(wrapper.find('.message').text()).toContain('compiled in 1/6')
  })

  it('reveals the answer after six wrong guesses', async () => {
    wrapper = mount(App, { props: { now: () => TODAY }, attachTo: document.body })
    const wrong = ANSWER === 'HOUSE' ? 'MOUSE' : 'HOUSE'
    for (let i = 0; i < 6; i++) await type(wrong)
    expect(wrapper.find('.message').text()).toContain(ANSWER)
  })
})

describe('practice mode', () => {
  it('offers a new word after the game ends and starts a fresh board', async () => {
    wrapper = mount(App, { props: { now: () => TODAY }, attachTo: document.body })
    await wrapper.findAll('.mode')[1]!.trigger('click')
    for (let i = 0; i < 6; i++) await type('HOUSE')
    await wrapper.find('.again').trigger('click')
    expect(rowLetters(0)).toBe('')
  })
})
