<template>
  <div class="text-3xl font-bold text-green-600">
    <button @click="startRace">Start / Pause</button>
    <button @click="nextRound">Next Round</button>

    <div>
      {{ currentRound }}
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const currentRound = computed(() => {
  return store.getters['race/getCurrentRoundDetails'];
});

const startRace = () => {
  store.dispatch('race/startRace');
};

const nextRound = () => {
  store.dispatch('race/nextRound');
};
</script>
