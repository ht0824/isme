<script setup lang="ts">
import { GamePlay } from '~/composables/logic'

const play = new GamePlay(9, 9, 10)
const type = ref('easy')
const now = $(useNow())
const timerMS = $computed(() => Math.round(((play.state.value.endMS ?? +now) - (play.state.value.startMS ?? +now)) / 1000))

useStorage('vuesweeper-state', play.state)
const state = $computed(() => play.board)

const mineRest = $computed(() => {
  if (!play.state.value.mineGenerated)
    return play.mines
  return play.blocks.reduce((a, b) => a - (b.flagged ? 1 : 0), play.mines)
})

function newGame(difficulty: 'easy' | 'medium' | 'hard' | 'everyhard') {
  type.value = difficulty
  switch (difficulty) {
    case 'easy':
      play.reset(9, 9, 10)
      break
    case 'medium':
      play.reset(16, 16, 40)
      break
    case 'hard':
      play.reset(20, 20, 100)
      break
    case 'everyhard':
      play.reset(25, 25, 200)
      break
  }
}
play.reset(9, 9, 10)
watchEffect(() => {
  play.checkGameState()
})
</script>

<template>
  <div>
    扫雷
    <div flex="~ gap1" justify-center my-5>
      <button btn @click="play.reset()">
        再来一次
      </button>
      <button btn :class="type === 'easy' ? 'active' : ''" @click="newGame('easy')">
        简单
      </button>
      <button btn :class="type === 'medium' ? 'active' : ''" @click="newGame('medium')">
        一般
      </button>
      <button btn :class="type === 'hard' ? 'active' : ''" @click="newGame('hard')">
        困难
      </button>
      <button btn :class="type === 'everyhard' ? 'active' : ''" @click="newGame('everyhard')">
        极难
      </button>
    </div>

    <div flex="~ gap-10" justify-center>
      <div font-mono text-2xl flex="~ gap-1" items-center>
        <div i-carbon-timer />
        {{ timerMS }}
      </div>
      <div font-mono text-2xl flex="~ gap-1" items-center>
        <div i-mdi-mine />
        {{ mineRest }}
      </div>
    </div>

    <div mt-3 w-full overflow-auto>
      <div v-for="(row, y) in state" :key="y" flex="~" items-center justify-center w-max ma>
        <MineBlock
          v-for="(block, x) in row"
          :key="x"
          :block="block"
          @click="play.onClick(block)"
          @lrclick="play.autoExpand(block)"
          @contextmenu.prevent="play.onRightClick(block)"
        />
      </div>
    </div>
    <Confetti :passed="play.state.value.status === 'won'" />
  </div>
</template>

<style>
.active {
  color: #13b4ff;
}
</style>
