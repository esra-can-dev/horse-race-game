<template>
  <div class="race-arena">
    <button @click="startRace">Start / Pause</button>
    <button @click="isPaused ? resumeRace() : pauseRace()">
      {{ isPaused ? 'Continue' : 'Pause' }}
    </button>
    <!-- <button @click="nextRound">Next Round</button> -->
    <template v-if="currentRound">
      <div v-for="horse in currentRound.participants" :key="horse.id" class="d-flex">
        <HorseIcon
          :currentColor="horse.color"
          :style="{ transform: `translateX(${horsePositions[horse.id] || 0}px) scaleX(-1)` }"
        ></HorseIcon>
      </div>
      <div>
        {{ `${currentRound.roundNumber}. Lap - ${currentRound.distance}m` }}
      </div>
    </template>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRaceAnimation } from '@/composables/useRaceAnimation.js';
import HorseIcon from '@/components/HorseIcon.vue';

const store = useStore();
const currentRound = computed(() => store.getters['race/getCurrentRoundDetails']);

const { isPaused, horsePositions, startRace, pauseRace, resumeRace, resetRace } =
  useRaceAnimation(currentRound);

const nextRound = () => {
  resetRace();
  store.dispatch('race/nextRound');
};
</script>
<style lang="scss" scoped>
.race-arena {
  min-width: 400px;
}
</style>
