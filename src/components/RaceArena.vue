<template>
  <div class="race-arena">
    <button @click="startRace">Start / Pause</button>
    <button @click="nextRound">Next Round</button>
    <template v-if="currentRound">
      <div v-for="horse in currentRound.participants" :key="horse.id" class="d-flex">
        <HorseIcon
          :currentColor="horse.color"
          :style="{ transform: `translateX(${position}px)  scaleX(-1)` }"
        ></HorseIcon>
      </div>
      <div>
        {{ `${currentRound.roundNumber}. Lap - ${currentRound.distance}m` }}
      </div>
    </template>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import HorseIcon from '@/components/HorseIcon.vue';

const store = useStore();

const currentRound = computed(() => {
  return store.getters['race/getCurrentRoundDetails'];
});

const position = ref(0);
const startRace = () => {
  store.dispatch('race/startRace');

  let start = 0;
  const target = 300;
  const duration = 3000; // ms
  const stepTime = 16; // ~60fps

  const step = () => {
    if (start < target) {
      start += target / (duration / stepTime);
      position.value = start;
      requestAnimationFrame(step);
    }
  };

  step();
};

const nextRound = () => {
  store.dispatch('race/nextRound');
};
</script>
<style lang="scss" scoped>
.race-arena {
  min-width: 400px;
}
</style>
