<template>
  <RaceControls />
  <div class="flex game-view">
    <HorseList />
    <RaceArena />
    <div class="flex">
      <RaceProgram />
      <RaceResult />
    </div>
  </div>
</template>

<script setup>
import HorseList from '@/components/HorseList.vue';
import RaceProgram from '@/components/RaceProgram.vue';
import RaceArena from '@/components/RaceArena.vue';
import RaceResult from '@/components/RaceResult.vue';
import RaceControls from '@/components/RaceControls.vue';

import { computed, provide } from 'vue';
import { useStore } from 'vuex';
import { useRaceAnimation } from '@/composables/useRaceAnimation.js';

const store = useStore();
const currentRound = computed(() => store.getters['race/getCurrentRoundDetails']);

const raceAnimation = useRaceAnimation(currentRound);
provide('raceAnimation', raceAnimation);
</script>

<style lang="scss" scoped>
@use '../styles/color.scss' as *;

.game-view {
  gap: 2rem;
}
</style>
