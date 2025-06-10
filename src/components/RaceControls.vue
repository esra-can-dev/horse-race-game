<template>
  <div class="text-3xl font-bold text-green-600">
    <button @click="generateProgram">Generate Program</button>

    <div v-for="round in rounds" :key="round.roundNumber">
      <br />
      {{ round }}
      <br />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const generateProgram = () => {
  store.dispatch('race/generateSchedule');
};
const rounds = computed(() => {
  return store.getters['race/getRounds'];
});
</script>
