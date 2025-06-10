<template>
  <div class="text-3xl font-bold text-green-600">
    Horse Racing Game 🐎:
    {{ el }}
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';

const el = ref();

onMounted(() => {
  generateHorses();
  el.value = getAllHorses();
});
</script>
