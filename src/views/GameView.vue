<template>
  <div class="text-3xl font-bold text-green-600">
    Horse Racing Game 🐎:
    <div v-for="horse in allHorses" :key="horse.id">
      {{ horse.name }} - {{ horse.color }} (Condition: {{ horse.condition }})
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

onMounted(() => {
  store.dispatch('horses/generateHorses');
});

const allHorses = computed(() => {
  return store.getters['horses/getAllHorses'];
});
</script>
